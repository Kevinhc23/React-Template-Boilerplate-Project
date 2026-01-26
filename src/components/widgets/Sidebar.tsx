import type { FC, CSSProperties } from "react";

interface SidebarProps extends React.ComponentProps<"aside"> {
  width?: number;
}

const Sidebar: FC<SidebarProps> = ({ width, style, ...rest }) => {
  const sidebarStyle: CSSProperties = {
    width: width ? `${width}px` : undefined,
    ...style,
  };

  return <aside {...rest} style={sidebarStyle}></aside>;
};

export default Sidebar;
