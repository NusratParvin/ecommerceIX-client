import { TOrder } from "@/types";
import moment from "moment";

const monthlyRevenue = (monthData: string, orders: TOrder[]) => {
  let sumOfRevenues = 0;

  orders.forEach((o) => {
    const orderMonth = moment(o?.createdAt).format("YYYY-MM");
    if (monthData === orderMonth) {
      sumOfRevenues += o?.totalPrice;
    }
  });
  return sumOfRevenues;
};

export const calculateMonthlyRevenueGrowth = (orders: TOrder[]) => {
  const currentMonth = moment().format("YYYY-MM");
  const previousMonth = moment().subtract(1, "month").format("YYYY-MM");

  const currentMonthRevenue = monthlyRevenue(currentMonth, orders);
  const previousMonthRevenue = monthlyRevenue(previousMonth, orders);

  let growthPercentage = 0;
  if (previousMonthRevenue > 0) {
    growthPercentage =
      ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) *
      100;
  } else if (currentMonthRevenue > 0) {
    growthPercentage = 100;
  }

  const roundedGrowth = Math.round(growthPercentage);
  // console.log(roundedGrowth);

  return roundedGrowth;
};
