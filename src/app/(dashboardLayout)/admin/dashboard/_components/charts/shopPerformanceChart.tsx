const ShopPerformanceChart = ({ products, orders, height = 300 }) => {
  // Compare performance across different shops
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <div className="flex items-center justify-center h-full bg-gray-50 rounded border">
        <p className="text-muted-foreground">Shop Performance Comparison</p>
      </div>
    </div>
  );
};

export default ShopPerformanceChart;
