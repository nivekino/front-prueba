import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { HomePage } from "../Pages/HomePage";
import { MovieDetail } from "../Pages/MovieDetail";
import { ManagmentMovies } from "../Pages/ManagmentMovies";
import Form from "../Pages/Form";
import ManageOption from "../Pages/ManageOption";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="/ManagmentMovies" element={<ManagmentMovies />} />
          <Route path="/AddMovie" element={<Form />} />
          <Route path="/EditMovie/:id" element={<Form />} />
          <Route path="/ManageOption" element={<ManageOption />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
export default AppRouter;
