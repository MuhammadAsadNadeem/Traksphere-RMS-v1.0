import { createSlice } from "@reduxjs/toolkit";
import authThunk from "./authThunk";
import userThunk from "./userThunk";
import { ProfileType, RouteType } from "../../types/user.types";


type UserSliceType = {
    token: string | null;
    user: { id: string; name: string; email: string } | null; // Replace with actual user type
    profile: ProfileType | null;
    isSuperUser: boolean;
    isLoading: boolean;
    routes: RouteType[];
    error: string | null;

};

const initialState: UserSliceType = {
    token: localStorage.getItem("token") || null,
    user: null,
    profile: null,
    isSuperUser: false,
    routes: [],
    isLoading: false,

    error: null,
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.profile = null;
            state.routes = [];
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
            }
        });
        builder.addCase(authThunk.login.rejected, (state, { error }) => {
            state.isLoading = false;
            state.error = error.message || "Login failed";
        });

        // Update Profile
        builder.addCase(userThunk.updateProfile.fulfilled, (state, { payload }) => {
            if (payload) {
                state.profile = payload;
            }
        });

        // Get Profile
        builder.addCase(userThunk.getProfile.fulfilled, (state, { payload }) => {
            if (payload) {
                state.profile = payload;
            }
        });

        // Check User Role
        builder.addCase(authThunk.checkUserRole.fulfilled, (state, { payload }) => {
            state.isSuperUser = payload;
        });

        // Get Routes
        builder.addCase(userThunk.getAllRoutes.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(userThunk.getAllRoutes.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.routes = payload;
        });
        builder.addCase(userThunk.getAllRoutes.rejected, (state, { error }) => {
            state.isLoading = false;
            state.error = error.message || "Failed to fetch routes";
        });

    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;