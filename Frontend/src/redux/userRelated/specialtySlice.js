import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk for generating content
export const generateContent = createAsyncThunk(
  "specialty/generateContent",
  async (specialty, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/content/generate",
        { specialty }
      );
      if (response.data.success) {
        return response.data.data;
      } else {
        return rejectWithValue("Failed to fetch content. Please try again.");
      }
    } catch (error) {
      return rejectWithValue("An error occurred while fetching content.");
    }
  }
);

const specialtySlice = createSlice({
  name: "specialty",
  initialState: {
    selectedSpecialty: "",
    generatedContent: "",
    loading: false,
    error: "",
  },
  reducers: {
    setSelectedSpecialty(state, action) {
      state.selectedSpecialty = action.payload;
      state.generatedContent = "";
      state.error = "";
    },
    clearGeneratedContent(state) {
      state.generatedContent = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateContent.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(generateContent.fulfilled, (state, action) => {
        state.loading = false;
        state.generatedContent = action.payload;
      })
      .addCase(generateContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedSpecialty, clearGeneratedContent } =
  specialtySlice.actions;
export default specialtySlice.reducer;
