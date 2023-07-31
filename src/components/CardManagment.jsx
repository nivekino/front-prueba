import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardManagment = ({ movie, setIsDeleted }) => {
  const deleteMovie = () => {
    console.log(movie.id);
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/api/movies/${movie.id}`)
      .then((response) => {
        console.log(response);
        setIsDeleted((prevState) => !prevState);
        toast.success("Delete successfully!");
      })
      .catch((error) => {
        toast.error("an error occurred while trying to delete");
        console.error("Error deleting movie:", error);
      });
  };

  return (
    <>
      <div className="card">
        <img src={movie.img} alt={movie.name} className="img-card" />
        <div className="card-body">
          <h2 className="title-movie">{movie.name}</h2>
          <p className="txt-card">Date: {movie.date}</p>
          <p className="txt-card">Category: {movie.category}</p>

          <div className="container-btn">
            <Link
              to={`/EditMovie/${movie.id}`}
              key={movie.id}
              movie={movie.id}
              className="btn-card-edit"
            >
              <i className="fa-solid fa-pencil"></i> Edit
            </Link>
            <button className="btn-card-delete" onClick={deleteMovie}>
              <i className="fa-solid fa-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardManagment;
