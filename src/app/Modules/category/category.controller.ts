import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category of books created successfully!',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  //     console.log(req.query)
  //   const filters = pick(req.query, buildingFilterableFields);
  //   const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  const result = await CategoryService.getAllFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category of books fetched successfully!',
    // meta: result.meta,
    data: result,
  });
});

// const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await BuildingService.getByIdFromDB(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Building fetched successfully',
//     data: result,
//   });
// });

// const updateOneInDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await BuildingService.updateOneInDB(id, req.body);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Building updated successfully',
//     data: result,
//   });
// });

// const deleteByIdFromDB = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const result = await BuildingService.deleteByIdFromDB(id);
//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Building delete successfully',
//     data: result,
//   });
// });

export const CategoryController = {
  insertIntoDB,
  getAllFromDB,
  //   getByIdFromDB,
  //   updateOneInDB,
  //   deleteByIdFromDB,
};
