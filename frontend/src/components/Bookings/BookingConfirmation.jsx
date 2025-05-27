import React, { useEffect, useState } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Divider, 
  Grid,
  useTheme,
  IconButton 
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BookingConfirmation = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    if (location.state) {
      setBookingDetails(location.state);
      localStorage.setItem("bookingDetails", JSON.stringify(location.state));
    } else {
      const storedDetails = localStorage.getItem("bookingDetails");
      if (storedDetails) setBookingDetails(JSON.parse(storedDetails));
    }
  }, [location.state]);

  if (!bookingDetails) {
    return (
      <Box textAlign="center" mt={10}>
        <Box mb={4}>
          <Typography variant="h4" color="textSecondary" gutterBottom>
            No Booking Found
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Please start a new booking process
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<HomeIcon />}
          onClick={() => navigate("/")}
          sx={{ 
            borderRadius: '25px',
            px: 4,
            py: 1.5,
            textTransform: 'none'
          }}
        >
          Return to Home
        </Button>
      </Box>
    );
  }

  const { bookingId, movieTitle, seats, timing, date, place, totalAmount } = bookingDetails;

  const formatDate = (dateString) => {
    const options = { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      py: 8,
      px: 2,
      backgroundColor: theme.palette.background.default
    }}>
      <IconButton 
        sx={{ alignSelf: 'flex-start', mb: 2 }} 
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon fontSize="large" />
      </IconButton>

      <CheckCircleIcon 
        sx={{ 
          fontSize: 80, 
          color: theme.palette.success.main,
          mb: 4 
        }} 
      />

      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 700, 
          mb: 4,
          color: theme.palette.primary.main,
          textAlign: 'center'
        }}
      >
        Booking Confirmed!
      </Typography>

      <Card sx={{ 
        width: '100%', 
        maxWidth: 600, 
        borderRadius: 4,
        boxShadow: 3,
        mb: 4
      }}>
        <CardContent>
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 600, 
              mb: 3,
              color: theme.palette.secondary.main
            }}
          >
            {movieTitle}
          </Typography>

          <Grid container spacing={3} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Venue
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {place}
              </Typography>
            </Grid>
            
            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Date
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {formatDate(date)}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Time
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {timing}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="body2" color="textSecondary">
                Seats
              </Typography>
              <Typography variant="body1" fontWeight={500}>
                {Array.isArray(seats) ? seats.join(", ") : "N/A"}
              </Typography>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <Typography variant="h6">
              Total Amount:
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                color: theme.palette.success.dark
              }}
            >
              ₹{totalAmount}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        size="large"
        startIcon={<PaymentIcon />}
        onClick={() => navigate("/payment", { state: bookingDetails })}
        sx={{
          px: 6,
          py: 1.5,
          borderRadius: '12px',
          textTransform: 'none',
          fontSize: '1.1rem',
          boxShadow: 3,
          '&:hover': {
            transform: 'translateY(-2px)',
            transition: 'transform 0.2s'
          }
        }}
      >
        Proceed to Secure Payment
      </Button>

      <Typography 
        variant="body2" 
        sx={{ 
          mt: 4,
          color: theme.palette.text.secondary,
          textAlign: 'center',
          maxWidth: 500
        }}
      >
        Your seats are temporarily reserved. Complete payment within 10 minutes to confirm your booking.
      </Typography>
    </Box>
  );
};

export default BookingConfirmation;