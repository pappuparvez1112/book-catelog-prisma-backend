import { Book, Category, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  bookRelationalFields,
  bookRelationalFieldsMapper,
  bookSearchableFields,
} from './book.constant';
import { IBookFilterRequest } from './book.interface';
// import { IBookFilterRequest, IPriceFilter } from './book.interface';

const insertIntoDB = async (data: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  //   priceFilter:IPriceFilter,
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  console.log(filterData);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookRelationalFields.includes(key)) {
          return {
            [bookRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  if (filters.minPrice !== undefined) {
    whereConditions.price = {
      gte: filters.minPrice,
    };
  }

  if (filters.maxPrice !== undefined) {
    if (whereConditions.price) {
      whereConditions.price = filters.maxPrice;
    } else {
      whereConditions.price = {
        lte: filters.maxPrice,
      };
    }
  }

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },

    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id,
    },
    //   include: {
    //     academicFaculty: true,
    //     academicDepartment: true,
    //     academicSemester: true,
    //   },
  });
  return result;
};

//   const updateIntoDB = async (
//     id: string,
//     payload: Partial<Student>
//   ): Promise<Student> => {
//     const result = await prisma.student.update({
//       where: {
//         id,
//       },
//       data: payload,
//       include: {
//         academicSemester: true,
//         academicDepartment: true,
//         academicFaculty: true,
//       },
//     });
//     return result;
//   };

//   const deleteFromDB = async (id: string): Promise<Student> => {
//     const result = await prisma.student.delete({
//       where: {
//         id,
//       },
//       include: {
//         academicSemester: true,
//         academicDepartment: true,
//         academicFaculty: true,
//       },
//     });
//     return result;
//   };

const getBookCategory = async (id: string): Promise<Category[]> => {
  const result = await prisma.category.findMany({
    where: {
      id,
    },
    include: {
      book: true,
    },
  });
  return result;
};

export const BookService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  getBookCategory,
};
