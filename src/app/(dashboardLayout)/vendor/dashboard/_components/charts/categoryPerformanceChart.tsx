/* eslint-disable @typescript-eslint/no-explicit-any */
// components/vendor-charts/CategoryPerformanceChart.tsx
"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Product } from "@/types";
import { getCategoryPerformanceData } from "@/lib/chartDataHelpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CategoryPerformanceChartProps {
  products: Product[];
}

export const CategoryPerformanceChart = ({
  products,
}: CategoryPerformanceChartProps) => {
  const { labels, data } = getCategoryPerformanceData(products);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue by Category",
        data,
        borderColor: "#8854FE",
        backgroundColor: "rgba(136, 84, 254, 0.2)",
        borderWidth: 1,
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
        text: "Category Performance",
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

  return <Bar data={chartData} options={options} />;
};
