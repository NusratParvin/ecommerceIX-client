import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { Download, Edit, Eye, EyeOff, FileText, Trash2 } from "lucide-react";

export const SettingsTab = ({ product }: { product: Product }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Settings</CardTitle>
        <CardDescription>
          Manage product visibility, pricing, and other settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Product Status</h3>
            <div className="flex items-center gap-4">
              <Badge
                variant={
                  product.status === "ACTIVE" ? "default" : "destructive"
                }
              >
                {product.status}
              </Badge>
              <Button variant="outline" size="sm">
                {product.status === "ACTIVE" ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {product.status === "ACTIVE" ? "Hide Product" : "Show Product"}
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Danger Zone</h3>
            <Button variant="destructive" className="gap-2">
              <Trash2 className="w-4 h-4" />
              Archive Product
            </Button>
          </div>
        </div>
        <div className="border-t pt-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2">
              <Edit className="w-4 h-4" />
              Edit Details
            </Button>
            <Button variant="outline" className="gap-2">
              <FileText className="w-4 h-4" />
              Generate Report
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
