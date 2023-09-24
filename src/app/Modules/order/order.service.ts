import { Order } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { IOrderCreateData } from './order.interface';

const insertIntoDB = async (data: IOrderCreateData): Promise<Order> => {
  const result = await prisma.order.create({
    data,
  });

  return result;
};

const getAllFromDB = async () => {
  const result = await prisma.order.findMany({});
  return result;
};

const getByIdFromDB = async (id: string): Promise<Order | null> => {
  const result = await prisma.order.findUnique({
    where: {
      id,
    },
  });
  return result;
};
export const OrderService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
};
