import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Area,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

interface ExecutionData {
  day: string;
  success: number;
  failed: number;
}

// Sub-componente para el Skeleton
const ChartSkeleton = () => (
  <div className="flex flex-col gap-2 bg-white rounded-xl border border-gray-100 p-4 w-full max-w-full animate-pulse h-[198px]">
    <div className="flex justify-between items-center mb-1">
      <div className="space-y-2">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
        <div className="h-2 w-16 bg-gray-100 rounded"></div>
      </div>
      <div className="text-right space-y-2">
        <div className="h-2 w-12 bg-gray-100 rounded ml-auto"></div>
        <div className="h-4 w-8 bg-emerald-100 rounded ml-auto"></div>
      </div>
    </div>
    <div className="w-full h-[140px] bg-gray-50/50 rounded-lg mt-2 flex items-end justify-between px-4 pb-2">
      {/* Imitación de barras/gráfico en el skeleton */}
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="w-8 bg-gray-100 rounded-t"
          style={{ height: `${Math.random() * 60 + 20}%` }}
        ></div>
      ))}
    </div>
  </div>
);

const ExecutionChart: FC = () => {
  const { data, isLoading, isError } = useQuery<ExecutionData[]>({
    queryKey: ["workflow-executions"],
    queryFn: async () => {
      const response = await axios.get("/api/executions/last-7-days");
      return response.data;
    },
    refetchInterval: 60000,
  });

  if (isLoading) return <ChartSkeleton />;

  if (isError) {
    return (
      <div className="w-full max-w-full h-[198px] bg-red-50 rounded-xl border border-red-100 flex flex-col items-center justify-center p-4">
        <span className="text-[11px] text-red-500 font-bold uppercase tracking-tight">
          Connection Error
        </span>
        <span className="text-[10px] text-red-400">
          Connection error with the server
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full max-w-full">
      <div className="flex justify-between items-center mb-1">
        <div>
          <h1 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Executions
          </h1>
          <p className="text-[10px] text-gray-400 font-medium">Last 7 days</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter">
            Total Success
          </p>
          <span className="text-sm font-mono font-bold text-emerald-600">
            {data
              ?.reduce((acc, curr) => acc + curr.success, 0)
              .toLocaleString()}
          </span>
        </div>
      </div>

      <div className="w-full h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 10, right: 0, left: -35, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.12} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#f9fafb"
            />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#9ca3af", fontSize: 10, fontWeight: 500 }}
            />

            <YAxis hide domain={["auto", "auto"]} />

            <Area
              type="stepAfter"
              dataKey="success"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#fillSuccess)"
              activeDot={{
                r: 4,
                fill: "#10b981",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              animationDuration={800}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ExecutionChart;
