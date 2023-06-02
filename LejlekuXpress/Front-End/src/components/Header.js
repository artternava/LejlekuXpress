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
        <header className="header-upper">
          <div className="container-fluid px-8">
            <div className="row align-items-center">
              <div className="col-3 px-5">
                <h1>                 
                <Link to="">
                    <img src="images/LejlekuXPress.jpg" className="container-fluid" alt="Lejleku XPress"></img>
                </Link>
                </h1>
              </div>
              <div className="col-5">
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
              <div className="col-3">
  <div className="header-upper-links d-flex align-items-center justify-content-start gap-3">
  
    <div>
      <Link to="Wishlist" className="d-flex align-items-center gap-2 text-black btn btn-outline-light text-black text-decoration-none">
        <i className="bi bi-heart fs-3"></i>
        <p className="mb-0">Wishlists</p>
      </Link>
    </div>
    
    
    <div>
      <Link to="Cart" className="d-flex align-items-center gap-10 text-black btn btn-outline-light text-black text-decoration-none">
        <i className="bi bi-cart4 fs-3"></i>
        <div className="d-flex flex-column gap-10">
          <span className="badge bg-white text-dark">$ 0.00</span>
          
        </div>
      </Link>
    </div>
    
    <div className="ml-auto">
      {isLoggedIn ? (
        <>
          <div className="d-flex align-items-center gap-10 text-black">
         
            <Link to="userdashboard" className="d-flex align-items-center gap-10 text-black btn btn-outline-light text-black text-decoration-none">
            <i className="d-flex bi bi-person fs-3"></i>
              <p className="mb-0">My Profile</p>
            </Link>
                   
              <i className="bi bi-lock bi-lg"></i>
              <span>Logout</span>
           
          </div>
        </>
      ) : (
        
        <Link to="login" className="d-flex align-items-center gap-10 text-black container-fluid btn btn-outline-light text-black text-decoration-none">
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
  }
  
  export default Header;