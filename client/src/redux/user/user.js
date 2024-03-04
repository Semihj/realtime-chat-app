import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      // Use the spread operator (...) to create a new object:
      return { ...state, currentUser: action.payload };
    },
    signOutSuccess: (state) => {
      // Use the spread operator (...) to create a new object:
      return { ...state, currentUser: null };
    }
  }
});

export const { signInSuccess, signOutSuccess } = userSlice.actions;

export default userSlice.reducer;
