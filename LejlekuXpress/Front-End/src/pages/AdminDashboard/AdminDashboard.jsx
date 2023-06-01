import React, { useState } from "react";
import Sidebar from "./Components/SideBar";
import { Home } from "./Pages/Home";
import { Users } from "./Pages/Users";
import { Products } from "./Pages/Products";
import { Transactions } from "./Pages/Transactions";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("adminHome");
  

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  let activeTabComponent;

  switch (activeTab) {
    case "adminHome":
      activeTabComponent = <Home />;
      break;
    case "adminUsers":
      activeTabComponent = <Users />;
      break;
    case "adminProducts":
      activeTabComponent = <Products />;
      break;
    case "adminTransactions":
      activeTabComponent = <Transactions />;
      break;
    default:
      activeTabComponent = <Home />;
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "0 0 200px" }}>
        <Sidebar handleTabClick={handleTabClick} />
      </div>
      <div style={{ flex: "1", backgroundColor: "#BCD8EA", padding: "20px" }}>
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "10px" }}>
          <div className="tab">{activeTabComponent}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
