import { useState, useEffect } from 'react';


const DailyDate = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const updateDate = () => {
            setCurrentDate(new Date());
        };
        const intervalId = setInterval(updateDate, 24 * 60 * 60 * 1000);
        updateDate();
        return () => clearInterval(intervalId);
    }, []);

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('ru-RU', options);

    return formattedDate;
};

export default DailyDate;