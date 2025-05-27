import axios from "axios";

const BASE_URL = "https://moviebackend-ude7.onrender.com";

// Get all movies
export const getAllMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/movie`);
    return res.data;
  } catch (err) {
    console.error("Error fetching movies:", err.response?.data || err.message);
  }
};

// User signup/login
export const sendUserAuthRequest = async (data, signup) => {
  try {
    const res = await axios.post(`${BASE_URL}/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    });

    const resData = res.data;

    if (resData?.user?._id) {
      localStorage.setItem("userId", resData.user._id);
      console.log("User ID stored:", resData.user._id);
    } else {
      console.error("User ID not found in response!");
    }

    return resData;
  } catch (err) {
    console.log("Auth Error:", err.response?.data || err.message);
  }
};

// Admin login
export const sendAdminAuthRequest = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/admin/login`, {
      email: data.email,
      password: data.password,
    });

    return res.data;
  } catch (err) {
    console.log("Admin Auth Error:", err.response?.data || err.message);
  }
};

// Get movie details by ID
export const getMovieDetails = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${id}`);
    const movieData = res.data;

    if (movieData?.movie?.title) {
      localStorage.setItem("movieTitle", movieData.movie.title);
    }

    return movieData;
  } catch (err) {
    console.error("Error fetching movie details:", err.response?.data || err.message);
    return null;
  }
};

// Book seats for a movie
export const bookSeats = async (movieid, data) => {
  try {
    const res = await axios.post(`${BASE_URL}/booking/${movieid}`, data);
    console.log("Booking API Response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Error booking seats:", err.response?.data || err.message);
    throw err;
  }
};

// Generate invoice
export const generateInvoice = async (bookingId, userId, movieName, seats, totalAmount, qrCode) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/invoices/generate/${bookingId}`, {
      userId,
      movieName,
      seats,
      totalAmount,
      qrCode,
    });
    return response.data;
  } catch (error) {
    console.error("Invoice Generation Error:", error.response?.data || error.message);
    return null;
  }
};

// Get invoice by ID
export const getInvoiceById = async (invoiceId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/invoices/${invoiceId}`);
    return response.data.invoice;
  } catch (error) {
    console.error("Error fetching invoice:", error.response?.data || error.message);
    return null;
  }
};

export default {
  sendUserAuthRequest,
  bookSeats,
  getAllMovies,
  getMovieDetails,
  sendAdminAuthRequest,
  getInvoiceById,
  generateInvoice,
};
