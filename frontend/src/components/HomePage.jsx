import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch(() => setError("Failed to fetch movies"));
  }, []);

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", bgcolor: "#f4f4f4", pt: 3 }}>
      {/* Banner Section */}
      <Box
        sx={{
          width: "80%",
          height: { xs: "30vh", md: "40vh" },
          margin: "auto",
          overflow: "hidden",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <img
          src="https://cdna.artstation.com/p/assets/images/images/057/968/226/large/isula-perera-pepsi-final-color-graded-with-watermark.jpg?1673092062"
          alt="Refreshing drink advertisement"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>

      {/* Latest Releases Title */}
      <Typography
        variant="h4"
        textAlign="center"
        sx={{
          fontWeight: "bold",
          mt: 4,
          color: "#333",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Latest Releases
      </Typography>

      {/* Error Message */}
      {error && (
        <Typography
          color="error"
          textAlign="center"
          sx={{ mt: 2, fontSize: "1.2rem", fontWeight: "500" }}
        >
          {error}
        </Typography>
      )}

      {/* Movies Grid */}
      <Box
      
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          mt: 3,
          width: "80%",
          margin: "auto",
        }}
      >
        {movies.slice(0, 4).map((movie) => (
          <MovieItem
            key={movie._id}
            id={movie._id}
            title={movie.title}
            posterUrl={movie.posterUrl || "/fallback-image.jpg"}
            releaseDate={movie.releaseDate}

          />
        ))}
      </Box>

      {/* View All Movies Button */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, pb: 4 }}>
        <Button
          component={Link}
          to="/movies"
          variant="contained"
          sx={{
            backgroundColor: "#2b2d42",
            color: "#fff",
            fontWeight: "bold",
            px: 3,
            py: 1.5,
            fontSize: "1rem",
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#1d1f30" },
          }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
