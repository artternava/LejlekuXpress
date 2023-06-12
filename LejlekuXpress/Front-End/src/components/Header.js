import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from "js-cookie";
import { BsSearch } from "react-icons/bs";
import useAuthToken from './useAuthToken.js';

const Header = () => {
  const { token, userRole, userId } = useAuthToken();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPrivilege, setHasPrivilege] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState(null);
  const [listings, setListings] = useState(null);
  const [totalShippingPrice, setTotalShippingPrice] = useState(0);
  const [productPrice, setProductPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setIsLoggedIn(!!token);
    setHasPrivilege(!!userRole);
    isPrivileged();
    fetchListings();
    fetchCart();
    calculateProductAndShippingPrice(items);
  }, [token, userRole, items, listings]);

  const fetchListings = async () => {
    try {
      const response = await axios.get('http://localhost:39450/api/Product/getall');
      setListings(response.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    async function fetchCart() {
    try {
      const response = await axios.get(`http://localhost:39450/api/Cart/getbyuserid?userID=${userId}`);
      if (response.status === 200) {
        const itemsResponse = response.data;
        setItems(itemsResponse);
        }
      } catch (error) {
        console.error(error);
      }
    }



  const calculateProductAndShippingPrice = (items) => {
    if (items && listings) {
      const productPrice = items.reduce((acc, item) => {
        const listing = listings.find(listing => listing.id === item.productId);
        const price = listing ? parseFloat(listing.price) : 0;
        return acc + price;
      }, 0);
      
      const shippingPrice = items.reduce((acc, item) => {
        const listing = listings.find(listing => listing.id === item.productId);
        const shippingPrice = listing ? parseFloat(listing.shippingPrice) : 0;
        return acc + shippingPrice;
      }, 0);
      
      setProductPrice(productPrice);
      setTotalShippingPrice(shippingPrice);
      setTotalPrice(productPrice + shippingPrice);
    }
  };

 

  const handleLogout = () => {
    Cookies.remove('access_token');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const isPrivileged = () => {
    if (userRole === '1' || userRole === '2') {
      setHasPrivilege(true);
    } else {
      setHasPrivilege(false);
    }
  };
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <>
      {/* Navbari Kryesor */}
      <header className="header-upper ">
        <div className="container-fluid px-8 ">
          <div className="row align-items-center">
            <div className="col-sm-2 d-flex justify-content-start align-items-center">
              <Link to="" className="container-fluid">
                <img
                  src="images/LejlekuXPress.jpg"
                  className="container-fluid "
                  alt="Lejleku XPress "
                  style={{width: "90%"}}
                />
              </Link>
              {hasPrivilege && (
                          <Link
                            to="admin"
                            className="align-items-center gap-10 text-black btn btn-outline-light text-black text-decoration-none"
                          >
                            <i className="bi bi-person-fill-gear fs-4"></i>
                          </Link>
                        )}
            </div>
            <div className="col-md-5 col-6">
              <div className="input-group">
              <input
                type="text"
                id="search"
                className="form-control"
                placeholder="Search"
                name="search"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
                <Link 
                  to={`/product?search=${encodeURIComponent(searchQuery)}`}
                  className="input-group-text p-3" 
                  id="basic-addon2"
                  >
                  <BsSearch />
                </Link>
              </div>
            </div>
            <div className="col-sm-5 col-12">
              <div className="header-upper-links d-flex align-items-center justify-content-start gap-3">
                <div>
                  <Link
                    to="Wishlist"
                    className="d-flex align-items-center gap-2 text-black btn btn-outline-light text-black text-decoration-none"
                  >
                    <i className="bi bi-heart fs-3"></i>
                    <p className="mb-0">Wishlists</p>
                  </Link>
                </div>

                <div>
                  <Link
                    to="Cart"
                    className="d-flex align-items-center gap-10 text-black btn btn-outline-light text-black text-decoration-none"
                  >
                    <i className="bi bi-cart4 fs-3"></i>
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">${totalPrice}</span>
                    </div>
                  </Link>
                </div>

                <div className="ml-auto">
                  {isLoggedIn ? (
                    <>
                      <div className="d-flex align-items-center gap-10 text-black">
                        <Link
                          to="userdashboard"
                          className="d-flex align-items-center gap-10 text-black btn btn-outline-light text-black text-decoration-none"
                        >
                          <i className="d-flex bi bi-person fs-3"></i>
                          <p className="mb-0">My Profile</p>
                        </Link>
                        <button
                          className="btn btn-outline-light text-black text-decoration-none"
                          onClick={handleLogout}
                        >
                          <i className="bi bi-lock bi-lg"></i>
                          <span>Logout</span>
                        </button>
                        
                      </div>
                    </>
                  ) : (
                    <Link
                      to="login"
                      className="d-flex align-items-center gap-10 text-black container-fluid btn btn-outline-light text-black text-decoration-none"
                    >
                      <i className="d-flex bi bi-person fs-3"></i>
                      <p className="mb-0">Login</p>
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
};

export default Header;
