export interface ArticleNewsAPI {
  author: string | null;
  readTime: string | null;
  title: string;
  description: string;
  category: {
    name: string;
    slug: string;
  };
  img: string;
  time_create: string;
  slug: string;
  reading_time_minutes: number;
}
