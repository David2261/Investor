import { Key } from "react";

interface DATA_ARTICLESItem {
    id: Key,
    category: string,
    text: string,
    img: string
}

const DATA_ARTICLES: DATA_ARTICLESItem[] = [
    {
        id: 1,
        category: 'ОФЗ',
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, dolore.",
        img: "http://dummyimage.com/32x32/4d494d/686a82.jpeg&text=placeholder+image"
    },
    {
        id: 2,
        category: 'Сбер',
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, dolore.",
        img: "http://dummyimage.com/32x32/4d494d/686a82.jpeg&text=placeholder+image"
    },
    {
        id: 3,
        category: 'Лукойл',
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, dolore.",
        img: "http://dummyimage.com/32x32/4d494d/686a82.jpeg&text=placeholder+image"
    },
    {
        id: 4,
        category: 'Газпром',
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, dolore.",
        img: "http://dummyimage.com/32x32/4d494d/686a82.jpeg&text=placeholder+image"
    },
    {
        id: 5,
        category: 'Татнефть',
        text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, dolore.",
        img: "http://dummyimage.com/32x32/4d494d/686a82.jpeg&text=placeholder+image"
    },
]

export default DATA_ARTICLES;