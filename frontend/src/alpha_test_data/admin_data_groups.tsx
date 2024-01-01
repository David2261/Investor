import { Key } from "react";

type SideBarDataItem = {
    id: Key,
    title: string,
    content: string[],
};

const SideBarDATA: SideBarDataItem[] = [
    {
        id: 1,
        title: 'Пользователи и группы',
        content: ['Группы']
    },
    {
        id: 2,
        title: 'СТАТЬИ',
        content: ['Статьи', "Облигации", "Категории", "IPs"]
    },
    {
        id: 3,
        title: 'ТОКЕН АУТЕНТИФИКАЦИИ',
        content: ['Tokens']
    }
]

export default SideBarDATA;