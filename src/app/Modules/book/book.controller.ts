import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.constant';
import { BookService } from './book.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  //  const minPrice = pick(parseFloat(req.query.minPrice || '0'));
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);
  //   const priceFilter = pick(req.query,['maxPrice','minPrice']);
  const result = await BookService.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getByIdFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single book fetched successfully',
    data: result,
  });
});

//   const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const payload = req.body;
//     const result = await StudentService.updateIntoDB(id, payload);
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Student updated successfully',
//       data: result,
//     });
//   });

//   const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
//     const { id } = req.params;
//     const result = await StudentService.deleteFromDB(id);
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Student deleted successfully',
//       data: result,
//     });
//   });

const getBookCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookService.getBookCategory(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'books category getting successfully',
    data: result,
  });
});
export const BookController = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  getBookCategory,
};
