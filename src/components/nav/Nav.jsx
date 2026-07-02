import React, { useState } from "react";
import "./nav.css";
import data from "../../data.json";
import useLoginStore from "../../store/loginstore";

import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Nav = () => {
  const navigate = useNavigate();
  const {auth,logoutAuth} = useLoginStore();

  const [showProfile,setShowProfile] = useState(false)

  const [search, Setsearch] = useState("");

  const [activemenu, Setactivemenu] = useState(null);

  const menuData = {
    home: ["Pharmacy store", "Furniture store", "Grocery store"],
    shop: ["Product", "Product Details", "Wishlist", "Cart", "Checkout"],
    pages: ["About us", "Find a store", "Porfolio", "FAQ", "Comming soon"],
    blog: ["Blog Default", "Blog Grid", "Blog Details"],
  };

  const activeItems = menuData[activemenu];

  const topnavlist = ["English", "USD"];
  const bottomnavmenu = ["Home", "About", "Shop", "Pages", "Blog", "Contact"];

  const handleclick = (li) => {
    switch (li) {
      case "Home": {
        navigate("/");
        break;
      }
      case "Contact": {
        navigate("/contact");
        break;
      }
      case "Shop": {
        navigate("/shop");
        break;
      }
    }
  };
  const filterproduct = data.featuredproducts.filter((item) => {
    return item.title.toLowerCase().includes(search.toLowerCase());
  });

  const handleLogOut = ()=>{
    logoutAuth()
    toast.success("Loged Out Successfully")
    navigate("/login")
  }

  return (
    <>
      <nav>
        <div className="topnav">
          <div>
            <i className="fa-solid fa-phone"></i>
            <span>+91 7708463548</span>
          </div>
          <h3>TAKE CARE OF YOUR Health 25% OFF USE CODE “ DOFIX03 ”</h3>
          <ul>
            {topnavlist.map((listitems, index) => {
              return <li key={index}>{listitems}</li>;
            })}
          </ul>
          <div id="profile" onClick={() => setShowProfile(!showProfile)}>
            <i className="fa-solid fa-user"></i>

            {showProfile && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <h4>
                    {auth?.firstName} {auth?.lastName}
                  </h4>
                  <p>{auth?.email}</p>
                </div>

                <hr />

                <button className="logout-btn"
                onClick={handleLogOut}>Logout</button>
              </div>
            )}
          </div>
        </div>
        <div className="bottomnav">
          <div id="logo">
            <i className="fa-brands fa-studiovinari"></i>
            <h3>ADDINA</h3>
          </div>
          <ul className="menu">
            {bottomnavmenu.map((menuitem) => {
              return (
                <li
                  key={menuitem}
                  onMouseEnter={() => Setactivemenu(menuitem.toLowerCase())}
                  onMouseLeave={() => Setactivemenu(null)}
                  onClick={() => handleclick(menuitem)}
                >
                  {menuitem}
                  <div className="hidden"></div>
                  {activemenu === menuitem.toLocaleLowerCase() &&
                    activeItems && (
                      <div className="dropdown">
                        <ul>
                          {activeItems.map((element, index) => {
                            return <li key={index}>{element}</li>;
                          })}
                        </ul>
                      </div>
                    )}
                </li>
              );
            })}
          </ul>
          <div className="seachdiv">
            <div id="inputdiv">
              <input
                type="text"
                placeholder="search.."
                value={search}
                onChange={(e) => Setsearch(e.target.value)}
              />
            </div>
            <div id="searchicon" onClick={(e) => Setsearch("")}>
              <i className="fa-brands fa-sistrix"></i>
            </div>
            {search && (
              <div id="suggestions">
                {filterproduct.length > 0 ? (
                  filterproduct.map((item, index) => {
                    return (
                      <div key={index} id="suggestion-inner">
                        <img src={item.image} alt="" />
                        <div>
                          <p>{item.title}</p>
                          <span>{item.price}</span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div> no such result found</div>
                )}
              </div>
            )}
          </div>
          <div className="commonicon">
            <NavLink to={"/cart"}>
              <i className="fa-solid fa-cart-shopping"></i>
            </NavLink>
            <NavLink to={"/wishlist"}>
              <i className="fa-regular fa-heart"></i>
            </NavLink>
            <NavLink to={"/checkout"}>
              <i className="fa-solid fa-bars-staggered"></i>
            </NavLink>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
