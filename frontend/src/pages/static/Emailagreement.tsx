import { Helmet } from 'react-helmet-async';

const Emailagreement = () => {
  return (
    <div className="w-full h-auto">
      <Helmet>
        <title>Email Agreement</title>
        <meta name="description" content="Email Agreement page" />
      </Helmet>
      <div className="px-4 py-10 flex flex-col gap-6 text-lg text-slate-600 sm:px-10">
        <h1 className="text-3xl md:text-5xl text-slate-900 font-bold">Согласие с рассылкой</h1>
        <p>
          Заполняя форму и оставляя адрес своего электронного почтового ящика на данном сайте — вы
          соглашаетесь с нашей политикой конфиденциальности, а также на получение нашей регулярной рассылки.
          Вы также соглашаетесь с тем, что мы имеем право разглашать ваши личные данные в следующих случаях:
        </p>

        {/* Пункт 1 */}
        <details className="group">
          <summary className="font-bold text-xl text-slate-900 cursor-pointer flex items-center">
            1) С Вашего согласия
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
          <div className="mt-2 pl-4 space-y-2">
            <p>
              Во всех остальных случаях перед передачей информации о Вас третьим сторонам наша Компания
              обязуется получить Ваше явное согласие. Например, наша Компания может реализовывать совместное
              предложение или конкурс с третьей стороной, тогда мы попросим у Вас разрешение на совместное
              использование Вашей личной информации с третьей стороной.
            </p>
          </div>
        </details>

        {/* Пункт 2 */}
        <details className="group">
          <summary className="font-bold text-xl text-slate-900 cursor-pointer flex items-center">
            2) Компаниям, работающим от нашего лица
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
          <div className="mt-2 pl-4 space-y-2">
            <p>
              Мы сотрудничаем с другими компаниями, выполняющими от нашего лица функции бизнес поддержки, в
              связи с чем Ваша личная информация может быть частично раскрыта. Мы требуем, чтобы такие компании
              использовали информацию только в целях предоставления услуг по договору; им запрещается
              передавать данную информацию другим сторонам в ситуациях, отличных от случаев, когда это вызвано
              необходимостью предоставления оговоренных услуг. Примеры функций бизнес поддержки: выполнение
              заказов, реализация заявок, выдача призов и бонусов, проведение опросов среди клиентов и
              управление информационными системами. Мы также раскрываем обобщенную неперсонифицированную
              информацию при выборе поставщиков услуг.
            </p>
          </div>
        </details>

        {/* Пункт 3 */}
        <details className="group">
          <summary className="font-bold text-xl text-slate-900 cursor-pointer flex items-center">
            3) Дочерним и совместным предприятиям
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
          <div className="mt-2 pl-4 space-y-2">
            <p>
              Под дочерним или совместным предприятием понимается организация, не менее 50% долевого участия
              которой принадлежит Компании. При передаче Вашей информации партнеру по дочернему или совместному
              предприятию наша Компания требует не разглашать данную информацию другим сторонам в
              маркетинговых целях и не использовать Вашу информацию каким-либо путем, противоречащим Вашему
              выбору. Если Вы указали, что не хотите получать от нашей Компании какие-либо маркетинговые
              материалы, то мы не будем передавать Вашу информацию своим партнерам по дочерним и совместным
              предприятиям для маркетинговых целей.
            </p>
          </div>
        </details>

        {/* Пункт 4 */}
        <details className="group">
          <summary className="font-bold text-xl text-slate-900 cursor-pointer flex items-center">
            4) На совместно позиционируемых или партнерских страницах
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
          <div className="mt-2 pl-4 space-y-2">
            <p>
              Наша Компания может делиться информацией с компаниями-партнерами, вместе с которыми реализует
              специальные предложения и мероприятия по продвижению товара на совместно позиционируемых
              страницах нашего сайта. При запросе анкетных данных на таких страницах Вы получите
              предупреждение о передаче информации. Партнер использует любую предоставленную Вами информацию
              согласно собственному уведомлению о конфиденциальности, с которым Вы можете ознакомиться перед
              предоставлением информации о себе.
            </p>
          </div>
        </details>

        {/* Пункт 5 */}
        <details className="group">
          <summary className="font-bold text-xl text-slate-900 cursor-pointer flex items-center">
            5) При передаче контроля над предприятием
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
          <div className="mt-2 pl-4 space-y-2">
            <p>
              Наша Компания оставляет за собой право передавать Ваши анкетные данные в связи с полной или
              частичной продажей или трансфертом нашего предприятия или его активов. При продаже или
              трансферте бизнеса наша Компания предоставит Вам возможность отказаться от передачи информации о
              себе. В некоторых случаях это может означать, что новая организация не сможет далее
              предоставлять Вам услуги или продукты, ранее предоставляемые нашей Компанией.
            </p>
          </div>
        </details>

        {/* Пункт 6 */}
        <details className="group">
          <summary className="font-bold text-xl text-slate-900 cursor-pointer flex items-center">
            6) Правоохранительным органам
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
          <div className="mt-2 pl-4 space-y-2">
            <p>
              Наша Компания может без Вашего на то согласия раскрывать персональную информацию третьим сторонам
              по любой из следующих причин: во избежание нарушений закона, нормативных правовых актов или
              постановлений суда; участие в правительственных расследованиях; помощь в предотвращении
              мошенничества; а также укрепление или защита прав Компании или ее дочерних предприятий.
            </p>
          </div>
        </details>

        <p>
          Вся личная информация, которая передана Вами для регистрации на нашем сайте, может быть в любой
          момент изменена либо полностью удалена из нашей базы по Вашему запросу. Для этого Вам необходимо
          связаться с нами любым удобным для Вас способом, использую контактную информацию, размещенную в
          специальном разделе нашего сайта.
        </p>
        <p>
          Если Вы захотите отказаться от получения писем нашей регулярной рассылки, вы можете это сделать в
          любой момент с помощью специальной ссылки, которая размещается в конце каждого письма.
        </p>
      </div>
    </div>
  );
};

export default Emailagreement;