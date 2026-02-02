import type { FC, CSSProperties } from "react";
import { Outlet } from "react-router";
import Sidebar from "@/components/widgets/Sidebar";
import Header from "@/components/widgets/Header";

type Props = React.ComponentProps<"div">;

const styles = {
  container: {
    display: "grid",
    minHeight: "100dvh",
    overflow: "hidden",
    gridTemplateColumns: "auto 1fr",
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
  },
  content: {
    gridArea: "content",
    overflowY: "auto",
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
