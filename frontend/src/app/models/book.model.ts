export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publishedDate: string;
  category: string;
  description: string;
  availableCopies: number;
  totalCopies: number;
  coverImageUrl?: string;
}
