/* eslint-disable @typescript-eslint/no-explicit-any */
// components/vendor-charts/RevenueTrendsChart.tsx
"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { TOrder } from "@/types";
import { getRevenueTrendsData } from "@/lib/chartDataHelpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RevenueTrendsChartProps {
  orders: TOrder[];
}

export const RevenueTrendsChart = ({ orders }: RevenueTrendsChartProps) => {
  const { labels, data } = getRevenueTrendsData(orders);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Monthly Revenue",
        data,
        // borderColor: "rgb(139, 69, 19)",
        borderColor: "#8854FE",
        // backgroundColor: "rgba(139, 69, 19, 0.1)",
        backgroundColor: "rgba(136, 84, 254, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Revenue Trends",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return "$" + value;
          },
        },
      },
    },
  };

  return <Line data={chartData} options={options} />;
};
