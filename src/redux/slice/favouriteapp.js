import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Request } from '../../services';
import ApiConstant from '../../utils/apiConstant';

const initialState = {
  data: [],
  loading: 'idle',
  error: null,
};

export const fetchFavouriteApp = createAsyncThunk(
  'liveTvFavouriteAppSlice',
  async (_, thunkAPI) => {
    try {
      const response = await Request.get(ApiConstant.Ottapp);
      return { data: response };
    } catch (error) {
      return thunkAPI.rejectWithValue('failed');
    }
  }
);

export const onFavouriteAppSlice = createSlice({
  name: 'FavouriteApp',
  initialState,
  reducers: {
    FavouriteAppAction(state, action) {
      state.data = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavouriteApp.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchFavouriteApp.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const favouriteApp = action.payload?.data;
        state.data = favouriteApp.results;
      })
      .addCase(fetchFavouriteApp.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      });
  },
});

export const { FavouriteAppAction } = onFavouriteAppSlice.actions;
export const FavouriteAppSelector = (state) => state.FavouriteAppReducer;
export default onFavouriteAppSlice.reducer;
