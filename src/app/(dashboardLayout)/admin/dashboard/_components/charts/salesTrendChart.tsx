import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  // Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  // Filler,
);

interface SalesProps {
  labels: string[];
  data: number[];
}
const SalesTrendChart = ({ sales }: { sales: SalesProps }) => {
  console.log(sales);
  if (!sales || !sales.labels || !sales.data) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        No sales data available
      </div>
    );
  }

  const chartData = {
    labels: sales.labels,
    datasets: [
      {
        label: "Sales Amount",
        data: sales.data,
        borderColor: "#FB923C",
        // backgroundColor: "rgba(59, 130, 246, 0.1)",
        backgroundColor: "rgba(251, 146, 60, 0.2)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#FB923C",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // const options = {
  //   responsive: true,
  //   maintainAspectRatio: false,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     title: {
  //       display: true,
  //       text: "Total Users Growth",
  //     },
  //     tooltip: {
  //       callbacks: {
  //         // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //         label: function (context: any) {
  //           return `Total Users: ${context.parsed.y}`;
  //         },
  //       },
  //     },
  //   },
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //       title: {
  //         display: true,
  //         text: "Total Users",
  //       },
  //     },
  //     x: {
  //       title: {
  //         display: true,
  //         text: "Months",
  //       },
  //     },
  //   },
  // };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      // title: {
      //   display: true,
      //   text: "Sales Trend",
      //   color: "#374151",
      //   font: {
      //     size: 16,
      //     weight: "bold" as const,
      //   },
      // },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: function (context: any) {
            return `Sales: $${context.parsed.y.toLocaleString()}`;
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Sales Amount ($)",
          color: "#6b7280",
        },
        ticks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          callback: function (value: any) {
            return `$${value.toLocaleString()}`;
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Days of Month",
          color: "#6b7280",
        },
      },
    },
  };

  return (
    // <div style={{ height: `${height}px` }} className="w-full">
    <Line data={chartData} options={options} className="w-full h-full  " />
    // </div>
  );
};
export default SalesTrendChart;
