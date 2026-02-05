import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTabId: 0,
  isChannelPlaying: true,
  selectedTabName: ''
};

const FreeTVActionSlice = createSlice({
  name: 'FreeTVAction',
  initialState,
  reducers: {
    setSelectedTabId: (state, action) => {
      state.selectedTabId = action.payload;
    },
    setIsChannelPlaying: (state, action) => {
      state.isChannelPlaying = action.payload;
    },
    setSelectedTabName: (state, action) => {
      state.selectedTabName = action.payload;
    },
  },
});

export const { setSelectedTabId, setIsChannelPlaying, setSelectedTabName } = FreeTVActionSlice.actions;
export default FreeTVActionSlice.reducer;
