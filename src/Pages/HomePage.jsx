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
    // Extract unique categories from the movieData
    const uniqueCategories = [...new Set(movieData.map((movie) => movie.category))];
    setCategories(uniqueCategories);
  }, [movieData]);

  return (
    <>
      <div className="pages">
        <h1 className="title-principal">Recently added movies</h1>
        <div className="filter-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>

          <select
            value={selectedYear}
            onChange={(e) => handleFilterByYear(e.target.value)}
          >
            <option value="">All Years</option>
            {extractUniqueYears().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => handleFilterByCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="card-container">
          {movieData.map((item) => {
            return (
              <Link to={`/movie/${item.id}`} key={item.id} movie={item.id}>
                <CardMovie key={item.id} movie={item} />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
