

const imageNames: { [key: number]: string } = {};

for (let i = 1; i <= 8; i++) {
    imageNames[i] = `${i}.webp`;
}

export const getRandomImage = () => {
    const imageKeys = Object.keys(imageNames);
    const randomIndex = Math.floor(Math.random() * imageKeys.length);
    const randomKey = parseInt(imageKeys[randomIndex], 8);
    return `/src/assets/donate/${imageNames[randomKey]}`;
};