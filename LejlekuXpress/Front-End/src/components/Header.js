import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "./logo.ico";
import { BsSearch } from "react-icons/bs";

const Header = () => {
  return (
    <>
      <header className="header-upper">
        <div className="container-xxl px-8">
          <div className="row align-items-center">
            <div className="col-3">
              <h1>
                <Link className="logo">
                  LejlekuX<span className="logo2">Press</span>
                </Link>
              </h1>
            </div>
            <div className="col-4 py-1">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control py-1"
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <span class="input-group-text p-3" id="basic-addon2">
                  <BsSearch />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center justify-contect-between gap-45">
                <div>
                  <Link className="d-flex align-items-center gap-10 text-white">
                    <img src="images/wishlist.svg" alt="wishlist" />
                    <p class="mb-0">
                      Favorite <br /> Wishlists
                    </p>
                  </Link>
                </div>
                <div>
                <Link className="d-flex align-items-center gap-10 text-white">
                    <img src="images/cart.svg" alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark"></span>
                      <p className="mb-0">$ 0.00</p>
                    </div>
                  </Link>

                </div>
                <div>
                <Link className="d-flex align-items-center gap-10 text-white">
                    <img src="images/user.svg" alt="user" />
                    <p className="mb-0">
                      Login <br /> My Account
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
