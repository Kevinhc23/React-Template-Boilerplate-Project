import type { FC } from "react";

type HomePageProps = {};

const HomePage: FC<HomePageProps> = () => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl text-primary font-medium">
        Welcome back to your dashboard
      </h1>
      <p className="text-lg text-muted-foreground">
        Here you can manage your account and access your data.
      </p>
    </div>
  );
};

export default HomePage;
