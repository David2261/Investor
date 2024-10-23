import { Key, FunctionComponent } from "react";
import { Link } from "react-router-dom";
import DonateVerticalBlock from '../../widgets/DonationBlocks.tsx';

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
const PostsList: FunctionComponent<PostsListType> = (props: PostsListType) => {
	const n = 4;
	return (props.data.map((value: PropsType, index) =>
		<div key={value.id} className="border-b-2 py-4 border-slate-200 mb-4">
			{(index + 1) % n == 0 ? <DonateVerticalBlock /> : false }
			<Link to={`/news/${value.category.slug}/${value.slug}`}>
				<div className="grid grid-cols-3 gap-8">
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
						<p className="text-base">{value.summary}...</p>
					</div>
					<div>
						<img src={value.img} className="rounded-lg" alt="" />
					</div>
				</div>
			</Link>
		</div>
	));
}

export default PostsList;