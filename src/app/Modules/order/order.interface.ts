import { OrderSummaryStatus } from '@prisma/client';

export type IOrderCreateData = {
  id: string;
  userId: string;
  status: OrderSummaryStatus;
  orderedBooks: IOrderRequest[];
};
export type IOrderRequest = {
  bookId: string;
  quantity: number;
};
