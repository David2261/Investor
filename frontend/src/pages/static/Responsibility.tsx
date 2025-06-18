import { Helmet } from 'react-helmet-async';

const Responsibility = () => {
  return (
    <div className="w-full h-auto bg-gray-50">
      <Helmet>
        <title>Responsibility</title>
        <meta name="description" content="Responsibility page" />
      </Helmet>
      <div className="flex flex-col px-4 sm:px-6 md:px-10 py-10 gap-8 text-base sm:text-lg text-slate-700 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-slate-900 font-bold text-left">
          Отказ от ответственности
        </h1>
        <p className="leading-relaxed">
          Информация на данном сайте предоставляется исключительно в ознакомительных и образовательных целях.
          Пожалуйста, внимательно ознакомьтесь с приведенными ниже положениями, чтобы понять риски и
          ограничения, связанные с использованием наших продуктов и услуг.
        </p>

        {/* Пункт 1 */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            1. Предположительная оценка прибыли
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
              Все заявления о получении или увеличении прибыли или дохода, размещенные на данном сайте,
              являются только предположительной оценкой возможного заработка. Они не гарантируют его
              получения.
            </p>
            <p>
              Если вы считаете предполагаемую прибыль или увеличение будущих заработков гарантированными, вы
              принимаете на себя риск их неполучения. Указание конкретной величины дохода не означает, что вы
              достигнете аналогичных результатов.
            </p>
          </div>
        </details>

        {/* Пункт 2 */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            2. Отсутствие средней величины заработка
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
              Заявления или представления, касающиеся возможного получения прибыли, размещенные на сайте, не
              считаются средней величиной заработка.
            </p>
          </div>
        </details>

        {/* Пункт 3 */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            3. Отсутствие гарантий на основе прошлых результатов
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
              Гарантии того, что прошлые успехи или результаты деятельности, связанные с получением доходов,
              могут использоваться как указание на последующие финансовые результаты, отсутствуют.
            </p>
          </div>
        </details>

        {/* Пункт 4 */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            4. Факторы, влияющие на доход
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
              Величина дохода зависит от множества факторов, включая ваши деловые навыки, этические принципы и
              алгоритмы деятельности. Мы не располагаем информацией о вашей будущей успешности и не
              гарантируем получения каких-либо денежных сумм.
            </p>
            <p>
              Считая предполагаемую прибыль гарантированной, вы принимаете на себя риск ее неполучения.
            </p>
          </div>
        </details>

        {/* Пункт 5 */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            5. Риски деловой деятельности через интернет
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
              Ведение деловой деятельности через интернет и связанное с ним получение прибыли сопряжены с
              неизвестными рисками. Решение о занятии подобной деятельностью должно приниматься с учетом
              возможных убытков или неполучения прибыли.
            </p>
          </div>
        </details>

        {/* Пункт 6 */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            6. Образовательные и ознакомительные цели
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
              Все продукты и услуги, представленные на этом сайте, предназначены исключительно для
              образовательных или ознакомительных целей. Их использование требует осторожности и консультации с
              квалифицированными профессионалами, такими как бухгалтер, юрист или бизнес-консультант.
            </p>
          </div>
        </details>

        {/* Пункт 7 */}
        <details className="group">
          <summary className="font-semibold text-xl text-slate-900 cursor-pointer flex items-center">
            7. Независимая оценка и ответственность
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
              Посетители сайта должны полагаться на свой здравый смысл при принятии решений, связанных с
              ведением бизнеса. Вся предоставленная информация, продукты и услуги подлежат независимой
              экспертной оценке квалифицированными профессионалами перед использованием.
            </p>
            <p>
              Мы рекомендуем тщательно анализировать и оценивать информацию, представленную на сайте, на
              предмет ее соответствия вашим целям и действительности перед принятием деловых решений.
            </p>
          </div>
        </details>
      </div>

      {/* Добавление пользовательского CSS для плавной анимации */}
      <style>
        {`
          details > div {
            transition: max-height 0.3s ease-out;
            max-height: 0;
            overflow: hidden;
          }
          details[open] > div {
            max-height: 1000px; /* Подберите подходящее значение */
          }
        `}
      </style>
    </div>
  );
};

export default Responsibility;