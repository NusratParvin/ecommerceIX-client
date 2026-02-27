/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const shopColors = [
  { bg: "rgba(59, 130, 246, 0.2)", border: "rgb(59, 130, 246)" },
  { bg: "rgba(16, 185, 129, 0.2)", border: "rgb(16, 185, 129)" },
  { bg: "rgba(245, 158, 11, 0.2)", border: "rgb(245, 158, 11)" },
  { bg: "rgba(139, 92, 246, 0.2)", border: "rgb(139, 92, 246)" },
  { bg: "rgba(236, 72, 153, 0.2)", border: "rgb(236, 72, 153)" },
];

type RadarChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
  }[];
};

export const ShopPerformanceChart = ({ data }: { data: RadarChartData }) => {
  const chartData = {
    labels: data?.labels,
    datasets: data?.datasets.map((dataset, index) => ({
      label: dataset?.label,
      data: dataset?.data,
      backgroundColor: shopColors[index % shopColors?.length].bg,
      borderColor: shopColors[index % shopColors?.length].border,
      borderWidth: 1,
      fill: true,
      pointBackgroundColor: shopColors[index % shopColors?.length].border,
      pointBorderColor: "#ffffff",
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 1,
    layout: {
      padding: {
        bottom: 6,
      },
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            size: 12,
            weight: 600 as number,
          },
          padding: 5,
          boxWidth: 20,
        },
        maxHeight: 40,
        fullSize: false,
      },
      tooltip: {
        titleFont: {
          size: 14,
          weight: 500 as number,
        },
        padding: 15,
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        suggestedMax: 100,
        pointLabels: {
          font: {
            size: 12,
            weight: 700 as number,
          },
          color: "#374151",
        },
        ticks: {
          font: {
            size: 12,
            weight: 500 as number,
          },
          color: "#6B7280",
          stepSize: 20,
          callback: function (value: any) {
            return value + "%";
          },
          backdropColor: "transparent",
        },
        angleLines: {
          color: "rgba(0, 0, 0, 0.08)",
          lineWidth: 1,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
          circular: true,
        },
      },
    },
  };

  return <Radar data={chartData} options={options} />;
};
