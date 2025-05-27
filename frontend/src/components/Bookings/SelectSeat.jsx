import React, { useState, useEffect } from "react";
import { 
  Button, 
  Grid, 
  Typography, 
  Box, 
  TextField, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  Paper,
  CircularProgress,
  Chip
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { bookSeats, getMovieDetails } from "../../api-helpers/api-helpers";
import { EventSeat } from "@mui/icons-material";

const seatLayout = {
  premium: { rows: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"], price: 250, seatsPerRow: 10 },
  executive: { rows: ["K"], price: 500, seatsPerRow: 18 },
};

const showtimes = ["9:00 AM", "12:30 PM", "4:00 PM", "6:30 PM", "8:30 PM"];

const places = [
  "PVR Kurla",
  "PVR Chakala",
  "Maxus Sakinaka",
  "PVR Bandra",
  "Galaxy Cinema Bandra",
  "INOX R-City Ghatkophar",
  "INOX R-Mall Thane",
  "Nexus Cinema Seawoods",
  "MovieMax Kalyan",
  "Gem Cinema Bandra",
  "Kasturba Cinema",
];

const SeatSelection = () => {
  const { id: movieId } = useParams();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPlace, setSelectedPlace] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieTitle, setMovieTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await getMovieDetails(movieId);
        if (res?.title) {
          setMovieTitle(res.title);
          localStorage.setItem("movieTitle", res.title);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  const handleSeatClick = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const totalAmount = selectedSeats.reduce((sum, seat) => {
    const category = Object.values(seatLayout).find(({ rows }) =>
      rows.some((row) => seat.startsWith(row))
    );
    return sum + (category?.price || 0);
  }, 0);

  const handleConfirmBooking = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to book seats.");
      return;
    }

    if (!selectedSeats.length || !selectedTime || !selectedDate || !selectedPlace) {
      alert("Please select place, seats, date, and time.");
      return;
    }

    setLoading(true);
    try {
      // Ensure movieTitle is set
      const currentMovieTitle = movieTitle || localStorage.getItem("movieTitle") || "Unknown Movie";

      // Prepare booking data
      const bookingData = {
        seats: selectedSeats,
        userId,
        movieTime: selectedTime, // Ensure this matches the backend schema
        date: selectedDate,
        movieTitle: currentMovieTitle, // Include movieTitle in the payload
        place: selectedPlace, // Include selected place in the payload
      };

      console.log("Booking Data:", bookingData); // Debugging

      // Call the bookSeats API
      const res = await bookSeats(movieId, bookingData);

      if (res) {
        console.log("Booking successful:", res);

        // Store booking details in localStorage
        const bookingDetails = {
          bookingId: res.bookingId,
          movieTitle: currentMovieTitle,
          seats: selectedSeats,
          timing: selectedTime,
          date: selectedDate,
          place: selectedPlace,
          totalAmount,
        };

        localStorage.setItem("bookingDetails", JSON.stringify(bookingDetails));
        console.log("Booking Details Stored:", bookingDetails); // Debugging

        // Navigate to confirmation page
        navigate("/booking-confirmation", { state: bookingDetails });
      } else {
        console.warn("Booking response was empty or unsuccessful");
      }
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Something went wrong!");
    }
    setLoading(false);
  };
  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ 
        fontWeight: 'bold', 
        mb: 4,
        color: 'primary.main',
        textAlign: 'center'
      }}>
        {movieTitle || 'Select Seats'}
      </Typography>

      {/* Selection Controls */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Cinema Location</InputLabel>
            <Select
              value={selectedPlace}
              onChange={(e) => setSelectedPlace(e.target.value)}
              label="Cinema Location"
              variant="outlined"
            >
              {places.map((place) => (
                <MenuItem key={place} value={place}>{place}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            label="Select Date"
            type="date"
            fullWidth
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: new Date().toISOString().split('T')[0] }}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth>
            <InputLabel>Show Time</InputLabel>
            <Select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              label="Show Time"
            >
              {showtimes.map((time) => (
                <MenuItem key={time} value={time}>{time}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Showtimes Quick Select */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Quick Select Showtime
        </Typography>
        <Grid container spacing={1} justifyContent="center">
          {showtimes.map((time) => (
            <Grid item key={time}>
              <Chip
                label={time}
                onClick={() => setSelectedTime(time)}
                color={selectedTime === time ? 'primary' : 'default'}
                variant={selectedTime === time ? 'filled' : 'outlined'}
                sx={{ 
                  minWidth: 100,
                  transition: 'all 0.3s ease',
                  '&:hover': { transform: 'scale(1.05)' }
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Seat Maps */}
      {Object.entries(seatLayout).map(([category, config]) => (
        <Paper key={category} elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ 
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span>{category.toUpperCase()} CLASS</span>
            <Chip label={`₹${config.price} per seat`} color="secondary" />
          </Typography>

          <Box sx={{ 
            p: 2,
            bgcolor: 'rgba(0,0,0,0.05)',
            borderRadius: 2,
            position: 'relative',
            '&:after': {
              content: '"SCREEN"',
              position: 'absolute',
              top: -30,
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'text.secondary',
              fontWeight: 'bold'
            }
          }}>
            {config.rows.map((row) => (
              <Grid key={row} container justifyContent="center" spacing={1} sx={{ mb: 1 }}>
                {[...Array(config.seatsPerRow)].map((_, index) => {
                  const seat = `${row}${index + 1}`;
                  const isSelected = selectedSeats.includes(seat);
                  
                  return (
                    <Grid item key={seat}>
                      <Button
                        variant={isSelected ? 'contained' : 'outlined'}
                        color={isSelected ? 'primary' : 'inherit'}
                        onClick={() => handleSeatClick(seat)}
                        sx={{
                          minWidth: 40,
                          height: 40,
                          p: 0,
                          borderRadius: 1,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            transform: 'scale(1.1)'
                          }
                        }}
                      >
                        {isSelected ? (
                          <EventSeat sx={{ color: 'white' }} />
                        ) : (
                          <EventSeat sx={{ color: 'text.secondary' }} />
                        )}
                      </Button>
                    </Grid>
                  );
                })}
              </Grid>
            ))}
          </Box>
        </Paper>
      ))}

      {/* Fixed Bottom Bar */}
      <Paper elevation={3} sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        p: 2,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16
      }}>
        <Box sx={{ 
          maxWidth: 1200, 
          margin: '0 auto',
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center'
        }}>
          <Box>
            <Typography variant="h6">
              Selected Seats: {selectedSeats.join(', ') || 'None'}
            </Typography>
            <Typography variant="h5" color="secondary.main">
              Total: ₹{totalAmount}
            </Typography>
          </Box>
          
          <Button
            variant="contained"
            color="primary"
            size="large"
            disabled={!selectedSeats.length || !selectedTime || !selectedDate || !selectedPlace || loading}
            onClick={handleConfirmBooking}
            sx={{ 
              minWidth: 200,
              height: 50,
              borderRadius: 2,
              fontSize: '1.1rem'
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              'Confirm Booking'
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SeatSelection;