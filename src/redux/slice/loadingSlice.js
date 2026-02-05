import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  signalStrength: 0,
  signalType: '',
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isLoading = true;
    },
    hideLoader: (state) => {
      state.isLoading = false;
    },
    setSignalStrength: (state, action) => {
      state.signalStrength = action.payload;
    },
    setSignalType: (state, action) => {
      state.signalType = action.payload;
    },
  },
});

export const { showLoader, hideLoader, setSignalStrength, setSignalType } = loaderSlice.actions;
export const selectLoader = (state) => state.loading.isLoading;
export default loaderSlice.reducer;
