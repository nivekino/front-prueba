import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { HomePage } from "../Pages/HomePage";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
export default AppRouter;
