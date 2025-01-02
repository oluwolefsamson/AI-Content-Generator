import { configureStore } from "@reduxjs/toolkit";
import specialtyReducer from "./userRelated/specialtySlice";

const store = configureStore({
  reducer: {
    specialty: specialtyReducer,
  },
});

export default store;
