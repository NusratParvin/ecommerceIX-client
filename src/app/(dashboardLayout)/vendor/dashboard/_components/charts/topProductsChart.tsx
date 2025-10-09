/* eslint-disable @typescript-eslint/no-explicit-any */
// components/vendor-charts/TopProductsChart.tsx
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
import { getTopProductsData } from "@/lib/chartDataHelpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface TopProductsChartProps {
  products: Product[];
}

export const TopProductsChart = ({ products }: TopProductsChartProps) => {
  const { labels, data } = getTopProductsData(products);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data,
        borderColor: "#8854FE",
        backgroundColor: "rgba(136, 84, 254, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Top Products by Revenue",
      },
    },
    scales: {
      x: {
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
