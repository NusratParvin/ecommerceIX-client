import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
);

const SalesTrendChart = ({ sales }) => {
  console.log(sales);
  const chartData = {
    labels: sales.labels,
    datasets: [
      {
        label: "Sales Amount",
        data: sales.data,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
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
      title: {
        display: true,
        text: "Total Users Growth",
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `Total Users: ${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Total Users",
        },
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
    },
  };

  return (
    // <div style={{ height: `${height}px` }} className="w-full">
    <Line data={chartData} options={options} className="w-full border-4" />
    // </div>
  );
};
export default SalesTrendChart;
