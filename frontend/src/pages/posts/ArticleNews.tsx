import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch.ts";

const ArticleNews = () => {
	const {category, slug} = useParams();
	const { data: article, error } = useFetch(`http://127.0.0.1:8000/api/articles/articles/${category}/${slug}`);

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (!article) {
		return <div>Loading...</div>;
	}

	return <>
	<div className="w-full h-full font-mono">
      <p className="flex flex-row justify-center uppercase text-green-500 text-lg pt-10">{category}</p>
      <h1 className="flex flex-row justify-center text-3xl uppercase">{article.title}</h1>
      <div className="flex flex-row justify-center">
        <img className="rounded-full" aria-label="logo" src={article.image} alt={article.image} />
        <div className="flex-col px-4">
          <p className="text-lg">{article.author}</p>
          <p className="text-lg text-slate-500">{article.date} · {article.readTime} min read</p>
        </div>
      </div>
      <div className="py-4 flex flex-col px-4">
        <img src={article.featuredImage} alt={article.featuredImage} />
        <div className="pt-4 px-16 gap-4">
          <p className="text-xl font-bold">{article.excerpt}</p>
          <p className="text-xl text-slate-500">{article.content}</p>
        </div>
      </div>
    </div>
	</>
};

export default ArticleNews;