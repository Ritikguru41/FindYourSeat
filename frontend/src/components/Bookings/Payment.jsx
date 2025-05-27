import React, { useState } from "react";
import { 
  Box, Typography, Button, TextField, InputAdornment,
  ToggleButtonGroup, ToggleButton, Divider, useTheme,
  Select, MenuItem
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CreditCard, AccountBalanceWallet, 
  Payment as PaymentIcon, CardMembership, Smartphone
} from "@mui/icons-material";

const Payment = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [upiApp, setUpiApp] = useState("gpay");
  const [upiID, setUpiID] = useState("");

  const handlePayment = () => {
    if (paymentMethod === "upi" && !upiID.includes("@")) {
      alert("Please enter a valid UPI ID.");
      return;
    }
    if (paymentMethod === "card" && cardNumber.length < 14) {
      alert("Please enter a valid 12-digit Card Number.");
      return;
    }
    localStorage.setItem("bookingDetails", JSON.stringify(bookingData));
    navigate("/browser-sheet", { state: bookingData });
  };

  const handleCardInput = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    value = value.replace(/(.{4})/g, "$1 ").trim().substring(0, 14);
    setCardNumber(value);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" minHeight="100vh" p={3}>
      <Box width="100%" maxWidth="500px">
        <Typography variant="h4" fontWeight="700" color="primary" gutterBottom>
          <PaymentIcon sx={{ verticalAlign: 'middle', mr: 1, fontSize: 32 }} />
          Payment Gateway
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Box bgcolor={theme.palette.background.paper} p={4} borderRadius={4} boxShadow={3}>
          <Typography variant="h5" fontWeight="600" color="text.secondary" gutterBottom>
            Total Amount: 
            <Box component="span" color="primary.main" ml={1}>
              ₹{bookingData.totalAmount || "0.00"}
            </Box>
          </Typography>

          <ToggleButtonGroup
            color="primary"
            value={paymentMethod}
            exclusive
            onChange={(e, newMethod) => newMethod && setPaymentMethod(newMethod)}
            fullWidth
            sx={{ my: 3 }}
          >
            <ToggleButton value="card" sx={{ py: 2 }}>
              <CreditCard sx={{ mr: 1 }} />
              Credit/Debit Card
            </ToggleButton>
            <ToggleButton value="upi" sx={{ py: 2 }}>
              <Smartphone sx={{ mr: 1 }} />
              UPI
            </ToggleButton>
          </ToggleButtonGroup>

          {paymentMethod === "card" && (
            <TextField
              fullWidth
              label="Card Number"
              variant="outlined"
              value={cardNumber}
              onChange={handleCardInput}
              placeholder="0000 0000 0000 0000"
              inputProps={{ maxLength: 19 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CardMembership color="action" />
                  </InputAdornment>
                )
              }}
              sx={{ mb: 2 }}
            />
          )}

          {paymentMethod === "upi" && (
            <>
              <Select 
                fullWidth 
                value={upiApp} 
                onChange={(e) => setUpiApp(e.target.value)}
                sx={{ mb: 2 }}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountBalanceWallet />
                  </InputAdornment>
                }
              >
                <MenuItem value="gpay">Google Pay</MenuItem>
                <MenuItem value="phonepe">PhonePe</MenuItem>
                <MenuItem value="paytm">Paytm</MenuItem>
              </Select>
              <TextField
                fullWidth
                label="UPI ID"
                variant="outlined"
                placeholder="yourname@upi"
                value={upiID}
                onChange={(e) => setUpiID(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography variant="body1" color="text.secondary">@</Typography>
                    </InputAdornment>
                  )
                }}
              />
            </>
          )}

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handlePayment}
            sx={{
              mt: 4,
              py: 2,
              borderRadius: 2,
              fontSize: 18,
              fontWeight: 'bold',
              boxShadow: theme.shadows[4],
              '&:hover': {
                boxShadow: theme.shadows[6],
                transform: 'translateY(-1px)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Pay ₹{bookingData.totalAmount || "0.00"}
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" mt={2}>
          <Box component="span" sx={{ color: 'primary.main' }}>🔒 Secure</Box> payment processing
        </Typography>
      </Box>
    </Box>
  );
};

export default Payment;