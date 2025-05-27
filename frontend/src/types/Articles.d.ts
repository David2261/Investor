export interface BlogAPIType {
    id: number;
    category: {
        name: string;
        slug: string;
    };
    title: string;
    img: string | undefined;
    slug: string;
    time_create: string;
    reading_time_minutes: number;
    summary: string;
}