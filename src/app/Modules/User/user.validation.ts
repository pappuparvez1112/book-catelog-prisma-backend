import { z } from 'zod';
import { UserRole } from './user.constant';

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    role: z.enum([...UserRole] as [string, ...string[]], {
      required_error: 'Role is required ',
    }),

    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    address: z.string({
      required_error: ' address is required',
    }),
    contactNo: z.string({
      required_error: 'budget is required',
    }),

    profileImg: z.string().optional(),
  }),
});
const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    address: z.string().optional(),
    contactNo: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
