import React, { useState, useEffect } from "react";
import Sidebar from "./Components/SideBar";
import { Home } from "./Pages/Home";
import { Users } from "./Pages/Users";
import { Products } from "./Pages/Products";
import { Transactions } from "./Pages/Transactions";
import { Mail } from "./Pages/Mail";
import { Feedback } from "./Pages/Feedback";
import useAuthToken from "../../components/useAuthToken";

function AdminDashboard() {
  const token = useAuthToken();
  const [activeTab, setActiveTab] = useState("adminHome");

  useEffect(() => {
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const roleId = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log("Role ID:", roleId);
      if (!roleId || roleId !== "1") {
        console.log("Redirecting to homepage...");
        window.location.href = "/";
      }
    } else {
      console.log("Redirecting to homepage...");
      window.location.href = "/";
    }
  }, [token]);
  

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
    case "adminMail":
      activeTabComponent = <Mail />;
      break;
    case "adminFeedback":
      activeTabComponent = <Feedback />;
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
