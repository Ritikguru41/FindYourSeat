import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../../api-helpers/api-helpers";
import { Box, Typography, Button } from "@mui/material";

const Booking = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id)
      .then((data) => {
        if (data) {
          setMovie(data);
          console.log("DATA: ", data);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!movie) {
    return (
      <Typography variant="h6" textAlign="center">
        Movie not found
      </Typography>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={3}
      minHeight="100vh"
      textAlign="center"
    >
      {/* Movie Poster and Details */}
      <Box width={{ xs: "90%", md: "50%" }}>
        <img src={movie.posterUrl} alt={movie.title} width="100%" />
        <Typography variant="h4" fontWeight="bold" marginTop={2}>
          {movie.title}
        </Typography>
        <Typography marginTop={1}>{movie.description}</Typography>
        <Typography fontWeight="bold" marginTop={1}>
          Release Date: {new Date(movie.releaseDate).toDateString()}
        </Typography>
      </Box>

      {/* Buttons Section */}
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        gap={2}
        marginTop={4}
        width={{ xs: "90%", md: "50%" }}
      >
        {movie.trailerId && (
          <Button
            component={Link}
            to={`${movie.trailerId}`}
            variant="contained"
            target="_blank"
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              borderRadius: 3,
              paddingX: 3,
              paddingY: 1.2,
              "&:hover": { backgroundColor: "#1565c0" },
            }}
          >
            Watch Trailer
          </Button>
        )}

        <Button
          component={Link}
          to={`/book/${id}`}
          variant="contained"
          sx={{
            backgroundColor: "#d32f2f",
            color: "white",
            borderRadius: 3,
            paddingX: 3,
            paddingY: 1.2,
            "&:hover": { backgroundColor: "#b71c1c" },
          }}
        >
          Book Now
        </Button>
      </Box>
    </Box>
  );
};

export default Booking;

