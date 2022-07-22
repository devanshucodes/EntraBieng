import React from "react";
import "./Navbar.css";

import { Link } from "react-router-dom";

export function Navbar(props) {
  return (
    <>
      <div className="navbar flex">
        <Link to="/" className="logo flex">
          <h2>entra_</h2>
          <h1>BEING</h1>
        </Link>
        {props.sidebtns == "none" && (
          <div>
            <Link
              to="/user"
              onClick={() => {
                localStorage.removeItem("user");
              }}
              className="btn"
            >
              LogOut
            </Link>

            <Link
              to="/metaverse"
              className="btn"
              style={{ backgroundColor: "#32CD32" }}
            >
              Enter Meta Verse
            </Link>
          </div>
        )}
        <div style={{ display: props.sidebtns }}>
          <Link to="/user" className="btn">
            User Login/Register
          </Link>
          <Link to="/shop" className="btn">
            Shop Login/Register
          </Link>
        </div>
      </div>
    </>
  );
}
