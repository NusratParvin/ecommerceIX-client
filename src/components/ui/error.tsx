import { AlertCircle } from "lucide-react";

const ErrorComponent = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 text-center">
      <AlertCircle className="w-10 h-10 text-red-600" />
      <p className="text-lg font-medium text-red-600">{message}</p>
    </div>
  );
};

export default ErrorComponent;
