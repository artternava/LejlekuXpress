import React, { useState } from "react";
import Sidebar from "../components/SideBar";
import {
  PersonalInfo,
  ShippingInfo,
  PaymentDetails,
  MyOrders,
  MyListings,
  ChangePassword,
} from "../components/UserDashboardItems";

function UserDashboard() {
  const [activeTab, setActiveTab] = useState("personal");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  let activeTabComponent;

  switch (activeTab) {
    case "personal":
      activeTabComponent = <PersonalInfo />;
      break;
    case "shipping":
      activeTabComponent = <ShippingInfo />;
      break;
    case "payment":
      activeTabComponent = <PaymentDetails />;
      break;
      case "changepassword":
      activeTabComponent = <ChangePassword />;
      break;
    case "orders":
      activeTabComponent = <MyOrders />;
      break;
      case "listings":
      activeTabComponent = <MyListings />;
      break;
    default:
      activeTabComponent = <PersonalInfo />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
  <div style={{ flex: "0 0 200px" }}>
    <Sidebar handleTabClick={handleTabClick} />
  </div>
  <div style={{ flex: "1" }}>
    <div className="tab">{activeTabComponent}</div>
  </div>
</div>

  );
}

export default UserDashboard;
