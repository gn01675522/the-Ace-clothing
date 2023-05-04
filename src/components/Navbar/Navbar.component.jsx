import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.styles.scss";

import { ReactComponent as AceLogo } from "../../assets/ace.svg";
import CartIcon from "../CartIcon/CartIcon.component";

const navOption = [
  { title: "Men", link: "/products" },
  { title: "Women", link: "test1" },
  { title: "Shoes", link: "test2" },
  { title: "Hats", link: "test3" },
  { title: "Acessories", link: "test4" },
];

const NavBar = () => {
  const [isListOpen, setIsListOpen] = useState(false);

  const onListOpen = () => {
    setIsListOpen(!isListOpen);
  };

  return (
    <>
      <nav className="navbar">
        <input
          className="navbar__trigger"
          type="checkbox"
          id="trigger"
          checked={isListOpen ? true : false}
          onChange={onListOpen}
        />
        <label className="navbar__burger" htmlFor="trigger">
          <div className="navbar__burger-line" />
        </label>
        <div
          className={`navbar__list navbar__list-${
            isListOpen ? "open" : "close"
          }`}
        >
          {navOption.map((option) => (
            <NavLink
              key={option.title}
              to={option.link}
              className="navbar__list-link"
              aria-label={option.title}
              onClick={onListOpen}
            >
              {option.title}
            </NavLink>
          ))}
        </div>
        <NavLink to="/" aria-label="home page">
          <AceLogo className="navbar__logo" />
        </NavLink>
        <div className="navbar__function">
          <CartIcon />
        </div>
      </nav>
      <div className="block" />
    </>
  );
};

export default NavBar;
