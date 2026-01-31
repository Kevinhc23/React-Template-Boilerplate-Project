import type { FC } from "react";
import { Shell } from "lucide-react";
import { Link } from "react-router";

interface SidebarProps extends React.ComponentProps<"aside"> {}

const Sidebar: FC<SidebarProps> = ({ style, ...rest }) => {
  return (
    <aside {...rest} style={style} className="border-r border-gray-200">
      <div
        className="flex flex-col gap-4 justify-between h-full p-4"
        aria-label="Sidebar"
      >
        <section aria-label="Top navigation">
          <div className="flex items-center gap-2">
            <Link to="/dashboard">
              <Shell className="w-8 h-8 text-primary" />
            </Link>
          </div>
        </section>
        <section aria-label="User"></section>
        <section
          aria-label="Bottom navigation"
          className="flex justify-center"
        ></section>
      </div>
    </aside>
  );
};

export default Sidebar;
