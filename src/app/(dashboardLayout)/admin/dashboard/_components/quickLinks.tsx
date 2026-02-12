import { Coins, Store, Ticket, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const QuickLinks = () => {
  const quickLinkInfo = [
    {
      title: "Manage Shops",
      icon: Store,
      color: "blue",
      href: "/admin/shops",
    },
    {
      title: "User Management",
      icon: Users,
      color: "green",
      href: "/admin/users",
    },
    {
      title: "Transactions",
      icon: Coins,
      color: "purple",
      href: "/admin/transactions",
    },
    {
      title: "Coupons",
      icon: Ticket,
      color: "orange",
      href: "/admin/coupons",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {quickLinkInfo.map((item) => (
        <Link key={item.title} href={item.href} className="block">
          <div
            className={`
        bg-${item.color}-50 border border-${item.color}-200 
        rounded-lg p-4 text-center hover:bg-${item.color}-100 
        cursor-pointer transition-colors
      `}
          >
            <item.icon
              className={`h-8 w-8 text-${item.color}-600 mx-auto mb-2`}
            />
            <div className={`text-sm font-medium text-${item.color}-800`}>
              {item.title}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuickLinks;
