import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies/Movies";
import Admin from "./components/Auth/Admin";
import Auth from "./components/Auth/Auth";
import Booking from "./components/Bookings/Booking";
import Header from "./components/Header";
// import SeatSelection from "./components/Bookings/SelectSeat";
import SeatSelection from "./components/Bookings/SelectSeat";
import Payment from "./components/Bookings/Payment";
import BookingConfirmation from "./components/Bookings/BookingConfirmation";
import BrowserSheet from "./components/Bookings/BrowserSheet";

function App() {
  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/book/:id" element={<SeatSelection />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/browser-sheet" element={<BrowserSheet />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;