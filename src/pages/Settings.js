// Settings
import React from "react";
import Breadcrumb from "../components/common/Breadcrumb";
import Filter from "../components/filters/Filter";

const Settings = ({ isSidebarOpen }) => {
  const breadcrumbItems = ["Settings", "Default"];

  return (
    <div className={`dashboard ${isSidebarOpen ? "" : "collapsed"}`}>
      <div className="flex-center">
        <div>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div>
          <Filter />
        </div>
      </div>
      <h1> Comming Soon...</h1>
    </div>
  );
};

export default Settings;
