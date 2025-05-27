import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Divider, Stack, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Movie, Schedule, ConfirmationNumber, EventSeat, LocalAtm } from "@mui/icons-material";

const BrowserSheet = () => {
  const theme = useTheme();
  const location = useLocation();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    if (location.state) {
      localStorage.setItem("bookingDetails", JSON.stringify(location.state));
      setBookingDetails(location.state);
    } else {
      const savedDetails = localStorage.getItem("bookingDetails");
      if (savedDetails) {
        setBookingDetails(JSON.parse(savedDetails));
      }
    }
  }, [location.state]);

  if (!bookingDetails) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">No booking details found.</Typography>
      </Box>
    );
  }

  const { 
    bookingId = "N/A", 
    movieTitle = "Unknown Movie", 
    seats = [], 
    timing = "Not Available", 
    date = "", 
    place = "Not Available", 
    totalAmount = "0.00" 
  } = bookingDetails;

  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : "Invalid Date";

  const qrData = JSON.stringify({
    movieTitle,
    place,
    seats,
    date: formattedDate,
    bookingId
  });
  const downloadTicket = () => {
    const input = document.getElementById("ticket");
    html2canvas(input, { 
      scale: 3,
      backgroundColor: '#0a0a0a', // Match ticket's dark background
      useCORS: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
  
      // Convert pixels to millimeters (1px ≈ 0.264583 mm)
      const pdfWidth = imgWidth * 0.264583;
      const pdfHeight = imgHeight * 0.264583;
  
      const pdf = new jsPDF("p", "mm", [pdfWidth, pdfHeight]);
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.setProperties({
        title: `Ticket-${bookingId}`,
        subject: "Movie Ticket",
      });
      pdf.save(`ticket-${bookingId}.pdf`);
    });
  };
    return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #2b2b2b 0%, #1a1a1a 100%)',
      py: 8
    }}>
      <Box
        id="ticket"
        sx={{
          background: '#0a0a0a',
          borderRadius: 4,
          boxShadow: '0 8px 32px rgba(255, 0, 0, 0.3)',
          width: '400px',
          p: 4,
          position: 'relative',
          overflow: 'hidden',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            height: '15px',
            background: '#ff0000',
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            top: '30%',
            left: '-50px',
            width: '160px',
            height: '160px',
            background: 'rgba(255, 0, 0, 0.05)',
            transform: 'rotate(45deg)'
          }
        }}
      >
        {/* Holographic Stripe */}
        <Box sx={{
          position: 'absolute',
          top: 40,
          right: -40,
          width: '120px',
          height: '120px',
          background: 'linear-gradient(45deg, transparent 40%, rgba(255, 255, 255, 0.2) 50%, transparent 60%)',
          transform: 'rotate(45deg)',
          opacity: 0.6
        }} />

        {/* Header Section */}
        <Box textAlign="center" mb={3} position="relative" zIndex={1}>
          <Typography variant="h4" sx={{
            fontWeight: 'bold',
            color: '#ff0000',
            mb: 1,
            letterSpacing: 1.5,
            textShadow: '0 2px 4px rgba(255, 0, 0, 0.3)'
          }}>
            FindYourSeat
          </Typography>
          <Typography variant="subtitle2" color="#aaa">
            E-Ticket 
          </Typography>
        </Box>

        <Divider sx={{ borderColor: '#ff000055', my: 3 }} />

        {/* Movie Details */}
        <Stack spacing={2} mb={4} position="relative" zIndex={1}>
          <DetailItem icon={<Movie />} title="Movie" value={movieTitle} />
          <DetailItem icon={<Schedule />} title="Date & Time" value={`${formattedDate} • ${timing}`} />
          <DetailItem icon={<ConfirmationNumber />} title="Venue" value={place} />
          <DetailItem icon={<EventSeat />} title="Seats" value={seats.join(", ")} />
          <DetailItem icon={<LocalAtm />} title="Total Amount" value={`₹${totalAmount}`} bold />
        </Stack>

        {/* QR Code Section */}
        <Box sx={{
          textAlign: 'center',
          mt: 4,
          p: 2,
          backgroundColor: '#111',
          borderRadius: 2,
          border: `2px solid #ff0000`,
          position: 'relative',
          zIndex: 1
        }}>
          <Typography variant="body2" sx={{ mb: 2, fontWeight: 500, color: '#ff0000' }}>
            SCAN FOR ENTRY
          </Typography>
          <Box sx={{
            display: 'inline-block',
            p: 1,
            backgroundColor: '#000',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(255, 0, 0, 0.2)'
          }}>
            <QRCodeCanvas 
              value={qrData} 
              size={140} 
              level="H" 
              includeMargin={true}
              fgColor="#ff0000"
              bgColor="white"
            />
          </Box>
        </Box>

        {/* Footer Note */}
        <Typography variant="caption" color="#666" sx={{
          display: 'block',
          mt: 3,
          textAlign: 'center',
          fontStyle: 'italic',
          position: 'relative',
          zIndex: 1
        }}>
          * Valid ID required for entry. No refunds permitted.
        </Typography>

        {/* Decorative Elements */}
        <Box sx={{
          position: 'absolute',
          bottom: -50,
          right: -50,
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, rgba(255,0,0,0.1) 0%, rgba(255,0,0,0) 70%)',
          borderRadius: '50%'
        }} />
      </Box>

      {/* Download Button */}
      <Button
        variant="contained"
        size="large"
        onClick={downloadTicket}
        sx={{
          mt: 4,
          px: 6,
          py: 1.5,
          borderRadius: 2,
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontSize: '1rem',
          background: 'linear-gradient(45deg, #ff0000 30%, #b30000 90%)',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 16px rgba(255, 0, 0, 0.3)',
            background: 'linear-gradient(45deg, #ff2222 30%, #cc0000 90%)'
          },
          transition: 'all 0.3s ease',
          letterSpacing: 1.1
        }}
      >
        Download Ticket
      </Button>
    </Box>
  );
};

const DetailItem = ({ icon, title, value, bold = false }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <Box sx={{
      backgroundColor: '#ff0000',
      borderRadius: 1,
      p: 1.5,
      display: 'flex',
      color: '#fff',
      boxShadow: '0 2px 8px rgba(255, 0, 0, 0.3)'
    }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="caption" color="#aaa">{title}</Typography>
      <Typography variant="body1" sx={{ 
        fontWeight: bold ? 700 : 500,
        color: bold ? '#ff0000' : '#fff',
        letterSpacing: bold ? 0.5 : 0.3
      }}>
        {value}
      </Typography>
    </Box>
  </Box>
);

export default BrowserSheet;