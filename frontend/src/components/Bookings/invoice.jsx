import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { generateInvoice } from "../../api-helpers/api-helpers";
import axios from "axios"; // Import axios

const Invoice = () => {
  const { bookingId } = useParams(); // Get bookingId from URL
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    console.log("Booking ID received:", bookingId); // Debugging

    if (bookingId) {
      generateInvoice(bookingId)
        .then(response => {
          console.log("Booking Data:", response);
          setBookingData(response);
        })
        .catch(error => {
          console.error("Error fetching booking:", error);
        });
    } else {
      console.error("Error: bookingId is undefined or null");
    }
  }, [bookingId]);

  if (!bookingData) {
    return <p>Loading invoice...</p>;
  }

  return (
    <div>
      <h2>Find Your Seat</h2>
      <p><strong>Movie:</strong> {bookingData.movie?.title || "Unknown"}</p>
      <p><strong>Seats:</strong> {bookingData.seats?.join(", ") || "None"}</p>
    </div>
  );
};

export default Invoice;