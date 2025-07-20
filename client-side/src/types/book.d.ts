type Book = {
  id: string;
  title: string;
  author: {
    id: string;
    name: string;
    bio: string;
    createdAt: Date;
    updatedAt: Date;
  };
  price: number;
  category: string;
  coverImage: string;
  bookPDF: string;
  ratings: number[];
  digital: boolean;
  requiresLogin: boolean;
  comments: any[];
  description: string;
};
