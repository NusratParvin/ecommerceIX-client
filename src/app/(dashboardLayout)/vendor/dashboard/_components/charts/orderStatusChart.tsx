"use client";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { TOrder } from "@/types";
import { getOrderStatusData } from "@/lib/chartDataHelpers";

ChartJS.register(ArcElement, Tooltip, Legend);

interface OrderStatusChartProps {
  orders: TOrder[];
}

export const OrderStatusChart = ({ orders }: OrderStatusChartProps) => {
  const { labels, data } = getOrderStatusData(orders);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)", // Green for PAID
          "rgba(249, 115, 22, 0.8)", // Orange for PENDING
          "rgba(239, 68, 68, 0.8)", // Red for FAILED
          "rgba(156, 163, 175, 0.8)", // Gray for others
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(249, 115, 22)",
          "rgb(239, 68, 68)",
          "rgb(156, 163, 175)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#374151",
          font: {
            size: 14,
            family: "'Inter', sans-serif",
            weight: 500,
          },
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Order Status Distribution",
        color: "#111827",
        font: {
          size: 14,
          family: "'Inter', sans-serif",
          weight: 600,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        titleFont: {
          size: 14,
          family: "'Inter', sans-serif",
        },
        bodyFont: {
          size: 13,
          family: "'Inter', sans-serif",
        },
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};
