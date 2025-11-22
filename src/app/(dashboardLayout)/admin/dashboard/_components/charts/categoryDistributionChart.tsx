const CategoryDistributionChart = ({ products, height = 300 }) => {
  // Platform-wide category distribution
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <div className="flex items-center justify-center h-full bg-gray-50 rounded border">
        <p className="text-muted-foreground">Category Distribution Chart</p>
      </div>
    </div>
  );
};

export default CategoryDistributionChart;
