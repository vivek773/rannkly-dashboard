// Dashboard
import React from "react";
import Card from "../components/common/Card";
import OnlineRatingChart from "../components/charts/OnlineRatingChart";
import ReviewsChart from "../components/charts/ReviewsChart";
import SentimentChart from "../components/charts/SentimentChart";
import NetPromoterChart from "../components/charts/NetPromoterChart";
import RatingsReviewsChart from "../components/charts/RatingsChart";
import Breadcrumb from "../components/common/Breadcrumb";
import Filter from "../components/filters/Filter";

const Dashboard = ({ isSidebarOpen }) => {
  const breadcrumbItems = ["Dashboards", "Default"];

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

      <div className="dashboard-grid">
        <Card title="Online Rating Index">
          <OnlineRatingChart />
        </Card>
        <Card title="Responded & Unresponded Reviews">
          <ReviewsChart />
        </Card>
        <Card title="Sentiment Score">
          <SentimentChart />
        </Card>
        <Card title="Net Promoter Score">
          <NetPromoterChart />
        </Card>
        <Card title="Ratings & Reviews">
          <RatingsReviewsChart />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
