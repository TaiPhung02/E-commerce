import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUser(state, action) {
            let username = JSON.parse(localStorage.getItem("user"));
        },
    },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
