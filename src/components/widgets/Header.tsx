import { memo, type FC } from "react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProfileButton } from "@/components/widgets/ProfileButton";

interface HeaderProps extends React.ComponentProps<"header"> {}

const Header: FC<HeaderProps> = ({ className, ...rest }) => {
  const { pathname } = useLocation();
  const pathSegments = pathname.split("/").filter(Boolean);

  const formatLabel = (label: string) =>
    label.charAt(0).toUpperCase() + label.slice(1).replace(/-/g, " ");

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full bg-white border-b border-slate-100 px-8 h-16 flex items-center",
        className,
      )}
      {...rest}
    >
      <div className="flex justify-between items-center w-full max-w-[1400px] mx-auto">
        <Breadcrumb>
          <BreadcrumbList className="text-base font-medium tracking-tight">
            {/* Siempre empezamos con Home */}
            <BreadcrumbItem>
              {pathSegments.length === 0 ? (
                <BreadcrumbPage className="text-shadow-zinc-500 font-medium text-base">
                  Home
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link
                    to="/"
                    className="text-slate-500 hover:text-zinc-500 transition-colors text-base"
                    viewTransition
                    aria-label="Home"
                  >
                    Home
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>

            {pathSegments.map((segment, index) => {
              const isLast = index === pathSegments.length - 1;
              const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

              return (
                <div key={href} className="flex items-center gap-2">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="text-zinc-500 font-medium text-base">
                        {formatLabel(segment)}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link
                          to={href}
                          className="text-slate-500 hover:text-zinc-500 transition-colors text-base"
                          viewTransition
                          aria-label={formatLabel(segment)}
                        >
                          {formatLabel(segment)}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <ProfileButton />
      </div>
    </header>
  );
};

export default memo(Header);
