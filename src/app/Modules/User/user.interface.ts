export type IUserRole = 'Customer' | 'Admin';

export type IUser = {
  id: string;
  password: string;
  role: IUserRole;
  name: string;
  phoneNumber: number;
  address: string;
  budget: number | undefined;
  income: string;
  profileImage?: string;
};
export type IUserFilters = {
  searchTerm?: string;
};

// export type IUserModel = Model<IUser>;
