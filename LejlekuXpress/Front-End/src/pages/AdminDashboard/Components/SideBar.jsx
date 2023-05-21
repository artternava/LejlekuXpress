import { useState } from "react";
import "./sidebar.css";

function Sidebar({ handleTabClick }) {
  const [activeTab, setActiveTab] = useState("adminHome");

  const handleButtonClick = (tabName) => {
    setActiveTab(tabName);
    handleTabClick(tabName);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <li className={`sidebarListItem ${ activeTab === "adminHome" ? "active" : ""}`} onClick={() => handleButtonClick("adminHome")}>
              <i className="bi bi-house-fill"></i>
              <span className="ms-2">Home</span>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <li className={`sidebarListItem ${ activeTab === "adminUsers" ? "active" : "" }`} onClick={() => handleButtonClick("adminUsers")}>
              <i className="bi bi-person-fill"></i>
              <span className="ms-2">Users</span>
            </li>
            <li className={`sidebarListItem ${ activeTab === "adminProducts" ? "active" : ""}`} onClick={() => handleButtonClick("adminProducts")}>
              <i className="bi bi-shop-window"></i>
              <span className="ms-2">Products</span>
            </li>
            <li className={`sidebarListItem ${ activeTab === "adminTransactions" ? "active" : "" }`} onClick={() => handleButtonClick("adminTransactions")}>
              <i className="bi bi-currency-dollar"></i>
              <span className="ms-2">Transactions</span>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className={`sidebarListItem ${ activeTab === "adminMail" ? "active" : "" }`} onClick={() => handleButtonClick("adminMail")}>
              <i className="bi bi-envelope"></i>
              <span className="ms-2">Mail</span>
            </li>
            <li className={`sidebarListItem ${ activeTab === "adminFeedback" ? "active" : "" }`} onClick={() => handleButtonClick("adminFeedback")}>
              <i className="bi bi-chat-square-dots"></i>
              <span className="ms-2">Feedback</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
