import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api/auth"; // Replace with your backend URL

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      return response.data; // { token, user }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to register user"
      );
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, credentials);
      return response.data; // { token, user }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.msg || "Failed to login user"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Stores the user object (including userId, username, etc.)
    token: null, // Stores the JWT token
    userId: null, // Added userId to store the user ID
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null; // Clear userId on logout
      localStorage.removeItem("token"); // Clear token from localStorage on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user; // Save the user object from response
        state.token = action.payload.token; // Save the token
        state.userId = action.payload.user.userId; // Save the userId from the response
        localStorage.setItem("token", action.payload.token); // Store token in localStorage
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user; // Save the user object from response
        state.token = action.payload.token; // Save the token
        state.userId = action.payload.user.userId; // Save the userId from the response
        localStorage.setItem("token", action.payload.token); // Store token in localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
