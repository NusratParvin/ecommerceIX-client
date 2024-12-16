import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
    <form
      onSubmit={handleSubmit(onFormSubmit)}
      className="space-y-6 min-h-screen"
    >
      <div className="space-y-0">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <Input
          id="name"
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
          className="block text-sm font-medium text-gray-700"
        >
          Address
        </label>
        <Input
          id="address"
          {...register("address", { required: "Address is required" })}
          placeholder="Enter your address"
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address.message}</p>
        )}
      </div>

      <div className="space-y-0">
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700"
        >
          City
        </label>
        <Input
          id="city"
          {...register("city", { required: "City is required" })}
          placeholder="Enter your city"
        />
        {errors.city && (
          <p className="text-red-500 text-sm">{errors.city.message}</p>
        )}
      </div>

      <div className="space-y-0">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-gray-700"
        >
          Country
        </label>
        <Input
          id="country"
          {...register("country", { required: "Country is required" })}
          placeholder="Enter your country"
        />
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country.message}</p>
        )}
      </div>

      <div className="space-y-0">
        <label
          htmlFor="postalCode"
          className="block text-sm font-medium text-gray-700"
        >
          Postal Code
        </label>
        <Input
          id="postalCode"
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
          <p className="text-red-500 text-sm">{errors.postalCode.message}</p>
        )}
      </div>

      <div className="flex justify-end pt-8">
        <Button type="submit" className="bg-warm-brown hover:bg-deep-brown">
          Proceed to Payment
        </Button>
      </div>
    </form>
  );
}
