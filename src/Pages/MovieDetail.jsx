import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export const MovieDetail = () => {
  const [movieData, setMovieData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/movies/${id}`)
      .then((response) => {
        setMovieData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, [id]);

  const formatMoney = (amount) => {
    if (typeof amount === "number") {
      return amount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } else {
      return "N/A";
    }
  };

  return (
    <>
      <div className="pages">
        <div className="back-container">
          <Link to={"/"} className="btn-back">
            Go back to catalog
          </Link>
        </div>
        <h1 className="title-principal-2">{movieData.name}</h1>

        <div className="content-details">
          <div className="content-details-image">
            <img
              src={movieData.img}
              alt={movieData.title}
              className="img-detail"
            />
          </div>
          <div className="content-details-text">
            <p className="txt-desc">
              Description:{" "}
              <span className="txt-detail">{movieData.description}</span>
            </p>
            <p className="txt-desc">
              Category: <span className="txt-detail">{movieData.category}</span>
            </p>
            <p className="txt-desc">
              Date: <span className="txt-detail">{movieData.date}</span>
            </p>
            <p className="txt-desc">
              Duration:{" "}
              <span className="txt-detail">{movieData.duration} Min</span>
            </p>
            <p className="txt-desc">
              Budget:{" "}
              <span className="txt-detail">
                {formatMoney(movieData.budget)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
