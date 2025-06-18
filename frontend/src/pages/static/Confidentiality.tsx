import { Helmet } from 'react-helmet-async';

const Confidentiality = () => {
  return (
    <div className="w-full h-auto bg-gray-50">
      <Helmet>
        <title>Confidentiality</title>
        <meta name="description" content="Confidentiality page" />
      </Helmet>
      <div className="flex flex-col px-4 sm:px-6 md:px-10 py-10 gap-8 text-base sm:text-lg text-slate-700 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-slate-900 font-bold text-left">
          Политика конфиденциальности
        </h1>
        <p className="leading-relaxed">
          Ваша конфиденциальность очень важна для нас. Мы стремимся сделать вашу работу в Интернете
          максимально безопасной и комфортной. Настоящая Политика конфиденциальности объясняет, как мы
          собираем, используем и защищаем вашу личную информацию. Пожалуйста, внимательно ознакомьтесь с
          приведенными ниже положениями.
        </p>

        {/* Section 1: Введение */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            Введение
            <svg
              className="w-5 h-5 ml-2 transform group-open:rotate-180 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </summary>
          <div className="mt-4 pl-4 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Мы собираем определенную личную информацию от пользователей наших услуг, включая Гостей
              (лиц без регистрации) и Членов (зарегистрированных пользователей, которые приобрели продукты
              или услуги). Это может включать имя, адрес, номер телефона, данные для выставления счетов
              (например, номер кредитной карты, без срока годности и защитного кода) и тип используемого
              устройства.
            </p>
            <p>
              Собранная информация используется преимущественно для предоставления продуктов и услуг в
              соответствии с вашими потребностями. Мы не передаем и не продаем вашу личную информацию
              третьим сторонам, за исключением случаев, описанных в разделе «Разглашение».
            </p>
          </div>
        </details>

        {/* Section 2: Разглашение */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            Разглашение
            <svg
              className="w-5 h-5 ml-2 transform group-open:rotate-180 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </summary>
          <div className="mt-4 pl-4 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Мы можем раскрывать информацию Членов и Гостей в следующих случаях:
            </p>
            <p>
              <strong>Компаниям, работающим от нашего лица:</strong> Мы сотрудничаем с компаниями,
              выполняющими функции бизнес-поддержки (например, обработка заказов, проведение опросов,
              управление информационными системами). Эти компании обязаны использовать информацию только
              для предоставления услуг и не передавать ее другим сторонам.
            </p>
            <p>
              <strong>Дочерним и совместным предприятиям:</strong> Мы можем передавать информацию
              организациям, в которых у нас есть не менее 50% долевого участия, но только при условии, что
              они не будут использовать данные в маркетинговых целях без вашего согласия.
            </p>
            <p>
              <strong>На партнерских страницах:</strong> При совместных предложениях или мероприятиях с
              партнерами мы можем делиться информацией, но вы будете предупреждены о передаче данных, и
              партнеры будут следовать своим политикам конфиденциальности.
            </p>
            <p>
              <strong>При передаче контроля над предприятием:</strong> В случае продажи или трансферта
              бизнеса мы можем передавать ваши данные, но предоставим вам возможность отказаться.
            </p>
            <p>
              <strong>Правоохранительным органам:</strong> Мы можем раскрывать информацию для соблюдения
              закона, участия в расследованиях или защиты прав компании.
            </p>
            <p>
              <strong>С вашего согласия:</strong> В остальных случаях мы запрашиваем ваше явное согласие
              перед передачей информации третьим сторонам.
            </p>
          </div>
        </details>

        {/* Section 3: Интернет-покупки */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            Интернет-покупки
            <svg
              className="w-5 h-5 ml-2 transform group-open:rotate-180 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </summary>
          <div className="mt-4 pl-4 space-y-4 text-slate-700 leading-relaxed">
            <p>
              При заказе продуктов или услуг на нашем сайте ваша персональная информация используется
              исключительно для обработки заказа. Мы не передаем эти данные сторонним организациям, кроме
              случаев, необходимых для выполнения заказа.
            </p>
            <p>
              Если вы делаете заказ через сторонние компании, ссылающиеся на наш сайт (например, для
              отправки подарков), ознакомьтесь с их политикой конфиденциальности, так как мы не
              контролируем использование предоставленных вами данных.
            </p>
          </div>
        </details>

        {/* Section 4: Реклама в интернете */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            Реклама в интернете
            <svg
              className="w-5 h-5 ml-2 transform group-open:rotate-180 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </summary>
          <div className="mt-4 pl-4 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Мы можем размещать рекламу в Интернете, используя сгруппированную и неперсонифицированную
              информацию, собранную при регистрации или через опросы. Эта информация помогает
              рекламодателям доставлять рекламу целевой аудитории.
            </p>
            <p>
              Мы не раскрываем персональную информацию рекламодателям. Инструкции по отказу от рекламы
              включены в рекламные материалы.
            </p>
          </div>
        </details>

        {/* Section 5: Ответы на электронные запросы */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            Ответы на электронные запросы
            <svg
              className="w-5 h-5 ml-2 transform group-open:rotate-180 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </summary>
          <div className="mt-4 pl-4 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Мы используем ваш электронный адрес только для ответа на ваши запросы и не передаем его
              третьим сторонам или используем в других целях.
            </p>
          </div>
        </details>

        {/* Section 6: Добровольные опросы клиентов */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            Добровольные опросы клиентов
            <svg
              className="w-5 h-5 ml-2 transform group-open:rotate-180 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </summary>
          <div className="mt-4 pl-4 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Мы проводим добровольные опросы для улучшения наших продуктов и услуг. Ваши ответы остаются
              конфиденциальными, даже если опрос проводится третьей стороной.
            </p>
            <p>
              Сгруппированная и неперсонифицированная информация из опросов может использоваться для
              разработки новых услуг или передаваться третьим сторонам. Участие в опросах необязательно, и
              вы можете отказаться, следуя инструкциям в сообщениях об опросах.
            </p>
          </div>
        </details>

        {/* Section 7: Автоматический сбор информации */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            Автоматический сбор информации
            <svg
              className="w-5 h-5 ml-2 transform group-open:rotate-180 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </summary>
          <div className="mt-4 pl-4 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Мы используем файлы Cookies для сбора информации, например, для отслеживания временных данных,
              запоминания ваших предпочтений (язык, страна) или анализа трафика на сайте.
            </p>
            <p>
              Cookies не содержат персональной информации и используются для улучшения пользовательского
              опыта, управления контентом сайта и предоставления релевантной информации.
            </p>
          </div>
        </details>

        {/* Section 8: Информационная защита детей */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            Информационная защита детей
            <svg
              className="w-5 h-5 ml-2 transform group-open:rotate-180 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </summary>
          <div className="mt-4 pl-4 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Мы не собираем информацию от детей до 13 лет без согласия родителей, в соответствии с
              Законом о защите частной жизни ребенка в Интернете (COPPA).
            </p>
            <p>
              Если дети до 13 лет станут целевой аудиторией, мы выделим специальные страницы с
              уведомлениями о конфиденциальности и механизмами для получения родительского согласия.
            </p>
          </div>
        </details>

        {/* Section 9: Общественные форумы */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            Общественные форумы
            <svg
              className="w-5 h-5 ml-2 transform group-open:rotate-180 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </summary>
          <div className="mt-4 pl-4 space-y-4 text-slate-700 leading-relaxed">
            <p>
              На нашем сайте могут быть доступны общественные форумы (доски обсуждений, чаты, комментарии
              в социальных сетях). Будьте осторожны при публикации личной информации, так как она может
              быть доступна другим пользователям и использоваться для несанкционированных рассылок.
            </p>
            <p>
              Мы не контролируем комментарии, которые вы можете получить в таких форумах, и не несем
              ответственности за их содержание.
            </p>
          </div>
        </details>

        {/* Section 10: Изменения настоящей Политики */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            Изменения настоящей Политики
            <svg
              className="w-5 h-5 ml-2 transform group-open:rotate-180 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </summary>
          <div className="mt-4 pl-4 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Мы оставляем за собой право в любое время изменять, дополнять или редактировать настоящую
              Политику конфиденциальности, Правила пользования и другие соглашения, обновляя эту страницу.
            </p>
          </div>
        </details>

        {/* Custom CSS for smooth dropdown animation */}
        <style>
          {`
            details > div {
              transition: max-height 0.3s ease-out;
              max-height: 0;
              overflow: hidden;
            }
            details[open] > div {
              max-height: 2000px; /* Adjust based on content height */
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Confidentiality;