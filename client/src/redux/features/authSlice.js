import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

const tokenFromStorage = localStorage.getItem("token")
    ? localStorage.getItem("token")
    : null;

const initialState = {
    user: userFromStorage,     // { userId, role }
    token: tokenFromStorage,    // access token
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            // optionally save to localStorage
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            localStorage.setItem("token", action.payload.token);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
});

export const { login, logout } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.user;
export const selectUserRole = (state) => state.auth.user?.role;
export default authSlice.reducer;
