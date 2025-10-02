"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors } from "lucide-react";

interface CouponCodeProps {
  code: string;
  discount: number;
  expirationDate: string;
}

export function CouponCode({
  code,
  discount,
  expirationDate,
}: CouponCodeProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card className="w-fit cursor-pointer transition-all duration-300 shadow-none hover:shadow-lg rounded-none border border-dashed border-slate-400/70 ">
            <CardContent className="flex items-center space-x-2 p-2">
              <Scissors className="h-4 w-4 text-red-600" />
              <span className="font-sans text-base font-semibold text-red-600">
                {code}
              </span>
              <Badge
                variant="secondary"
                className="ml-1 cursor-pointer text-charcoal text-base font-medium"
                onClick={copyToClipboard}
              >
                {isCopied ? "Copied!" : "Copy"}
              </Badge>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent className="w-64 p-0">
          <Card>
            <CardContent className="grid gap-2 p-3 text-base text-muted-foreground ">
              <h3 className="font-semibold text-slate-700">Coupon Details</h3>
              <p>Discount: {discount}</p>
              <p>Expires: {expirationDate}</p>
            </CardContent>
          </Card>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
