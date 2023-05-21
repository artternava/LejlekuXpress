import React from "react";

function Sidebar({ handleTabClick }) {

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">My Information</h3>
          <ul className="sidebarList">
          <li className="sidebar-item" onClick={() => handleTabClick("personal")}>
            <i class="bi bi-person-fill"></i>
            <span className="ms-2">My Profile</span>
           </li>
           <li className="sidebar-item" onClick={() => handleTabClick("orders")}>
            <i class="bi bi-bag-check"></i> 
            <span className="ms-2">My Orders</span>
          </li>
          <li className="sidebar-item" onClick={() => handleTabClick("shipping")}>
            <i class="bi bi-truck"></i>
            <span className="ms-2">Shipping Address</span>
          </li>
          <li className="sidebar-item" onClick={() => handleTabClick("payment")}>
            <i class="bi bi-credit-card-fill"></i>
            <span className="ms-2">Payment Methods</span>
          </li>
          <li className="sidebar-item" onClick={() => handleTabClick("changepassword")}>
            <i class="bi bi-lock-fill"></i>
            <span className="ms-2">Change Password</span>
          </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">My Seller Dashboard</h3>
          <ul className="sidebarList">
            <li className="sidebar-item" onClick={() => handleTabClick("listings")}>
            <i class="bi bi-view-list"></i>
            <span className="ms-2">My Listings</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;