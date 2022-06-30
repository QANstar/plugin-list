import React, { useEffect } from "react";
import * as Type from "../../type/type";
import NavItem from "./NavItem";
interface Props {
  background?: string;
  children?: React.ReactChild;
  type?: Type.NavType;
  data?: Array<Type.INavItem>;
  front?: React.ReactNode;
  behind?: React.ReactNode;
}
Nav.defaultProps = {
  background: "#fff",
  type: "horizontal",
};
function Nav(props: Props) {
  const navClass = `nav-content-${props.type}`;
  return (
    <div style={{ background: props.background }} className={navClass}>
      {props.front}
      {props.data?.map((item) => (
        <NavItem key={item.name} data={item} />
      ))}
      <div className="nav-behind">{props.behind}</div>
    </div>
  );
}

export default Nav;
