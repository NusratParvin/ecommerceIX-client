// "use client";

// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // Data for the chart
// const chartData = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//   datasets: [
//     {
//       label: "Revenue",
//       data: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
//       borderColor: "#8b5cf6",
//       backgroundColor: "rgba(139, 92, 246, 0.2)",
//       borderWidth: 2,
//       tension: 0.4, // Smooth curve
//     },
//   ],
// };

// // Chart.js options
// const chartOptions = {
//   responsive: true,
//   plugins: {
//     legend: {
//       display: true,
//       position: "top", // Explicitly use "top" to avoid type issues
//       labels: {
//         color: "#4B5563", // Gray color for legend text
//         font: {
//           size: 12,
//         },
//       },
//     },
//     tooltip: {
//       backgroundColor: "#fff",
//       titleColor: "#374151",
//       bodyColor: "#6B7280",
//       borderColor: "#D1D5DB",
//       borderWidth: 1,
//       titleFont: {
//         size: 14,
//       },
//       bodyFont: {
//         size: 12,
//       },
//     },
//   },
//   scales: {
//     x: {
//       type: "category", // Explicitly define the scale type
//       ticks: {
//         color: "#6B7280", // Gray for X-axis labels
//       },
//       grid: {
//         display: false, // Hide X-axis grid lines
//       },
//     },
//     y: {
//       type: "linear", // Explicitly define the scale type
//       ticks: {
//         color: "#6B7280", // Gray for Y-axis labels
//         callback: (value: number) => `$${value}`, // Format Y-axis labels as currency
//       },
//       grid: {
//         color: "#E5E7EB", // Light gray grid lines
//         borderDash: [4, 4], // Dashed grid lines
//       },
//     },
//   },
// };

// export function RevenueChart() {
//   return (
//     <Card className="col-span-4">
//       <CardHeader>
//         <CardTitle>Revenue Over Time</CardTitle>
//       </CardHeader>
//       <CardContent className="h-[300px]">
//         <Line data={chartData} options={chartOptions} />
//       </CardContent>
//     </Card>
//   );
// }
