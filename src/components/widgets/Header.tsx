import type { FC } from "react";

interface HeaderProps extends React.ComponentProps<"header"> {}

const Header: FC<HeaderProps> = ({ ...rest }) => {
  return <header {...rest}></header>;
};

export default Header;
