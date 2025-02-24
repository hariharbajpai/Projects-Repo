import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null
    },
    reducers: {
        // Actions
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

// Correct export
export const { setLoading, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer; // Named export
