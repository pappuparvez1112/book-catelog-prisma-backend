import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserService } from './user.service';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUsers();
    res.send({
      success: true,
      message: 'Data fetched successfully',
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getSingleUsers(req.params.id);
    res.send({
      success: true,
      message: 'Single Data fetched successfully',
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};
const insertIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await UserService.insertIntoDB(req.body);
    res.send({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};
const updateIntoDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await UserService.updateIntoDB(id, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});
const deleteFromDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.deleteFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserController = {
  insertIntoDB,
  getAllUsers,
  getSingleUser,
  updateIntoDB,
  deleteFromDB,
};
