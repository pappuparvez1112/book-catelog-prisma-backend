import { PrismaClient, User } from '@prisma/client';
import bcrypt from 'bcrypt';
import config from '../../../config';

const prisma = new PrismaClient();

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};
const getSingleUsers = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

const insertIntoDB = async (data: User): Promise<User> => {
  data.password = await bcrypt.hash(
    data.password,
    Number(config.bcrypt_salt_rounds)
  );
  console.log(data.password);

  const result = await prisma.user.create({
    data,
  });
  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<User>
): Promise<User> => {
  const result = await prisma.user.update({
    where: {
      id,
    },

    data: payload,
  });
  return result;
};

const deleteFromDB = async (id: string): Promise<User> => {
  const result = await prisma.user.delete({
    where: {
      id,
    },
  });
  return result;
};

export const UserService = {
  insertIntoDB,
  getAllUsers,
  getSingleUsers,
  updateIntoDB,
  deleteFromDB,
};
