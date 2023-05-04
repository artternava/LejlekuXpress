import React from "react";

function Sidebar({ handleTabClick }) {

  return (
    <div className="sidebar">
      <ul>
          <li className="sidebar-item" onClick={() => handleTabClick("personal")}>
            <i class="bi bi-person-fill"></i>
            My Profile
          </li>
          <li className="sidebar-item" onClick={() => handleTabClick("orders")}>
            <i class="bi bi-bag-check"></i> 
            My Orders
          </li>
          <li className="sidebar-item" onClick={() => handleTabClick("shipping")}>
            <i class="bi bi-truck"></i>
            Shipping Address
          </li>
          <li className="sidebar-item" onClick={() => handleTabClick("payment")}>
            <i class="bi bi-credit-card-fill"></i>
            Payment Methods
          </li>
          <li className="sidebar-item" onClick={() => handleTabClick("listings")}>
          <i class="bi bi-view-list"></i>
            My Listings
          </li>
      </ul>
    </div>
  );
}

export default Sidebar;