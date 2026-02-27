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
  type ChartOptions,
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
  Filler,
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
        borderColor: "#8854FE",
        backgroundColor: "rgba(136, 84, 254, 0.2)",
        fill: true,
        tension: 0.4,
        borderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
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
        text: "Revenue Trends",
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
          // weight optional
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
          callback: (value) => {
            if (typeof value === "number") return "$" + value.toLocaleString();
            const num = Number(value);
            return Number.isFinite(num)
              ? "$" + num.toLocaleString()
              : String(value);
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
    elements: {
      line: { tension: 0.4 },
      point: {
        radius: 0,
        hoverRadius: 6,
        hoverBackgroundColor: "#8854FE",
        hoverBorderColor: "#ffffff",
        hoverBorderWidth: 2,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  return <Line data={chartData} options={options} />;
};
