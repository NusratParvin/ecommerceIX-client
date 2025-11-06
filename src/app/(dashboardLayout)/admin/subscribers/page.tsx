// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Spinner } from "@/components/ui/spinner";
// import {
//   useDeleteSubscriberMutation,
//   useGetSubscribersQuery,
// } from "@/redux/features/subscribers/subscribersApi";

// const AdminNewsletter = () => {
//   const { data, isLoading, isError, refetch, error } =
//     useGetSubscribersQuery(undefined);
//   console.log(error);
//   const [deleteSubscriber, { isLoading: isDeleting }] =
//     useDeleteSubscriberMutation();
//   const subscribers = data?.data;
//   console.log(subscribers);
//   // Handle unsubscribe
//   const handleUnsubscribe = async (id: string) => {
//     try {
//       await deleteSubscriber(id).unwrap();
//       refetch(); // Refetch the subscribers after successful deletion
//     } catch (error) {
//       console.error("Failed to unsubscribe:", error);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <Spinner />
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex justify-center items-center h-40">
//         <p className="text-red-500">
//           Failed to load subscribers. Please try again later.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Newsletter Subscribers</h1>
//       <table className="w-full table-auto border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border border-gray-300 px-4 py-2">Email</th>
//             <th className="border border-gray-300 px-4 py-2">Subscribed At</th>
//             <th className="border border-gray-300 px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {subscribers?.map((subscriber: any) => (
//             <tr key={subscriber.id} className="text-center hover:bg-gray-100">
//               <td className="border border-gray-300 px-4 py-2">
//                 {subscriber.email}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {new Date(subscriber.createdAt).toLocaleDateString()}
//               </td>
//               <td className="border border-gray-300 px-4 py-2">
//                 <button
//                   onClick={() => handleUnsubscribe(subscriber.id)}
//                   className={`bg-red-500 text-white px-4 py-2 rounded transition ${
//                     isDeleting
//                       ? "opacity-50 cursor-not-allowed"
//                       : "hover:bg-red-600"
//                   }`}
//                   disabled={isDeleting}
//                 >
//                   {isDeleting ? "Removing..." : "Unsubscribe"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       {!subscribers?.length && (
//         <p className="text-center mt-4 text-gray-500">No subscribers found.</p>
//       )}
//     </div>
//   );
// };

