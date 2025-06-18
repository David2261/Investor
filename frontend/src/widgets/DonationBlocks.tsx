import { useState, useEffect } from 'react';
import { getRandomImage } from './getRandomImage';

const DonateVerticalBlock = () => {
	const [randomImage, setRandomImage] = useState('');
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let isMounted = true;

		const fetchImage = async () => {
			try {
				setLoading(true);
				const imageUrl = await getRandomImage();
				if (isMounted) {
					setRandomImage(imageUrl);
				}
			} catch (error) {
				console.error('Ошибка при загрузке изображения:', error);
			} finally {
				if (isMounted) {
					setLoading(false);
				}
			}
		};

		fetchImage();

		return () => {
			isMounted = false;
		};
	}, []);

    return (
    <div id="donate-block" className="grid grid-cols-3 gap-8 border-b-2 py-4 border-slate-200 mb-4">
      <div className="col-span-2">
        <p className="uppercase font-bold pb-2">Спасибо, что пользуетесь сайтом! Поддержите автора</p>
        <p className="text-base pt-4">
          Если вам понравился мой контент, купите мне кофе и дайте мне силы продолжать создавать интересный контент!<br />
          <a href="https://ko-fi.com/admiralgeneral">Купите мне кофе</a>
        </p>
        <br />
        <p className="text-base">
          Ваша поддержка значит для меня очень много!<br />
          <a href="https://new.donatepay.ru/@1097922">Пожертвование</a>
        </p>
      </div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <img src={randomImage} className="rounded-lg" alt="Random cute image" />
        )}
      </div>
    </div>
    );
};

export default DonateVerticalBlock;