import { useMemo, useRef, useEffect, lazy, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// Types
import { ArticleNewsAPI } from '@/types/Article';
const AdvertisingBlock = lazy(() => import('@/components/Home/AdvertisingBlock'));
// Styles
import "@/styles/pages/posts/ArticleNews.module.css";

const apiURL = import.meta.env.VITE_API_URL;

// Компонент для ленивой загрузки секций текста
const LazySection = ({ htmlContent }: { htmlContent: string }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`transition-opacity duration-500 ${isVisible ? 'opacity-100 animate' : 'opacity-0'}`}
      dangerouslySetInnerHTML={{ __html: isVisible ? htmlContent : '' }}
    />
  );
};

const ArticleNews = () => {
  const { category, slug } = useParams();
  const { data, error, isLoading } = useQuery<ArticleNewsAPI>({
    queryKey: ['article', category, slug],
    queryFn: async () => {
      const response = await axios.get(`${apiURL}/api/articles/articles/${category}/${slug}`, { withCredentials: true });
      return response.data;
    },
    enabled: !!category && !!slug,
  });

  // Парсинг и разбиение description на секции
  const contentSections = useMemo(() => {
    if (!data?.description) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.description, 'text/html');
    const elements = Array.from(doc.body.children); // Разбиваем на элементы (p, h2, и т.д.)
    
    return elements.map((element, index) => {
      // Генерируем уникальный ID для каждого элемента
      const id = element.id || `section-${index + 1}-${element.textContent?.toLowerCase().replace(/\s+/g, '-') || ''}`;
      element.id = id;
      return {
        id,
        html: element.outerHTML,
      };
    });
  }, [data?.description]);

  // Генерация оглавления
  const tableOfContents = useMemo(() => {
    if (!data?.description) return [];

    const parser = new DOMParser();
    const doc = parser.parseFromString(data.description, 'text/html');
    const h2Elements = Array.from(doc.querySelectorAll('h2'));

    return h2Elements.map((h2, index) => {
      const id = h2.id || `section-${index + 1}-${h2.textContent?.toLowerCase().replace(/\s+/g, '-') || ''}`;
      h2.id = id;
      return {
        id,
        text: h2.textContent || `Section ${index + 1}`,
      };
    });
  }, [data?.description]);

  if (isLoading) return <div className="text-center py-10">Загрузка...</div>;
  if (error) return <div className="text-center text-red-600">Ошибка: {error.message}</div>;
  if (!data) return <div className="text-center text-gray-600">Статья не найдена</div>;

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 font-sans">
      <Helmet>
        <title>{data.title}</title>
        <meta name="description" content={`${data.title} | ${data.category.name}`} />
      </Helmet>

      <div className="grid md:grid-cols-12 gap-8 py-8">
        {/* Main Content */}
        <div className="md:col-span-8">
          <p className="uppercase text-sm font-medium text-indigo-600">{data.category.name}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4 leading-tight">
            {data.title}
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            {new Date(data.time_create).toLocaleDateString()} · {data.reading_time_minutes} min read
          </p>
          <img
            src={`${apiURL}/${data.img}`}
            alt={data.title}
            className="w-full rounded-lg object-cover mb-6"
          />
          <div className="prose max-w-none text-justify text-gray-800">
            {contentSections.map((section) => (
              <LazySection key={section.id} htmlContent={section.html} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="md:col-span-4 space-y-6">
          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Оглавление</h3>
              <ul className="space-y-2 text-sm" role="navigation" aria-label="Table of Contents">
                {tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-gray-700 hover:text-indigo-600 hover:underline transition-colors duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Call to Action */}
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <AdvertisingBlock />
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ArticleNews;