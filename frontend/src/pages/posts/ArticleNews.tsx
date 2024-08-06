import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.ts";


interface ArticleNewsAPI {
  author: string | null,
  readTime: string | null,
  title: string,
  description: string,
  category: {
    name: string,
    slug: string
  },
  img: string,
  time_create: string,
  slug: string,
}

const ArticleNews = () => {
	const {category, slug} = useParams();
	const {article, error} : {
    article: ArticleNewsAPI | null,
    error: {
      message: string
    }} = useFetch(`http://127.0.0.1:8000/api/articles/articles/${category}/${slug}`);

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!article) {
		return <div>Loading...</div>;
	}

	return <>
	<div className="w-full h-full font-mono">
      <p className="flex flex-row justify-center uppercase text-green-500 text-lg pt-10">{article.category.name}</p>
      <h1 className="flex flex-row justify-center text-3xl uppercase">{article.title}</h1>
      <div className="flex flex-row justify-center">
        {/* <img className="rounded-full" aria-label="logo" src={article.image} alt={article.image} /> */}
        <div className="flex-col px-4">
          <p className="text-lg">{article.author ? article.author : "Булат Насыров"}</p>
          <p className="text-lg text-slate-500">{article.time_create} · {article.readTime} min read</p>
        </div>
      </div>
      <div className="py-4 flex flex-col px-4">
        <img src={`http://127.0.0.1:8000${article.img}`} alt={article.title} />
        <div className="pt-4 px-16 gap-4">
          <p className="text-xl text-slate-500">{article.description}</p>
        </div>
      </div>
    </div>
	</>
};

export default ArticleNews;