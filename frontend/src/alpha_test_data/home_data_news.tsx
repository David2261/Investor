import { Key } from "react";

interface DATANEWSItem {
    id: Key,
	category: string,
    title: string
}

const DATANEWS: DATANEWSItem[] = [
	{
		id: 1,
		category: 'Markets',
		title: 'Bearish investor Boaz Weinstein is feeling the pain from this year\'s unexpected stock rally'
	},
];

export default DATANEWS;