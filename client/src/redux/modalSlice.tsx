import { createSlice } from "@reduxjs/toolkit";

export type ModalsState = {
  isSettings: boolean;
};

const initialState = {
  isSettings: false,
};

const modalSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openSettings: (state) => {
      state.isSettings = true;
    },
    closeSettings: (state) => {
      state.isSettings = false;
    },
    toggleSettings: (state) => {
      state.isSettings = !state.isSettings;
    },
  },
});

export const { openSettings, closeSettings, toggleSettings } = modalSlice.actions;

const modalsReducers = modalSlice.reducer;

export default modalsReducers;
