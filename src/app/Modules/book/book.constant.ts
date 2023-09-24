export const bookFilterableFields: string[] = [
  'searchTerm',
  'title',
  'author',
  'genre',
  'price',
  'categoryId',
];

export const bookSearchableFields: string[] = ['title', 'author', 'genre'];

export const bookRelationalFields: string[] = ['categoryId'];
export const bookRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
