export type IBookFilterRequest = {
  searchTerm?: string | undefined;
  categoryId?: string | undefined;
  maxPrice?: number | undefined;
  minPrice?: number | undefined;
};

// export type ICreateBook = {
//   id: string;
//   title: string;
//   author: string;
//   price: number;
//   genre: string;
//   createdAt: Date;
//   updatedAt: Date;
//   publicationDate: string;
//   categoryId: string;
// };
