import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.styles.scss";

import { ReactComponent as AceLogo } from "../../assets/ace.svg";
import CartIcon from "../CartIcon/CartIcon.component";

const navOption = [
  { title: "Men", link: "/mens" },
  { title: "Women", link: "/womens" },
  { title: "Shoes", link: "/shoes" },
  { title: "Hats", link: "/hats" },
  { title: "Accessories", link: "/accessories" },
];

const NavBar = () => {
  const [isListOpen, setIsListOpen] = useState(false);

  const onOpenList = () => {
    setIsListOpen(!isListOpen);
  };

  return (
    <>
      <nav className="navbar">
        <input
          className="navbar__trigger"
          type="checkbox"
          id="nav-trigger"
          checked={isListOpen ? true : false}
          onChange={onOpenList}
        />
        <label className="navbar__burger" htmlFor="nav-trigger">
          <div className="navbar__burger-line" />
        </label>
        <div className="navbar__list">
          {navOption.map((option) => (
            <NavLink
              key={option.title}
              to={option.link}
              className="navbar__list-link"
              aria-label={option.title}
              onClick={onOpenList}
            >
              {option.title}
            </NavLink>
          ))}
        </div>
        <NavLink to="/" aria-label="home page">
          <AceLogo className="navbar__logo" />
        </NavLink>
        <div className="navbar__actions">
          <CartIcon />
        </div>
      </nav>
      <div className="block" />
    </>
  );
};

export default NavBar;
