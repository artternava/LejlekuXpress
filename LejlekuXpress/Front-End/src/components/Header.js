import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { BsSearch } from "react-icons/bs";
import useAuthToken from './useAuthToken.js';

const Header = () => {
  const { token } = useAuthToken();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const handleLogout = () => {
    Cookies.remove('access_token');
    setIsLoggedIn(false);
    window.location.href = '/';
  };
  
    return (
      <>
        {/* Navbari Kryesor */}
        <header className="header-upper py-3">
          <div className="container-xxl px-8">
            <div className="row align-items-center">
              <div className="col-3">
                <h1>
                  <Link to="" className="logo">
                    LejlekuX<span className="logo2">Press</span>
                  </Link>
                </h1>
              </div>
              <div className="col-4 py-1">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control py-1"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <span className="input-group-text p-3" id="basic-addon2">
                    <BsSearch />
                  </span>
                </div>
              </div>
              <div className="col-5">
                <div className="header-upper-links d-flex align-items-center justify-contect-between gap-45">
                  <div>
                    <Link
                      to="Wishlist"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img src="../images/wishlist.svg" alt="wishlist" />
                      <p className="mb-0">
                        Favorite <br /> Wishlists
                      </p>
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="Cart"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img src="../images/cart.svg" alt="cart" />
                      <div className="d-flex flex-column gap-10">
                        <span className="badge bg-white text-dark"></span>
                        <p className="mb-0">$ 0.00</p>
                      </div>
                    </Link>  
                  </div>
                  <div>
                    {isLoggedIn ? (
                      <>
                        <Link
                          to="userdashboard"
                          className="d-flex align-items-center gap-10 text-white"
                        >
                          <img src="../images/user.svg" alt="user" />
                          <p className="mb-0">
                            Profile <br /> My Account
                          </p>
                        </Link>
                        <button className="btn btn-link text-white" onClick={handleLogout}>Logout</button>
                      </>
                    ) : (
                      <Link
                        to="login"
                        className="d-flex align-items-center gap-10 text-white"
                      >
                        <img src="../images/user.svg" alt="user" />
                        <p className="mb-0">
                          Login <br /> My Account
                        </p>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </>
    );
  }
  
  export default Header;