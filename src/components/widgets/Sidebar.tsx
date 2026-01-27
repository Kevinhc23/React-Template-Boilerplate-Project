import type { FC } from "react";

interface SidebarProps extends React.ComponentProps<"aside"> {}

const Sidebar: FC<SidebarProps> = ({ style, ...rest }) => {
  return <aside {...rest} style={style} />;
};

export default Sidebar;
