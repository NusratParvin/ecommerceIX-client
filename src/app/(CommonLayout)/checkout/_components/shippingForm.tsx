import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

interface ShippingFormProps {
  onSubmit: (data: ShippingInfo) => void;
}

export default function ShippingForm({ onSubmit }: ShippingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingInfo>();

  const onFormSubmit = (data: ShippingInfo) => {
    console.log("Submitted Data:", data);
    onSubmit(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50, y: 50 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" border border-dashed border-slate-300 bg-slate-50 
      p-6 tracking-tight "
    >
      <h1 className="text-2xl text-slate-700 font-medium pb-3 border-b border-dashed ">
        Shipping Address
      </h1>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 py-8">
        <div className="space-y-0">
          <label
            htmlFor="name"
            className="block text-lg font-medium text-slate-700 mb-1"
          >
            Full Name
          </label>
          <Input
            id="name"
            className="rounded-none bg-white shadow-none"
            {...register("name", { required: "Name is required" })}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-0">
          <label
            htmlFor="address"
            className="block text-lg font-medium text-slate-700 mb-1"
          >
            Address
          </label>
          <Input
            id="address"
            className="rounded-none bg-white shadow-none"
            {...register("address", { required: "Address is required" })}
            placeholder="Enter your address"
          />
          {errors.address && (
            <p className="text-red-500 text-sm">{errors.address.message}</p>
          )}
        </div>

        <div className="flex md:flex-row flex-col gap-3 md:justify-between justify-start md:items-center items-start">
          <div className="space-y-0 md:flex-1 w-full">
            <label
              htmlFor="city"
              className="block text-lg font-medium text-slate-700 mb-1"
            >
              City
            </label>
            <Input
              id="city"
              className="rounded-none bg-white shadow-none w-full"
              {...register("city", { required: "City is required" })}
              placeholder="Enter your city"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-0 md:flex-1 w-full">
            <label
              htmlFor="postalCode"
              className="block text-lg font-medium text-slate-700 mb-1"
            >
              Postal Code
            </label>
            <Input
              id="postalCode"
              className="rounded-none bg-white shadow-none w-full"
              {...register("postalCode", {
                required: "Postal Code is required",
                pattern: {
                  value: /^[0-9]{5}$/,
                  message: "Postal Code must be a 5-digit number",
                },
              })}
              placeholder="Enter your postal code"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-0">
          <label
            htmlFor="country"
            className="block text-lg font-medium text-slate-700 mb-1"
          >
            Country
          </label>
          <Input
            id="country"
            className="rounded-none bg-white shadow-none"
            {...register("country", { required: "Country is required" })}
            placeholder="Enter your country"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>

        <div className="flex justify-end pt-8">
          <Button
            type="submit"
            className="bg-slate-500 hover:bg-slate-700 rounded-none text-xl px-6 py-4"
          >
            Proceed to Payment
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
