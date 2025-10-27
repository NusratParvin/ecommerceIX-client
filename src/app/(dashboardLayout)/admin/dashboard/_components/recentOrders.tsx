// "use client";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const recentOrders = [
//   {
//     id: "1",
//     customer: "John Doe",
//     status: "Paid",
//     amount: "$250.00",
//     date: "2024-02-20",
//   },
//   {
//     id: "2",
//     customer: "Jane Smith",
//     status: "Pending",
//     amount: "$150.00",
//     date: "2024-02-19",
//   },
//   {
//     id: "3",
//     customer: "Bob Johnson",
//     status: "Paid",
//     amount: "$350.00",
//     date: "2024-02-18",
//   },
// ];

// export function RecentOrders() {
//   return (
//     <Card className="col-span-4">
//       <CardHeader>
//         <CardTitle>Recent Orders</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Order ID</TableHead>
//               <TableHead>Customer</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Amount</TableHead>
//               <TableHead>Date</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {recentOrders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>#{order.id}</TableCell>
//                 <TableCell>{order.customer}</TableCell>
//                 <TableCell>{order.status}</TableCell>
//                 <TableCell>{order.amount}</TableCell>
//                 <TableCell>{order.date}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// }

"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const recentOrders = [
  {
    id: "1",
    customer: "John Doe",
    status: "Paid",
    amount: "$250.00",
    date: "2024-02-20",
  },
  {
    id: "2",
    customer: "Jane Smith",
    status: "Pending",
    amount: "$150.00",
    date: "2024-02-19",
  },
  {
    id: "3",
    customer: "Bob Johnson",
    status: "Paid",
    amount: "$350.00",
    date: "2024-02-18",
  },
];

export function RecentOrders() {
  return (
    <Card className="col-span-4 border border-dashed border-slate-300 rounded-none shadow-none">
      <CardHeader className="border-b border-dashed border-slate-300">
        <CardTitle className="text-lg">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-dashed border-slate-300">
              <TableHead className="font-semibold">Order ID</TableHead>
              <TableHead className="font-semibold">Customer</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentOrders.map((order) => (
              <TableRow
                key={order.id}
                className="border-b border-dashed border-slate-300"
              >
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>{order.amount}</TableCell>
                <TableCell>{order.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
