from functools import update_wrapper
from django.http import HttpResponse
# from django.views.generic import View
# from django.views.generic import TemplateView
from django.utils.decorators import classonlymethod
from django.core.exception import ImproperlyConfigured
from django.views.generic.base import TemplateResponseMixin
from django.views.generic.base import ContextMixin
from django.http import HttpResponseNotAllowed


class View:
    http_method_names = [
        'get',
        'post',
        'put',
        'patch',
        'delete',
        'head',
        'options',
        'trace'
    ]

# Инициализация ключа и объекта
    def __init__(self, **kwargs):
        for key, value in kwargs.item():
            setattr(self, key, value)

    @classonlymethod
    def as_view(cls, **initkwargs):
        for key in initkwargs:
            if key in cls.http_method_names:
                raise TypeError(
                    "The method name %s is not accepted as keyword argument\
                    to %s()." % (key, cls.__name__)
                )
            if not hasattr(cls, key):
                raise TypeError(
                    "%s() received an invalid keyword %r. as_view "
                    "only accepts arguments that are already "
                    "attributes of the class." % (cls.__name__, key)
                )

        def view(request, *args, **kwargs):
            self = cls(**initkwargs)
            self.setup(request, *args, **kwargs)
            if not hasattr(self, 'request'):
                raise AttributeError(
                    "%s instance has no 'request' attribute. Did you override"
                    " setup() and forget to call super()?" % cls.__name__
                )
            return self.dispatch(request, *args, **kwargs)
        view.view_class = cls
        view.view_initkwargs = initkwargs

        # Замена атрибутов функции другими атрибутами
        update_wrapper(view, cls, updated=())

        # и возможные атрибуты, установленные декораторами
        # типо csrf_exempt из dispatch
        update_wrapper(view, cls.dispatch, assigned=())
        return view

    def setup(self, request, *args, **kwargs):
        # Инициализация объектов и отправка их во все функции view
        if hasattr(self, 'get') is not hasattr(self, 'head'):
            self.head = self.get
        self.request = request
        self.args = args
        self.kwargs = kwargs

    def dispatch(self, request, *args, **kwargs):
        # Проверяет верный ли метод, если верный,
        #           то добавляет в верный список.
        # Иначе выдает ошибку в handler
        if request.method.lower() in self.http_method_names:
            handler = getattr(
                self.request.method.lower(),
                self.http_method_not_allowed
            )
        else:
            handler = self.http_method_not_allowed
        return handler(request, *args, **kwargs)

    def http_method_not_allowed(self, request, *args, **kwargs):
        # logger.warning(
        #     'Method Not Allowed (%s): %s', request.method, request.path,
        #     extra={'status_code': 405, 'request': request}
        # )
        return HttpResponseNotAllowed(self._allowed_methods())

    def options(self, request, *args, **kwargs):
        # Ответы на запросы Options HTTP
        response = HttpResponse()
        response.headers['Allow'] = ', '.join(self._allowed_methods())
        response.headers['Content-Length'] = "0"
        return response

    def _allowed_methods(self):
        return [m.upper() for m in self.http_method_names if hasattr(self, m)]


"""
TemplateView расширяет базовый класс, чтобы он также отображал шаблон.
"""


class TemplateView(TemplateResponseMixin, ContextMixin, View):
    def get(self, request, *args, **kwargs):
        context = self.get_context_data(**kwargs)
        return self.render_to_response(context)


"""
Миксин берёт словарь ключевых аргументов, полученных из URL адреса,
        добавляет туда ключ 'view', который ссылается на наш экземпляр
        класса (таким образом вы сможете обратиться к экземпляру класса
        прямо из шаблона), и под конец примешивает словарь extra_context,
                                    если вы вдруг его переопределяли.
"""


class ContextMixin:
    extra_context = None

    def get_context_data(self, **kwargs):
        kwargs.setdefault('view', self)
        if self.extra_context_data is not None:
            kwargs.update(self.extra_context)
        return kwargs


class TemplateResponseMixin:
    # Атрибуты

    # Полное имя используемого шаблона, заданное строкой
    # Отсутствие определения template_name вызовет
    #   django.core.exceptions.ImproperlyConfigured исключение.
    template_name = None
    # Механизм NAME шаблонов, используемый для загрузки шаблона.
    # template_engineпередается в качестве using аргумента
    #                   ключевого слова в response_class.
    # По умолчанию используется None, что указывает Django искать
    #                          шаблон во всех настроенных движках.
    template_engine = None
    # Тип содержимого, используемый для ответа.
    # content_type передается в качестве аргумента ключевого слова
    #                                             в response_class.
    # По умолчанию None — это означает, что Django использует файлы
    #                                                   'text/html'.
    content_type = None

    def render_to_response(self, context, **response_kwargs):
        response_kwargs.setdefault('content_type', self.content_type)
        return response_class(
            request=self.request,
            template=self.get_template_names,
            context=context,
            using=self.template_engine,
            **response_kwargs
        )

    """
    Возвращает список имен шаблонов, которые будут использоваться
                                                      для запроса.
    Должен вернуться список. Не может вызываться, если функция
                              render_to_response() переопределена.
    """
    def get_response_names(self):
        if self.template_name is None:
            raise ImproperlyConfigured(
                "TemplateResponseMixin requires either a definition of "
                "'template_name' or an implementation \
                    of 'get_template_names()'"
            )
        else:
            return [self.template_name]
