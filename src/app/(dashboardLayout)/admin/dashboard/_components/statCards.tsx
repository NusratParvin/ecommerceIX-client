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
    <Card className="relative overflow-hidden bg-white border border-dashed border-slate-300 border-l-0 rounded-none shadow-none min-h-[100px] h-auto">
      {/* left accent line */}
      <span className="absolute left-0 top-0 bottom-0 w-[4px] bg-deep-brown/80 rounded-none" />

      <div className="flex h-full items-center gap-2 ps-4 pe-2">
        {/* Icon */}
        <div className="shrink-0 border p-3 bg-deep-brown/20 rounded-full shadow-md  ">
          <Icon className="h-6 w-6 text-deep-brown" strokeWidth={1.6} />
          {/* <Icon className="h-14 w-14 text-deep-brown/80" strokeWidth={1.6} /> */}
          {/* {icon} */}
        </div>

        {/* Text content */}
        <div className="leading-tighter w-full text-center">
          <div className="text-xl font-semibold font-sans  text-center ">
            {value}
          </div>
          <div className="text-sm font-semibold text-slate-700 mt-0  text-center ">
            {title}
          </div>

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
