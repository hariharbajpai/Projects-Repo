import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice"; // Ensure correct import

const store = configureStore({
    reducer: {
        auth: authReducer, // Correct reference
    },
});

export default store;
