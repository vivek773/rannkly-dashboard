import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Analytics from "../pages/Analytics";
import Settings from "../pages/Settings";
import SocialMedia from "../pages/SocialMedia";
import Surveys from "../pages/Surveys";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/analyics" element={<MainLayout />}>
        <Route index element={<Analytics />} />
      </Route>
      <Route path="/settings" element={<MainLayout />}>
        <Route index element={<Settings />} />
      </Route>
      <Route path="/social-media" element={<MainLayout />}>
        <Route index element={<SocialMedia />} />
      </Route>
      <Route path="/surveys" element={<MainLayout />}>
        <Route index element={<Surveys />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
