import { type FC } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { MoveLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 95%, #fff 40%, var(--primary) 110%)",
        }}
      />
      <section className="relative z-10 w-full px-6 py-12 mx-auto">
        <div className="container flex items-center min-h-full px-6 py-12 mx-auto">
          <div className="flex flex-col items-center max-w-sm mx-auto text-center nunito-sans-regular gap-y-4">
            <p className="p-3 text-7xl font-medium text-primary">404</p>

            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
              Page Not Found
            </h1>

            <p className="text-gray-500 dark:text-gray-400">
              Sorry, the page you are looking for doesn't exist. Here are some
              useful links:
            </p>

            <div className="flex items-center w-full gap-x-3 shrink-0 sm:w-auto">
              <Button
                variant="default"
                onClick={() => navigate(-1)}
                className={cn(
                  "flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700 font-medium border-slate-200 h-12 cursor-pointer",
                )}
              >
                <MoveLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>

              <Button
                asChild
                className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-primary rounded-lg shrink-0 sm:w-auto hover:bg-primary/90 font-medium h-12"
              >
                <Link
                  to="/"
                  className="flex items-center gap-x-2"
                  viewTransition
                  aria-label="Home"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
