export interface User extends UserNamePassword {
  id: string;
  books: Book[];
}

export interface Book {
  id: number;
  title: string;
  author: string;
  publication_year: number;
  genre: string[];
  description: string;
  cover_image: string;
}

export interface UserNamePassword {
  username: string;
  password: string;
}
