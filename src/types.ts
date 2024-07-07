export interface Author {
  address: {
    city: string;
    geo: { lat: string; lng: string };
    street: string;
    suite: string;
    zipcode: string;
  };
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

export interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
  author?: Author;
}

export type AuthorSelectOption = { label: string; value: number };
