import { Key, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import DonateVerticalBlock from '@/widgets/DonationBlocks.tsx';

interface PropsType {
	id: Key,
	category: {
		name: string,
		slug: string
	},
	title: string,
	img: string | undefined,
	slug: string,
	time_create: string,
	summary: string,
	reading_time_minutes: number
}

interface PostsListType {
	data: PropsType[],
}

// Блок статьи
const PostsList: FunctionComponent<PostsListType> = ({ data }) => {
	const n = 4;

	return (
		<>
			{data.map((value, index) => (
				<div key={value.id || index} className="border-b-2 py-4 border-slate-200 mb-4">
					{(index + 1) % n === 0 && <DonateVerticalBlock />}

					<Link to={`/news/${value.category.slug}/${value.slug}`}>
						<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
							<div className="col-span-2">
								<p className="uppercase font-bold pb-2">{value.title}</p>
								<p className="italic text-slate-300 font-light">{value.time_create}</p>
								<p className="italic text-slate-300 font-light pb-4">
									{value.reading_time_minutes < 6 ? (
										<>Статью можно прочитать быстро!</>
									) : (
										<>Статью можно прочитать за {value.reading_time_minutes} минуты!</>
									)}
								</p>
								<p
									dangerouslySetInnerHTML={{ __html: value.summary }}
									className="text-base"
								/>
							</div>
							<div className="col-span-2 md:col-span-1">
								{value.img && (
									<img src={value.img} className="rounded-lg" alt={value.title} />
								)}
							</div>
						</div>
					</Link>
				</div>
			))}
		</>
	);
};

export default PostsList;