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
  sidebar: {
    gridArea: "sidebar",
    overflowY: "auto",
    height: "100%",
    width: "200px",
    position: "sticky",
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 100,
  },
  header: {
    gridArea: "header",
    padding: "1rem",
    backgroundColor: "#fff",
    borderBottom: "1px solid #ccc",
  },
  content: {
    gridArea: "content",
    padding: "1rem",
    overflowY: "auto",
    height: "100%",
    width: "100%",
    position: "sticky",
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
} satisfies Record<string, CSSProperties>;

const DashboardLayout: FC<Props> = ({ style, ...rest }) => {
  return (
    <div {...rest} style={{ ...styles.container, ...style }}>
      <Sidebar style={styles.sidebar} />
      <header style={styles.header}></header>
      <main style={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
