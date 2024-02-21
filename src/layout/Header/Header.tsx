import React from "react";
import Logo from "../../assets/Logo.svg?react";
import Arrow from "../../assets/arrow.svg?react";

const navItems = [
  { title: "Home", path: "/" },

  { title: "About us", path: "/" },

  { title: "News", path: "/" },

  { title: "Contact us", path: "/" },
];

const Header = () => {
  return (
    <div className="header bg-transparent">
      <div className="header__content">
        <div className="header__content__logo bg-transparent">
          <div className="header__content__logo-container">
            {/* bad visual aligned because its nor svg and logos cant be exported as an image  */}
            <Logo width="100%" height="100%" />
          </div>
        </div>
        <div className="header__content__list bg-transparent">
          {navItems.map((v) => {
            return (
              <button
                className="button bg-transparent header__content__list__item"
                key={v.path}
                onClick={() => {
                  // todo navigate to the path
                }}
              >
                {v.title}
              </button>
            );
          })}
        </div>
        <div className="header__content__action bg-transparent">
          <div className="header__content__action__item">
            <button className="button bg-transparent typo typo--poppins-base">Login</button>
          </div>
          <div className="header__content__action__item">
            <button
              style={{ borderStyle: "solid", borderWidth: "0.2rem" }}
              className="button border-bg-darkest-green border-sm  p-xs bg-transparent typo typo--poppins-base"
            >
              Sign up
            </button>
          </div>

          <div className="header__content__action__item">
            <button
              className="button bg-transparent"
              style={{ display: "flex", justifyItems: "center", alignItems: "center" }}
            >
              <div className="typo typo--poppins-base">EN</div>
              <div className="ml-xs" style={{ width: "1.5rem", height: "1.5rem" }}>
                <Arrow width="100%" height="100%" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
