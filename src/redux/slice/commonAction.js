import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  freeTvChannelIndex: 0,
  signalStrength: 0,
  signalType: '',
  selectedMovieDetail: '',
  searchQuery: '',
  modalVisible: false,
  selectedCategoriesId: '',
  selectedDevotionalCategoriesId: '',
  selectedDevotionalSubCategoriesId: '',
  selectedEducationCategoriesId: '',
  selectedEducationSubCategoriesId: '',
  selectedMusicCategoriesId: '',
  selectedAppTVCategoriesId: '',
  selectedSubCategoriesId: '',
  selectedGenreName: 'GENRE',
  selectedGenreId: '',
  isArchive: false,
  selectedGridId: '',
  currentAppVersion: '',
  appVersion: '',
  newAppUrl: '',
  showHomeAds: true
};

const CommonActionSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setFreeTvChannelIndex: (state, action) => {
      state.freeTvChannelIndex = action.payload;
    },
    setSignalStrength: (state, action) => {
      state.signalStrength = action.payload;
    },
    setSignalType: (state, action) => {
      state.signalType = action.payload;
    },
    setselectedMovieDetail: (state, action) => {
      state.selectedMovieDetail = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setModalVisible: (state, action) => {
      state.modalVisible = action.payload;
    },
    setSelectedCategoriesId: (state, action) => {
      state.selectedCategoriesId = action.payload;
    },

    setSelectedDevotionalCategoriesId: (state, action) => {
      state.selectedDevotionalCategoriesId = action.payload;
    },
    setSelectedDevotionalSubCategoriesId: (state, action) => {
      state.selectedDevotionalSubCategoriesId = action.payload;
    },
    setSelectedEducationCategoriesId: (state, action) => {
      state.selectedEducationCategoriesId = action.payload;
    },
    setSelectedEducationSubCategoriesId: (state, action) => {
      state.selectedEducationSubCategoriesId = action.payload;
    },

    setSelectedMusicCategoriesId: (state, action) => {
      state.selectedMusicCategoriesId = action.payload;
    },

      setSelectedAppTVCategoriesId: (state, action) => {
      state.selectedAppTVCategoriesId = action.payload;
    },

    setSelectedSubCategoriesId: (state, action) => {
      state.selectedSubCategoriesId = action.payload;
    },
    setSelectedGenreName: (state, action) => {
      state.selectedGenreName = action.payload;
    },
    setSelectedGenreId: (state, action) => {
      state.selectedGenreId = action.payload;
    },
    clearGenreDetail: (state) => {
      state.selectedGenreId = '';
      state.selectedGenreName = 'GENRE';
    },
    setIsArchiveItem: (state, action) => {
      state.isArchive = action.payload;
    },
    setSelectedGridId: (state, action) => {
      state.selectedGridId = action.payload;
    },
    setNewAppDetail: (state, action) => {
      state.currentAppVersion = action.payload.currentAppVersion || '';
      state.appVersion = action.payload.appVersion || '';
      state.newAppUrl = action.payload.newAppUrl || '';
    },
    setShowHomeAds: (state, action) => {
      state.showHomeAds = action.payload;
    },
  },
});

export const {
  setFreeTvChannelIndex,
  setSignalStrength,
  setSignalType,
  setselectedMovieDetail,
  setSearchQuery,
  setModalVisible,
  setSelectedCategoriesId,
  setSelectedDevotionalCategoriesId,
  setSelectedDevotionalSubCategoriesId,
  setSelectedEducationCategoriesId,
  setSelectedEducationSubCategoriesId,
  setSelectedMusicCategoriesId,
  setSelectedAppTVCategoriesId,
  setSelectedSubCategoriesId,
  setSelectedGenreName,
  setSelectedGenreId,
  clearGenreDetail,
  setIsArchiveItem,
  setSelectedGridId,
  setNewAppDetail,
  setShowHomeAds
} = CommonActionSlice.actions;

export default CommonActionSlice.reducer;
