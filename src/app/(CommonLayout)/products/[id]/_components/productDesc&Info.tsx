import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@/types";

interface ProductDescInfoProps {
  product: Product;
}
const ProductDescInfo = ({ product }: ProductDescInfoProps) => {
  return (
    <Accordion type="single" collapsible className="rounded-none">
      <AccordionItem
        value="desc"
        className="mb-2  border-b-transparent text-slate-500 "
      >
        <AccordionTrigger className=" font-semibold bg-slate-100 px-4 py-2 hover:no-underline border-none shadow-sm text-base text-slate-600 ">
          Product Description
        </AccordionTrigger>
        <AccordionContent className=" border-none max-w-none pb-4 p-2 pl-4 text-base text-slate-500 ">
          {product?.description || "No description added!"}
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="info" className="mb-2  border-b-transparent ">
        <AccordionTrigger className="font-semibold bg-slate-100 px-4 py-2 hover:no-underline text-base text-slate-600 ">
          Product Information
        </AccordionTrigger>
        <AccordionContent className="pb-4 p-2 pl-4 text-base text-slate-500 ">
          {/* Product Info */}
          <div className="space-y-4">
            <div>
              {/* <h4 className="text-base font-semibold">
                                  Additional Info
                                </h4> */}
              <ul className="grid grid-cols-1 gap-2  sm:grid-cols-2 list-disc pl-5 ">
                {/* <li>
                        <span className="font-medium text-foreground">Unit:</span> {info.unit}
                      </li> */}
                {/* <li>
                        <span className="font-medium text-foreground">Weight:</span> {info.weight}
                      </li> */}
                <li>
                  <span className="font-semibold ">Stock Status :</span>{" "}
                  {product?.stock > 0 ? "In stock" : "Out of stock"}
                </li>
                <li className="sm:col-span-2">
                  <span className="font-semibold">Quantity :</span>{" "}
                  {product?.stock} Items Left
                </li>
              </ul>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
export default ProductDescInfo;
