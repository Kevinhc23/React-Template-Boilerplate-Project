import { useState, type FC, type CSSProperties } from "react";
import { Outlet } from "react-router";
import Sidebar from "@/components/widgets/Sidebar";
import { DashboardLayoutContext } from "@/app/contexts/DashboardLayout.context";

interface Props extends React.ComponentProps<"div"> {}

const styles = {
  container: (sidebarWidth: number): CSSProperties => ({
    display: "grid",
    minHeight: "100dvh",
    width: "100%",
    overflow: "hidden",
    gridTemplateColumns: `${sidebarWidth}px 1fr`,
    gridTemplateRows: "auto 1fr",
    gridTemplateAreas: `
      "sidebar header"
      "sidebar content"
    `,
    transition: "grid-template-columns 200ms ease",
  }),
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
} satisfies Record<string, CSSProperties | ((n: number) => CSSProperties)>;

const EXPANDED_WIDTH = 240;
const COLLAPSED_WIDTH = 90;

const DashboardLayout: FC<Props> = ({ ...rest }) => {
  const [sidebarWidth, setSidebarWidth] = useState(EXPANDED_WIDTH);

  const isCollapsed = sidebarWidth === COLLAPSED_WIDTH;

  const toggleSidebar = () => {
    setSidebarWidth((w) =>
      w === EXPANDED_WIDTH ? COLLAPSED_WIDTH : EXPANDED_WIDTH,
    );
  };

  return (
    <DashboardLayoutContext.Provider
      value={{
        sidebarWidth,
        isCollapsed,
        toggleSidebar,
        setSidebarWidth,
      }}
    >
      <div {...rest} style={styles.container(sidebarWidth)}>
        <Sidebar width={sidebarWidth} style={styles.sidebar} />

        <header style={styles.header}></header>

        <main style={styles.content}>
          <Outlet />
        </main>
      </div>
    </DashboardLayoutContext.Provider>
  );
};

export default DashboardLayout;
