import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
  const navigate = useNavigate();
  let auth = localStorage.getItem("token");
  auth = JSON.parse(auth);
  let name = localStorage.getItem("user");
  name = JSON.parse(name);
  const onLogoutHandler = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <ul className="list">
        <li>
          <Link to="/">Home</Link>
        </li>
        {auth && (
          <>
            <li>
              <Link to="/products">Products</Link>
            </li>
            <li>
              <Link to="/add-product">Add Product</Link>
            </li>
            
          
          </>
        )}
        {auth && (
          <li>
            <Link onClick={onLogoutHandler} to="/signup">
              Logout ({name.name})
            </Link>
          </li>
        )}

        {!auth && (
          <>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NavBar;
