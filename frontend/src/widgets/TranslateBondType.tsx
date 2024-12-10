

const TranslateBondType = (bondType: string) => {
    const translations: Record<string, string> = {
        'municipal bonds': 'Муниципальные облигации',
        'corporate bonds': 'Корпоративные облигации',
        'federal loan bonds': 'Облигации федерального займа',
    };
    return translations[bondType.toLowerCase()] || bondType;
};

export default TranslateBondType;