// export default AdminNewsletter;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import {
  useDeleteSubscriberMutation,
  useGetSubscribersQuery,
} from "@/redux/features/subscribers/subscribersApi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Search,
  Mail,
  Calendar,
  Trash2,
  RefreshCw,
  Filter,
  Eye,
  User,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const AdminNewsletter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubscriber, setSelectedSubscriber] = useState<any>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  const { data, isLoading, isError, refetch } =
    useGetSubscribersQuery(undefined);
  const [deleteSubscriber, { isLoading: isDeleting }] =
    useDeleteSubscriberMutation();

  const subscribers = data?.data || [];
  const totalSubscribers = subscribers.length;

  // Filter subscribers based on search
  const filteredSubscribers = subscribers.filter((subscriber: any) =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle unsubscribe
  const handleUnsubscribe = async (id: string, email: string) => {
    try {
      await deleteSubscriber(id).unwrap();
      toast.success(`Successfully unsubscribed ${email}`);
      refetch();
    } catch (error) {
      console.error("Failed to unsubscribe:", error);
      toast.error("Failed to unsubscribe subscriber");
    }
  };

  // // Handle export (placeholder)
  // const handleExport = () => {
  //   toast.success("Export feature coming soon!");
  // };

  // Handle view subscriber
  const handleViewSubscriber = (subscriber: any) => {
    setSelectedSubscriber(subscriber);
    setViewDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50/30 p-4 flex justify-center items-center">
        <div className="text-center">
          <Spinner />
          <p className="text-sm text-gray-600 mt-2">Loading subscribers...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50/30 p-4 flex justify-center items-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-red-600 font-semibold">
                Failed to load subscribers
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Please try again later or check your connection
              </p>
              <Button
                onClick={() => refetch()}
                className="mt-4"
                variant="outline"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 p-2 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-1 text-slate-700">
            <Mail className="w-4 h-4" />
            <h1 className="text-lg font-semibold tracking-tight">
              Newsletter Management
            </h1>
          </div>
          <p className="text-sm text-muted-foreground ps-5">
            Manage and monitor newsletter subscribers
          </p>
        </div>

        {/* <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div> */}
      </div>

      {/* Stats and Search */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Search */}
        <div className="lg:col-span-2">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search subscribers by email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSearchTerm("")}>
                  All Subscribers
                </DropdownMenuItem>
                {/* <DropdownMenuItem
                  onClick={() => {
                    const lastMonth = moment().subtract(1, "month");
                    // This would need actual filtering implementation
                    toast.info("Recent subscribers filter applied");
                  }}
                >
                  Recent (Last 30 days)
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="flex-grow border border-slate-200/60 rounded-none shadow-xl p-4 min-h-screen">
        {/* Table Header with Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Subscribers</h2>
            <p className="text-sm text-gray-600 mt-1">
              Showing {filteredSubscribers.length} of {totalSubscribers}{" "}
              subscribers
            </p>
          </div>
          {totalSubscribers > 0 && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {totalSubscribers} Total
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {
                  subscribers.filter((sub: any) =>
                    moment(sub.createdAt).isSame(moment(), "month")
                  ).length
                }{" "}
                This Month
              </Badge>
            </div>
          )}
        </div>

        {/* Table Content */}
        {filteredSubscribers.length === 0 ? (
          <div className="text-center py-12">
            <Mail className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">
              {searchTerm
                ? "No matching subscribers found"
                : "No subscribers yet"}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {searchTerm
                ? "Try adjusting your search"
                : "Subscribers will appear here once they sign up"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 font-bold">#</TableHead>
                  <TableHead className="min-w-[200px] font-bold">
                    Subscriber
                  </TableHead>
                  <TableHead className="min-w-[150px] font-bold">
                    Subscription Date
                  </TableHead>
                  <TableHead className="min-w-[120px] font-bold">
                    Duration
                  </TableHead>
                  <TableHead className="min-w-[100px] font-bold">
                    Status
                  </TableHead>
                  <TableHead className="text-right min-w-[140px] font-bold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.map((subscriber: any, index: number) => (
                  <TableRow key={subscriber.id} className="hover:bg-gray-50/50">
                    <TableCell className="font-medium text-center">
                      {index + 1}
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {subscriber.email}
                          </div>
                          <div className="text-xs text-gray-500 font-mono truncate">
                            ID: {subscriber.id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {moment(subscriber.createdAt).format("MMM DD, YYYY")}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 text-xs"
                      >
                        {moment(subscriber.createdAt).fromNow(true)}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800 hover:bg-green-200"
                      >
                        Active
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1"
                          onClick={() => handleViewSubscriber(subscriber)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleUnsubscribe(subscriber.id, subscriber.email)
                          }
                          disabled={isDeleting}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 gap-1"
                        >
                          <Trash2 className="h-3 w-3" />
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Subscriber Details Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Subscriber Details
            </DialogTitle>
          </DialogHeader>

          {selectedSubscriber && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {selectedSubscriber.email}
                  </p>
                  <p className="text-sm text-gray-600">Newsletter Subscriber</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-500">Subscriber ID</p>
                  <code className="text-xs bg-gray-50 px-2 py-1 rounded border break-all">
                    {selectedSubscriber.id}
                  </code>
                </div>
                <div>
                  <p className="font-medium text-gray-500">Status</p>
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800"
                  >
                    Active
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-500">Subscribed On</p>
                    <p className="text-sm">
                      {moment(selectedSubscriber.createdAt).format(
                        "MMMM Do YYYY, h:mm A"
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-500">
                      Subscription Duration
                    </p>
                    <p className="text-sm">
                      {moment(selectedSubscriber.createdAt).fromNow(true)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminNewsletter;
