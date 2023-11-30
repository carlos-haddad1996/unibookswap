export interface BookUpload {
    id?: number;
    title: string;
    author: string;
    price: string;
    description: string;
    category: string;
    image: File;
}

export interface Book {
    id: number;
    title: string;
    author: string;
    price: string;
    description: string;
    category: string;
    image: string;
}
