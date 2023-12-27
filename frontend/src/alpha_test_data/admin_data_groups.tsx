type Content = 'Группы' | 'Статьи' | 'Облигации' | 'Категории' | 'IPs' | 'Tokens';

interface SideBarDataItem {
    id: number;
    title: string;
    content: Content[];
}

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