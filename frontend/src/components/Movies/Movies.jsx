import React, { useEffect, useState } from 'react';
import { getAllMovies } from '../../api-helpers/api-helpers';
import { Box, Typography, Grid, Paper } from '@mui/material';
import MovieItem from './MovieItem';

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.error('Error fetching movies:', err));
  }, []);

  return (
    <Box sx={{ margin: 'auto', mt: 4, p: 2, maxWidth: '90vw' }}>
      {/* Header Section */}
      <Paper
        elevation={3}
        sx={{
          bgcolor: '#900C3F',
          color: 'white',
          textAlign: 'center',
          borderRadius: 2,
          width: { xs: '90%', sm: '70%', md: '60%' },
          mx: 'auto',
          py: 2,
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          All Movies
        </Typography>
      </Paper>

      {/* Movies Grid */}
      <Grid container spacing={3} justifyContent="center">
        {movies.map((movie) => (
          <Grid item key={movie._id} xs={6} sm={6} md={4} lg={3}>
            <MovieItem 
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #ddd',
                borderRadius: 0,
                padding: 0,
                boxShadow: 0,
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(0.05)',
                  boxShadow: 6,
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Movies;
