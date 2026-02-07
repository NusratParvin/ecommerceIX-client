/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface CategoryDistributionChartProps {
  data: {
    labels: string[];

    data: number[];
    backgroundColor: string[];
  };
}

export const CategoryDistributionChart = ({
  data,
}: CategoryDistributionChartProps) => {
  if (!data || !data.labels || !data.data) {
    return (
      <div className="h-80 flex items-center justify-center">
        <p className="text-gray-500">No category data available</p>
      </div>
    );
  }

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.data,
        backgroundColor: data.backgroundColor,
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 25,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "45%",
    layout: {
      padding: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.dataset.data.reduce(
              (a: number, b: number) => a + b,
              0,
            );
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} products (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="h-full">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};
