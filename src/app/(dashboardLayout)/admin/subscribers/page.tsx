/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Spinner } from "@/components/ui/spinner";
import {
  useDeleteSubscriberMutation,
  useGetSubscribersQuery,
} from "@/redux/features/subscribers/subscribersApi";

const AdminNewsletter = () => {
  const { data, isLoading, isError, refetch, error } =
    useGetSubscribersQuery(undefined);
  console.log(error);
  const [deleteSubscriber, { isLoading: isDeleting }] =
    useDeleteSubscriberMutation();
  const subscribers = data?.data;

  // Handle unsubscribe
  const handleUnsubscribe = async (id: string) => {
    try {
      await deleteSubscriber(id).unwrap();
      refetch(); // Refetch the subscribers after successful deletion
    } catch (error) {
      console.error("Failed to unsubscribe:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-red-500">
          Failed to load subscribers. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Newsletter Subscribers</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Subscribed At</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subscribers?.map((subscriber: any) => (
            <tr key={subscriber.id} className="text-center hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {subscriber.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(subscriber.createdAt).toLocaleDateString()}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  onClick={() => handleUnsubscribe(subscriber.id)}
                  className={`bg-red-500 text-white px-4 py-2 rounded transition ${
                    isDeleting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-red-600"
                  }`}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Removing..." : "Unsubscribe"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!subscribers?.length && (
        <p className="text-center mt-4 text-gray-500">No subscribers found.</p>
      )}
    </div>
  );
};

export default AdminNewsletter;
