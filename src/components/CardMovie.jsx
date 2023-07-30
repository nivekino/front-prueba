import React from "react";

const CardMovie = ({ movie }) => {
  return (
    <div className="card">
      <img src={movie.img} alt={movie.name} className="img-card" />
      <div className="card-body">
        <h2 className="title-movie">{movie.name}</h2>
        <p className="txt-card">Date: {movie.date}</p>
        <p className="txt-card">Category: {movie.category}</p>
      </div>
    </div>
  );
};

export default CardMovie;
