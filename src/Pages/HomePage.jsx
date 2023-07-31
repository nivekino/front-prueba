import React, { useState, useEffect } from "react";
import axios from "axios";
import CardMovie from "../components/CardMovie";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const [movieData, setMovieData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [visibleItemCount, setVisibleItemCount] = useState(10);

  const handleSearch = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/search`, {
        params: { searchTerm },
      })
      .then((response) => {
        setMovieData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  };

  const handleFilterByYear = (year) => {
    setSelectedYear(year);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/movies/?year=${year}`)
      .then((response) => {
        setMovieData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  };

  const handleFilterByCategory = (category) => {
    setSelectedCategory(category);
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/api/search-category?searchTerm=${category}`
      )
      .then((response) => {
        setMovieData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  };

  const extractUniqueYears = () => {
    const years = new Set();
    movieData.forEach((movie) => {
      const year = new Date(movie.date).getFullYear();
      years.add(year);
    });
    return Array.from(years);
  };

  const handleLoadMore = () => {
    setVisibleItemCount((prevVisibleItemCount) => prevVisibleItemCount + 10);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/movies`)
      .then((response) => {
        setMovieData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching movie data:", error);
      });
  }, []);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(movieData.map((movie) => movie.category)),
    ];
    setCategories(uniqueCategories);
  }, [movieData]);

  return (
    <>
      <div className="pages">
        <h1 className="title-principal">Recently added movies</h1>
        <div className="filter-container">
          <div className="container-filter">
            <h3 className="title-filter">
              <i className="fa-solid fa-magnifying-glass"></i> Search by title
            </h3>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
              />
              <button onClick={handleSearch} className="btn-search">Search</button>
            </div>
          </div>
          <div className="container-filter">
            <h3 className="title-filter">
              <i className="fa-solid fa-magnifying-glass"></i> Search by year
            </h3>

            <select
              value={selectedYear}
              onChange={(e) => handleFilterByYear(e.target.value)}
              className="form-control"
            >
              <option value="">All Years</option>
              {extractUniqueYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="container-filter">
            <h3 className="title-filter">
              <i className="fa-solid fa-magnifying-glass"></i> Search by category
            </h3>

            <select
              value={selectedCategory}
              onChange={(e) => handleFilterByCategory(e.target.value)}
              className="form-control"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="card-container">
          {movieData.slice(0, visibleItemCount).map((item) => {
            return (
              <Link to={`/movie/${item.id}`} key={item.id} movie={item.id}>
                <CardMovie key={item.id} movie={item} />
              </Link>
            );
          })}
        </div>
        <div className="btn-load-container">
          {movieData.length > visibleItemCount && (
            <button onClick={handleLoadMore} className="btn-load">
              Load More
            </button>
          )}
        </div>
      </div>
    </>
  );
};
