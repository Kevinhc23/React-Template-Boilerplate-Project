import ExecutionChart from "@/components/widgets/charts/execution-chart";
import LatencyChart from "@/components/widgets/charts/latency-chart";
import MemoryUsageChart from "@/components/widgets/charts/memory-usage-chart";
import type { FC } from "react";

type HomePageProps = {};

const HomePage: FC<HomePageProps> = () => {
  return (
    <div className="flex flex-col gap-6 w-full h-full overflow-y-auto">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl text-primary font-medium">
          Welcome back to your dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Here you can manage your account and access your data.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ExecutionChart />
        <LatencyChart />
        <MemoryUsageChart />
      </div>
    </div>
  );
};

export default HomePage;
