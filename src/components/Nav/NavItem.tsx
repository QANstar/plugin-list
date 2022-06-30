import { Link, useLocation } from "react-router-dom";
import * as Type from "../../type/type";
interface Props {
  data: Type.INavItem;
}
function NavItem(props: Props) {
  return (
    <div
      className={
        useLocation().pathname === props.data.path
          ? "nav-item nav-item-active"
          : "nav-item"
      }
    >
      <Link to={props.data.path}>{props.data.name}</Link>
    </div>
  );
}
export default NavItem;
