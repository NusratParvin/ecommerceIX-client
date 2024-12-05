import { ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CustomerNavbar() {
  console.log("inside");
  return (
    <nav className="border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <div className="flex items-center gap-12">
          <a href="/" className="text-xl font-bold">
            FashionStore
          </a>
          <div className="hidden space-x-8 md:flex">
            <a href="/women" className="text-sm hover:text-gray-600">
              Women
            </a>
            <a href="/men" className="text-sm hover:text-gray-600">
              Men
            </a>
            <a href="/accessories" className="text-sm hover:text-gray-600">
              Accessories
            </a>
            <a href="/sale" className="text-sm text-red-500 hover:text-red-600">
              Sale
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
