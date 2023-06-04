import { useState } from "react";
import "./sidebar.css";
import useAuthToken from '../../../components/useAuthToken';


function Sidebar({ handleTabClick }) {
  const { userRole } = useAuthToken();
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
            {userRole === '1' && (
              <li className={`sidebarListItem ${ activeTab === "adminUsers" ? "active" : "" }`} onClick={() => handleButtonClick("adminUsers")}>
                <i className="bi bi-person-fill"></i>
                <span className="ms-2">Users</span>
              </li>
            )}
            <li className={`sidebarListItem ${ activeTab === "adminProducts" ? "active" : ""}`} onClick={() => handleButtonClick("adminProducts")}>
              <i className="bi bi-shop-window"></i>
              <span className="ms-2">Products</span>
            </li>
            {/* <li className={`sidebarListItem ${ activeTab === "adminTransactions" ? "active" : "" }`} onClick={() => handleButtonClick("adminTransactions")}>
              <i className="bi bi-currency-dollar"></i>
              <span className="ms-2">Transactions</span>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
