import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import DashBoard from "./Components/DashBoard";
import "./App.css";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          
            <DashBoard />
        }
      />
    </Routes>
  );
}