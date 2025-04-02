import { FC } from "react";
import "./navBar.css";
import { Link } from "react-router-dom";
import ROUTES from "../../routes";

export const NavBar: FC = () => {
  return (
    <nav className="nav-bar">
      <Link to={ROUTES.HOME} id="title">
        Space chat
      </Link>
    </nav>
  );
};
