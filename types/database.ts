export type BookStatus = "tbr" | "reading" | "finished";

export interface Book {
  id: string;
  title: string;
  date_started: string | null;
  date_finished: string | null;
  status: BookStatus;
  star_rating: number | null;
  translated: boolean;
  created_at: string;
  authors: Author[];
}

export interface Author {
  id: string;
  name: string;
  created_at: string;
}
