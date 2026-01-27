import type { FC, CSSProperties } from "react";
import { Outlet } from "react-router";
import Sidebar from "@/components/widgets/Sidebar";

interface Props extends React.ComponentProps<"div"> {}

const styles: Record<string, CSSProperties> = {
  container: {
    display: "grid",
    minHeight: "100dvh",
    overflow: "hidden",
    gridTemplateColumns: "90px 1fr",
    gridTemplateRows: "auto 1fr",
    gridTemplateAreas: `
      "sidebar header"
      "sidebar content"
    `,
  },
  sidebar: {
    gridArea: "sidebar",
    overflowY: "auto",
    zIndex: 10,
  },
  header: {
    gridArea: "header",
    padding: "1rem",
    borderBottom: "1px solid #e5e7eb",
  },
  content: {
    gridArea: "content",
    padding: "1rem",
    overflowY: "auto",
  },
};

const DashboardLayout: FC<Props> = ({ ...rest }) => {
  return (
    <div {...rest} style={styles.container}>
      <Sidebar style={styles.sidebar} />

      <header style={styles.header} />

      <main style={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
