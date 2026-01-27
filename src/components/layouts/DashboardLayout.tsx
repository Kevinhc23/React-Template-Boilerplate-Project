import type { FC, CSSProperties } from "react";
import { Outlet } from "react-router";
import Sidebar from "@/components/widgets/Sidebar";
import Header from "@/components/widgets/Header";

interface Props extends React.ComponentProps<"div"> {}

const styles = {
  container: {
    display: "grid",
    minHeight: "100dvh",
    overflow: "hidden",
    gridTemplateColumns: "64px 1fr",
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
    backgroundColor: "#f9fafb",
  },
} satisfies Record<string, CSSProperties>;

const DashboardLayout: FC<Props> = ({ ...rest }) => {
  return (
    <div {...rest} style={styles.container}>
      <Sidebar style={styles.sidebar} />

      <Header style={styles.header} />

      <main style={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
