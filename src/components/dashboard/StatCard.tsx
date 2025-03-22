
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, description, trend, className }: StatCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-soft p-6 border border-gray-100 transition-all duration-300 hover:shadow-md",
      className
    )}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <div className="mt-2 flex items-baseline">
            <p className="text-2xl font-semibold">{value}</p>
            {trend && (
              <span className={cn(
                "ml-2 text-xs font-medium flex items-center",
                trend.isPositive ? "text-green-600" : "text-red-600"
              )}>
                <span>{trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%</span>
              </span>
            )}
          </div>
          {description && (
            <p className="mt-1 text-xs text-gray-500">{description}</p>
          )}
        </div>
        <div className="bg-primary/10 p-3 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
