// src/redux/slices/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import authThunk from "./authThunk";

type AuthState = {
    token: string | null;
    user: { id: string; name: string; email: string } | null;
    isSuperUser: boolean;
    isLoading: boolean;
    error: string | null;
};

const initialState: AuthState = {
    token: localStorage.getItem("token") || null,
    user: null,
    isSuperUser: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isSuperUser = false;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(authThunk.login.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(authThunk.login.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload) {
                state.token = payload.token;
                state.user = payload.user;
                localStorage.setItem("token", payload.token);
            }
        });
        builder.addCase(authThunk.login.rejected, (state, { error }) => {
            state.isLoading = false;
            state.error = error.message || "Login failed";
        });

        // Check User Role
        builder.addCase(authThunk.checkUserRole.fulfilled, (state, { payload }) => {
            state.isSuperUser = payload;
        });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
