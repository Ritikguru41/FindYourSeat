import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Sign-in Icon
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e, val) => {
    const movie = movies.find((m) => m.title === val);
    if (movie && isUserLoggedIn) {
      navigate(`/booking/${movie._id}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        {/* Left Side - Logo and FindYourSeat */}
        <Box display="flex" alignItems="center" width="20%">
          <Link to="/" style={{ color: "white", display: "flex", alignItems: "center", textDecoration: "none" }}>
            <MovieCreationIcon sx={{ fontSize: 30, marginRight: 1 }} />
            <Typography variant="h6" fontWeight="bold">
              FindYourSeat
            </Typography>
          </Link>
        </Box>

        {/* Middle - Search Movies */}
        <Box width="50%" marginRight="auto" marginLeft="auto">
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                variant="standard"
                {...params}
                sx={{
                  borderRadius: 2,
                  input: { color: "white" },
                  bgcolor: "#2b2d42",
                  padding: "6px",
                }}
                placeholder="Search Movies"
              />
            )}
          />
        </Box>

        {/* Right Side - Tabs and Sign-in Icon */}
        <Box display="flex" alignItems="center">
          <Tabs value={value} onChange={(e, val) => setValue(val)} textColor="inherit">
            <Tab label="Movies" LinkComponent={Link} to="/movies" />

            {isUserLoggedIn && (
              <Tab key="logout" onClick={() => logout(false)} label="Logout" LinkComponent={Link} to="/" />
            )}

            {isAdminLoggedIn && [
              <Tab key="add" label="Add Movie" LinkComponent={Link} to="/add" />,
              <Tab key="admin-logout" onClick={() => logout(true)} label="Logout" LinkComponent={Link} to="/" />,
            ]}
          </Tabs>

          {/* Sign-in Icon instead of Auth */}
          {!isAdminLoggedIn && !isUserLoggedIn && (
            <IconButton component={Link} to="/auth" sx={{ color: "white", marginLeft: 1 }}>
              <AccountCircleIcon sx={{ fontSize: 32 }} />
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
