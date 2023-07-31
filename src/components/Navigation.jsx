import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import axios from "axios";

const Navigation = () => {
  const [menuData, setMenuData] = useState([]);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/options`)
      .then((response) => {
        setMenuData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching menu data:", error);
      });
  }, []);

  const filteredMenuData = menuData.filter((item) => !item.disable);

  filteredMenuData.sort((a, b) => a.id - b.id);

  return (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars">
          <i className="fa-solid fa-bars" onClick={showSidebar}></i>
        </Link>
      </div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <i className="fa-solid fa-xmark"></i>
            </Link>
          </li>
          {filteredMenuData.map((item) => {
            return (
              <li key={item.id} className="nav-text">
                <Link to={item.urlmenu}>
                  <i className={item.iconmenu}></i>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navigation;