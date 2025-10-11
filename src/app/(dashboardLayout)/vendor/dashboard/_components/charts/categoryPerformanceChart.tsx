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
        text: "Category Performance",
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
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
            family: "'Inter', sans-serif",
            weight: 600,
          },
          callback: function (value: any) {
            return "$" + value;
          },
        },
      },
      x: {
        grid: { display: false },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
            family: "'Inter', sans-serif",
            weight: 600,
          },
        },
        border: { display: false },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};
