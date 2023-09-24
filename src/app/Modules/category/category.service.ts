import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllFromDB = async () =>
  //   options: IPaginationOptions
  {
    //   const { page, limit, skip } = paginationHelpers.calculatePagination(options);

    const result = await prisma.category.findMany({
      // skip,
      // take: limit,
      // orderBy:
      //   options.sortBy && options.sortOrder
      //     ? {
      //         [options.sortBy]: options.sortOrder,
      //       }
      //     : {
      //         createdAt: 'desc',
      //       },
    });
    return result;
  };
//   const total = await prisma.category.count({
//     skip,
//     take,
//     orderBy
//   });

//   return {
//     meta: {
//       page,
//       limit,
//       total,
//     },
//     data: result,
//   };
// };

const getByIdFromDB = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
  });
  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<Category>
): Promise<Category> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteByIdFromDB = async (id: string): Promise<Category> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateOneInDB,
  deleteByIdFromDB,
};
