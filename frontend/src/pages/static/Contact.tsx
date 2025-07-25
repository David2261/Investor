import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// Assets
import contactInfo from '../../assets/pages/contact_info.webp';
import titleContact from '../../assets/icons/title_contact.svg';
import mailBlack from '../../assets/icons/mail_black.svg';
import businessBlack from '../../assets/icons/business_black.svg';
import personBlack from '../../assets/icons/person_black.svg';
import laptopBlack from '../../assets/icons/laptop_black.svg';
import penBlack from '../../assets/icons/pen_black.svg';
import dollarTips from '../../assets/icons/dollar_tips.svg';
import patreonBlack from '../../assets/icons/patreon_black.svg';
import kofiBlack from '../../assets/icons/kofi_black.svg';
import boostyBlack from '../../assets/icons/boosty_black.svg';


const Contact = () => {
  const [hoveredElement, setHoveredElement] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const contactInfoElements = [
    { name: 'ОТПРАВИТЬ ЧАЕВЫЕ', icon: dollarTips, text: null },
    { name: 'ИСПРАВИТЬ ИСТОРИЮ', icon: penBlack, text: "Investor Home придерживается политики быстрого и прозрачного исправления фактических ошибок. Мы также добавляем в истории после их публикации, когда появляется актуальная новая информация. Если вы считаете, что мы опубликовали что-то, что является фактически неверным или иным образом несправедливым, напишите нам.\
В теме письма укажите «Запрос на исправление». В теле письма укажите ссылку на интересующую вас историю. Предоставьте как можно больше подтверждающих доказательств для вашего запроса на исправление, чтобы мы могли быстро скорректировать истории в случае необходимости." },
    { name: 'ФРИЛАНС', icon: laptopBlack, text: "Команды в нашем отделе новостей работают с фрилансерами.\n\
Если вам интересно узнать, как сотрудничать с Investor Home в специальных редакционных проектах, свяжитесь." },
    { name: 'КАРЬЕРА В IH', icon: personBlack, text: "Если вы хотите узнать больше о работе в Investor Home, ознакомьтесь с полным списком открытых вакансий на нашей странице вакансий ." },
    { name: 'РАЗВИТИЕ В БИЗНЕСЕ', icon: businessBlack, text: null },
  ];

  const handleMouseEnter = (name: string, e: any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ top: rect.top, left: rect.left + window.scrollX });
    if (name === 'ОТПРАВИТЬ ЧАЕВЫЕ') {
      setHoveredElement(modalTips());
    } else if (name === 'РАЗВИТИЕ В БИЗНЕСЕ') {
		setHoveredElement(null);
	} else {
      const text = contactInfoElements.find(item => item.name === name)?.text || '';
      setHoveredElement(modalText(text));
    }
  };

  const handleMouseLeave = (e: any) => {
    const relatedTarget = e.relatedTarget;
    if (relatedTarget && !e.currentTarget.contains(relatedTarget) && !e.currentTarget.querySelector('.form-container')?.contains(relatedTarget)) {
      setHoveredElement(null);
    }
  };

  const modalTips = () => {
    return (
      <div className="flex flex-col">
        <div className="text-base text-justify">
          <p>Как независимая новостная организация, Investor Home зависит от источников в расследовании важных учреждений. В то время как мы ищем наши источники, чтобы говорить под запись, источники могут иногда полагаться на нас, чтобы защитить свою личность, когда они опасаются негативных последствий за высказывание. Узнайте, как безопасно связаться с журналистами Investor Home, здесь.</p>
          <p>4276 3819 5027 1483 9571 - Альфа Банк</p>
        </div>
        <div className="flex flex-row justify-around mt-2">
          <NavLink to="https://www.patreon.com/c/adge_nature" target='_blank' rel="noopener noreferrer"><img className="w-12 h-auto hover:opacity-75" src={patreonBlack} alt="link_patreon_black" /></NavLink>
          <NavLink to="https://ko-fi.com/admiralgeneral" target='_blank' rel="noopener noreferrer"><img className="w-12 h-auto hover:opacity-75" src={kofiBlack} alt="link_kofi_black" /></NavLink>
          <NavLink to="https://boosty.to/admiralgeneral1703" target='_blank' rel="noopener noreferrer"><img className="w-12 h-auto hover:opacity-75" src={boostyBlack} alt="link_boosty_black" /></NavLink>
        </div>
      </div>
    );
  };

  const modalText = (text: string) => {
    return (
      <div className="flex flex-col text-base text-justify">{text}</div>
    );
  };

//   const handleMouseLeave = (e) => {
//     const relatedTarget = e.relatedTarget;
//     if (relatedTarget && !e.currentTarget.contains(relatedTarget) && !e.currentTarget.querySelector('.form-container')?.contains(relatedTarget)) {
//       setHoveredElement(null);
//     }
//   };

  const handleFormMouseEnter = () => {
    // Форма остается видимой при наведении
  };

  const handleFormMouseLeave = (e: any) => {
    const relatedTarget = e.relatedTarget;
    if (relatedTarget && !e.currentTarget.contains(relatedTarget)) {
      setHoveredElement(null);
    }
  };

  return (
    <div className="w-full h-full relative">
      <Helmet>
        <title>Contact</title>
        <meta name="description" content="Contact page" />
      </Helmet>
      <div className="flex flex-row justify-between p-12">
        <div className="flex w-1/2 h-auto rounded-xl flex-col justify-between border border-slate-200">
          {contactInfoElements.map(({ name, icon }) => (
            <div
              className="flex items-center text-3xl transition-colors duration-300 hover:text-[#5E0000] p-4 gap-4 relative"
              key={name}
              onMouseEnter={(e) => handleMouseEnter(name, e)}
            >
              <span>{name}</span>
              <span><img src={icon} alt={name} /></span>
            </div>
          ))}
          <div className="flex justify-center items-center transition-colors duration-300 hover:text-[#5E0000] text-3xl gap-4 py-2">
            <span><img src={mailBlack} alt="mail icon" /></span>
            <span>admiralgeneral2003@gmail.com</span>
          </div>
        </div>
        <div className="flex rounded-xl overflow-hidden shadow">
          <img
            src={contactInfo}
            alt="Stock market display"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {hoveredElement && (
        <div
          className="absolute form-container p-4 shadow-lg rounded-lg z-10 transition-opacity duration-300"
          style={{
				top: `${position.top}px`,
				left: `${position.left}px`,
				opacity: hoveredElement ? 1 : 0,
				maxWidth: window.innerWidth >= 1440 ? '512px' : 'auto',
				backgroundColor: '#D9D9D9' }}
          onMouseEnter={handleFormMouseEnter}
          onMouseLeave={handleFormMouseLeave}
        >{hoveredElement}
        </div>
      )}
      <div className="w-full h-auto text-center tracking-wide">
        <img className="w-full h-auto" src={titleContact} alt="Contact page title" />
      </div>
    </div>
  );
};

export default Contact;