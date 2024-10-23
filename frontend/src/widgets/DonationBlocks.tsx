import { useState, useEffect } from 'react';

const imageNames: { [key: number]: string } = {};

for (let i = 1; i <= 9; i++) {
    imageNames[i] = `${i}.webp`;
}

export const getRandomImage = () => {
    const imageKeys = Object.keys(imageNames);
    const randomIndex = Math.floor(Math.random() * imageKeys.length);
    const randomKey = parseInt(imageKeys[randomIndex], 9);
    return `/src/assets/donate/${imageNames[randomKey]}`;
};
  
const DonateVerticalBlock = () => {
    const [randomImage, setRandomImage] = useState('');
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      const randomImageUrl = getRandomImage();
      setRandomImage(randomImageUrl);
      setLoading(false);
    }, []);

    return (
    <div className="grid grid-cols-3 gap-8 border-b-2 py-4 border-slate-200 mb-4">
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