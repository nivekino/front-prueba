import React, { useState, useEffect } from "react";
import axios from "axios";
import CardManagment from "../components/CardManagment";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ManagmentMovies = () => {
  const [movieData, setMovieData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false); // New state to track deletions

  useEffect(() => {
    fetchMovieData();
  }, [isDeleted]);

  const fetchMovieData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/movies`)
      .then((response) => {
        setMovieData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  };

  return (
    <>
      <div className="pages">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          progress={undefined}
          theme="dark"
        />
        <h1 className="title-principal">Managment Movies</h1>

        <div className="container-btn-add">
          <Link to="/AddMovie" className="btn-add-movie">
            <i className="fa-solid fa-plus"></i> Add Movie
          </Link>
        </div>

        <div className="card-container">
          {movieData.map((item) => {
            return (
              <CardManagment
                key={item.id}
                movie={item}
                setIsDeleted={setIsDeleted}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
