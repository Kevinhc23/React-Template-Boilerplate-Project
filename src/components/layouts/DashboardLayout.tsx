import type { FC, CSSProperties } from "react";
import { Outlet } from "react-router";
import Sidebar from "@/components/widgets/Sidebar";

interface Props extends React.ComponentProps<"div"> {}

const styles = {
  container: {
    display: "grid",
    minHeight: "100dvh",
    width: "100dvw",
    overflow: "hidden",
    gridTemplateColumns: "200px 1fr",
    gridTemplateRows: "auto 1fr",
    gridTemplateAreas: `
      "sidebar header"
      "sidebar content"
    `,
  },
} satisfies Record<string, CSSProperties>;

const DashboardLayout: FC<Props> = ({ style, ...rest }) => {
  return (
    <div {...rest} style={{ ...styles.container, ...style }}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
