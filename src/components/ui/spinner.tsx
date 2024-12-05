// components/ui/Spinner.tsx
import { Loader2 } from "lucide-react";

export const Spinner = () => (
  <div className="flex justify-center items-center py-6">
    <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
  </div>
);
