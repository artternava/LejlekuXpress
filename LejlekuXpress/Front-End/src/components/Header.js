import React from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";



const Header = () => {
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
                  <Link hrefLang="about" className="d-flex align-items-center gap-10 text-white">
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
                  <Link to="login" className="d-flex align-items-center gap-10 text-white">
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
      {/*Dropdown categories*/}
      <header className="header-bottom py-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      class="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-10 m d-flex align-items-center"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src="images/menu.svg" alt="" />
                      <span className="me-5 d-inline-block">Shop Categories</span>
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Clothes
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Cosmetics
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to=" text-white">
                          Accesories
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to=" text-white">
                          Technology
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to=" text-white">
                          Sport
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/store">Our Store</NavLink>
                    <NavLink to="contact">Contacts</NavLink>
                  </div>
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
