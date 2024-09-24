export interface User {
  id?: string;
  username: string;
  password: string;
  books?: Book[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
}
