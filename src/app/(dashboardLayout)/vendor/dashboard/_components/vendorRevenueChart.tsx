"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for the chart
const chartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Revenue",
      data: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
      backgroundColor: "#8b5cf6",
      borderRadius: 8, // Use `borderRadius` to round corners of bars
      barThickness: 20, // Adjust bar width for better visual appearance
    },
  ],
};

// Chart.js options
const chartOptions: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
      labels: {
        color: "#4B5563",
        font: {
          size: 12,
        },
      },
    },
    tooltip: {
      backgroundColor: "#fff",
      bodyColor: "#374151",
      titleColor: "#111827",
      borderColor: "#D1D5DB",
      borderWidth: 1,
      callbacks: {
        label: function (context) {
          return `$${context.raw}`; // Format tooltip values as currency
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false, // Hide grid lines on the X-axis
      },
      ticks: {
        color: "#6B7280",
        font: {
          size: 12,
        },
      },
    },
    y: {
      grid: {
        color: "#E5E7EB", // Line color
      },
      ticks: {
        color: "#6B7280",
        font: {
          size: 12,
        },
        callback: function (value) {
          return `$${value}`; // Format axis values as currency
        },
      },
    },
  },
};

export function VendorRevenueChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Shop Revenue</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <Bar data={chartData} options={chartOptions} />
      </CardContent>
    </Card>
  );
}
