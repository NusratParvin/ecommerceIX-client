"use  client";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
// import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  // icon: ReactNode;
  description?: string;
  descriptionClassName?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  // icon,
  description,
  descriptionClassName,
}: StatCardProps) {
  return (
    // <Card className="relative overflow-hidden bg-white border border-dashed border-slate-300 border-l-0 rounded-none shadow-none h-[120px]">
    //   {/* left accent line */}
    //   <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-deep-brown/80 rounded-none" />

    //   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //     <CardTitle className="text-sm font-medium">{title}</CardTitle>
    //     <Icon className="h-4 w-4 text-muted-foreground" />
    //   </CardHeader>
    //   <CardContent>
    //     <div className="text-2xl font-bold">{value}</div>
    //     {description && (
    //       <p className="text-xs text-muted-foreground">{description}</p>
    //     )}
    //   </CardContent>
    // </Card>

    <Card className="relative overflow-hidden bg-white border border-dashed border-slate-300 border-l-0 rounded-none shadow-none h-[100px]">
      {/* left accent line */}
      <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-deep-brown/80 rounded-none" />

      <div className="flex h-full items-center gap-4 ps-4 pe-2">
        {/* Icon */}
        <div className="shrink-0 border p-4 bg-deep-brown/20 rounded-full shadow-md  ">
          <Icon className="h-8 w-8 text-deep-brown" strokeWidth={1.6} />
          {/* <Icon className="h-14 w-14 text-deep-brown/80" strokeWidth={1.6} /> */}
          {/* {icon} */}
        </div>

        {/* Text content */}
        <div className="leading-tight   w-full">
          <div className="text-2xl font-semibold font-sans">{value}</div>
          <div className="text-sm text-slate-700 mt-1">{title}</div>

          {description && (
            <p
              className={`mt-1 text-xs ${
                descriptionClassName ?? "text-muted-foreground"
              }`}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
