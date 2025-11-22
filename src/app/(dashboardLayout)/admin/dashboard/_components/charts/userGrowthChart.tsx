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
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip
);

interface SimpleUserChartProps {
  users: any[];
  height?: number;
}

const SimpleUserChart = ({ users, height = 250 }: SimpleUserChartProps) => {
  // Super simple - just show total users growing over months
  const processData = () => {
    if (users.length === 0) return { labels: [], data: [] };

    const monthlyTotals: { [key: string]: number } = {};
    let runningTotal = 0;

    // Get all months with users, sorted
    const allMonths = [
      ...new Set(
        users.map((user) => moment(user.createdAt).format("MMM YYYY"))
      ),
    ].sort(
      (a, b) =>
        moment(a, "MMM YYYY").valueOf() - moment(b, "MMM YYYY").valueOf()
    );

    // Calculate cumulative totals
    allMonths.forEach((month) => {
      const monthUsers = users.filter(
        (user) => moment(user.createdAt).format("MMM YYYY") === month
      );
      runningTotal += monthUsers.length;
      monthlyTotals[month] = runningTotal;
    });

    return {
      labels: allMonths,
      data: allMonths.map((month) => monthlyTotals[month]),
    };
  };

  const { labels, data } = processData();

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Users",
        data: data,
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
    <div style={{ height: `${height}px` }} className="w-full">
      {users.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg">
          <div className="text-center text-gray-500">
            <p>No user data yet</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SimpleUserChart;
