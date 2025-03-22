
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { StatusCount } from "@/lib/types";

interface StatusChartProps {
  data: StatusCount[];
  title: string;
}

const COLORS = {
  "Connected": "#10b981",
  "Pending": "#f59e0b",
  "Rejected": "#ef4444", 
  "Not Required": "#6b7280",
  "Completed": "#10b981",
  "In Progress": "#3b82f6",
  "Planned": "#8b5cf6",
  "Cancelled": "#ef4444"
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
        <p className="text-sm font-medium">{`${payload[0].name}: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const StatusChart = ({ data, title }: StatusChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-100 h-full">
      <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              dataKey="count"
              nameKey="status"
              animationDuration={800}
              animationBegin={200}
              animationEasing="ease-out"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[entry.status as keyof typeof COLORS] || "#9ca3af"} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {data.map((item) => (
          <div key={item.status} className="flex items-center text-sm">
            <span
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: COLORS[item.status as keyof typeof COLORS] || "#9ca3af" }}
            />
            <span className="text-gray-600">{item.status}</span>
            <span className="ml-auto font-medium">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusChart;
