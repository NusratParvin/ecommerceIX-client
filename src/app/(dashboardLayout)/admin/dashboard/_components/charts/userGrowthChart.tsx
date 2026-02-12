/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Line } from "react-chartjs-2";

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

type UserGrowthData = {
  labels: string[];
  data: number[];
};

export const UserGrowthChart = ({ data }: { data: UserGrowthData }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "New Users",
        data: data.data,
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4, // Smooth curve
        pointRadius: 4,
        pointBackgroundColor: "#3B82F6",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#3B82F6",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#1F2937",
        titleColor: "#F9FAFB",
        bodyColor: "#F9FAFB",
        padding: 12,
        displayColors: false,
        callbacks: {
          label: function (context: any) {
            return `${context.parsed.y} new users`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months of the year",
          color: "#6b7280",
        },
        grid: {
          display: true,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: "#6B7280",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Users",
          color: "#6b7280",
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
        ticks: {
          font: {
            size: 11,
          },
          color: "#6B7280",
          stepSize: 1,
          callback: function (value: any) {
            return Math.floor(value);
          },
        },
      },
    },
  };

  return (
    <div className="h-full">
      <Line data={chartData} options={options} />
    </div>
  );
};
