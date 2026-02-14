import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface MemoryData {
  day: string;
  usage: number; // en MB
}

// Skeleton consistente con los anteriores
const MemorySkeleton = () => (
  <div className="flex flex-col gap-2 bg-white rounded-xl border border-gray-100 p-4 w-full max-w-full animate-pulse h-[198px]">
    <div className="flex justify-between items-center mb-1">
      <div className="space-y-2">
        <div className="h-4 w-28 bg-gray-200 rounded"></div>
        <div className="h-2 w-16 bg-gray-100 rounded"></div>
      </div>
      <div className="text-right space-y-2">
        <div className="h-2 w-10 bg-gray-100 rounded ml-auto"></div>
        <div className="h-4 w-12 bg-blue-100 rounded ml-auto"></div>
      </div>
    </div>
    <div className="w-full h-[140px] bg-gray-50/50 rounded-lg mt-2 overflow-hidden relative">
      <div className="absolute inset-0 flex items-end">
        <div className="w-full h-1/2 bg-gray-100/50 clip-path-wave"></div>
      </div>
    </div>
  </div>
);

const MemoryUsageChart: FC = () => {
  const { data, isLoading, isError } = useQuery<MemoryData[]>({
    queryKey: ["workflow-memory"],
    queryFn: async () => {
      const response = await axios.get("/api/executions/memory-usage");
      return response.data;
    },
    refetchInterval: 60000,
  });

  if (isLoading) return <MemorySkeleton />;

  if (isError) {
    return (
      <div className="w-full max-w-full h-[198px] bg-blue-50 rounded-xl border border-blue-100 flex flex-col items-center justify-center p-4 text-center">
        <span className="text-[11px] text-blue-500 font-bold uppercase tracking-tight">
          Resource Monitor Offline
        </span>
        <span className="text-[10px] text-blue-400">
          Resource monitor is offline
        </span>
      </div>
    );
  }

  const maxUsage = data ? Math.max(...data.map((d) => d.usage)) : 0;

  return (
    <div className="flex flex-col gap-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full max-w-full">
      <div className="flex justify-between items-center mb-1">
        <div>
          <h1 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
            Memory Usage
          </h1>
          <p className="text-[10px] text-gray-400 font-medium">
            System Resources
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter leading-none">
            Peak Usage
          </p>
          <span className="text-sm font-mono font-bold text-blue-600">
            {maxUsage}MB
          </span>
        </div>
      </div>

      <div className="w-full h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 0, left: -35, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillMemory" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
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
            <YAxis hide domain={["dataMin - 50", "dataMax + 50"]} />

            <Tooltip
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  return (
                    <div className="bg-white p-2 rounded-lg shadow-xl border border-blue-50 text-[10px] ring-1 ring-black/5 font-sans">
                      <p className="font-bold text-gray-900 mb-0.5">
                        {payload[0].payload.day}
                      </p>
                      <p className="text-blue-600 font-mono font-bold">
                        {payload[0].value} MB
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Area
              type="monotone"
              dataKey="usage"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#fillMemory)"
              activeDot={{
                r: 4,
                fill: "#3b82f6",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MemoryUsageChart;
