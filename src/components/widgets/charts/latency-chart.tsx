import type { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

interface LatencyData {
  day: string;
  ms: number;
}

const LatencySkeleton = () => (
  <div className="flex flex-col gap-2 bg-white rounded-xl border border-gray-100 p-4 w-full max-w-full animate-pulse h-[198px]">
    <div className="flex justify-between items-center mb-1">
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-2 w-20 bg-gray-100 rounded"></div>
      </div>
      <div className="text-right space-y-2">
        <div className="h-2 w-12 bg-gray-100 rounded ml-auto"></div>
        <div className="h-4 w-10 bg-amber-100 rounded ml-auto"></div>
      </div>
    </div>
    <div className="w-full h-[140px] flex items-end gap-3 px-2 pb-2 mt-2">
      {[...Array(7)].map((_, i) => (
        <div
          key={i}
          className="flex-1 bg-gray-100 rounded-t-sm"
          style={{ height: `${20 + i * 12}%` }}
        ></div>
      ))}
    </div>
  </div>
);

const CustomBarShape = (props: any) => {
  const { x, y, width, height, payload } = props;
  if (!payload) return null;
  const dynamicFill = payload.ms > 500 ? "#d97706" : "#fbbf24";

  return (
    <Rectangle
      {...props}
      fill={dynamicFill}
      radius={[4, 4, 0, 0]}
      className="transition-colors duration-500"
    />
  );
};

const LatencyChart: FC = () => {
  const { data, isLoading, isError } = useQuery<LatencyData[]>({
    queryKey: ["workflow-latency"],
    queryFn: async () => {
      const response = await axios.get("/api/executions/latency");
      return response.data;
    },
    refetchInterval: 60000,
  });

  if (isLoading) return <LatencySkeleton />;

  // Manejo de Error
  if (isError) {
    return (
      <div className="w-full max-w-full h-[198px] bg-amber-50 rounded-xl border border-amber-100 flex flex-col items-center justify-center p-4">
        <span className="text-[11px] text-amber-700 font-bold uppercase tracking-tight">
          Latency Monitor Offline
        </span>
        <span className="text-[10px] text-amber-600/80 mt-1 text-center">
          Response times could not be obtained
        </span>
      </div>
    );
  }

  const avgLatency = data
    ? Math.round(data.reduce((acc, curr) => acc + curr.ms, 0) / data.length)
    : 0;

  return (
    <div className="flex flex-col gap-2 bg-white rounded-xl shadow-sm border border-gray-100 p-4 w-full max-w-full">
      <div className="flex justify-between items-center mb-1">
        <div>
          <h1 className="text-sm font-bold text-gray-900 flex items-center gap-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-amber-500"></span>
            Average Latency
          </h1>
          <p className="text-[10px] text-gray-400 font-medium tracking-tight">
            Performance monitor
          </p>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-gray-400 uppercase font-bold tracking-tighter leading-none">
            AVG SPEED
          </p>
          <span className="text-sm font-mono font-bold text-amber-600">
            {avgLatency}ms
          </span>
        </div>
      </div>

      <div className="w-full h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 0, left: -35, bottom: 0 }}
          >
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
            <YAxis hide domain={[0, "dataMax + 100"]} />

            <Tooltip
              cursor={{ fill: "#fff7ed", opacity: 0.6 }}
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  return (
                    <div className="bg-white p-2 rounded-lg shadow-xl border border-amber-50 text-[10px] ring-1 ring-black/5">
                      <p className="font-bold text-gray-900 mb-0.5">
                        {payload[0].payload.day}
                      </p>
                      <p className="text-amber-600 font-mono font-bold">
                        {payload[0].value} ms
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Bar
              dataKey="ms"
              barSize={18}
              shape={<CustomBarShape />}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LatencyChart;
