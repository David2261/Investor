import img1 from "/src/assets/donate/1.webp";
import img2 from "/src/assets/donate/2.webp";
import img3 from "/src/assets/donate/3.webp";
import img4 from "/src/assets/donate/4.webp";
import img5 from "/src/assets/donate/5.webp";
import img6 from "/src/assets/donate/6.webp";
import img7 from "/src/assets/donate/7.webp";
import img8 from "/src/assets/donate/8.webp";

const donateImages = [img1, img2, img3, img4, img5, img6, img7, img8];

export const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * donateImages.length);
    return donateImages[randomIndex];
};