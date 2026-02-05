import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Request } from '../../services';
import ApiConstant from '../../utils/apiConstant';

const initialState = {
  bootupData: null,
  bootupEducationData: null,
  bootupDevotionalData: null,
  loading: 'idle',
  error: null,
};

export const fetchBootupAdView = createAsyncThunk('BootupAdViewSlice', async (_, thunkAPI) => {
  try {
    // const response = await Request.get(ApiConstant.bootupadview);
    const response = await Request.get(`${ApiConstant.bootupadview}?app_type=FREETVMOB&add_type=Bootup` );
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchBootupEducationAdView = createAsyncThunk('BootupEducationAdViewSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.EducationView);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchBootupDevotionalAdView = createAsyncThunk('BootupDevotionalAdViewSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.DevotionalView);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const onBootupAdViewSlice = createSlice({
  name: 'BootupAdView',
  initialState,
  reducers: {
    BootupAdViewAction(state, action) {
      state.bootupData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBootupAdView.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchBootupAdView.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.bootupData = action.payload.results[0];
      })
      .addCase(fetchBootupAdView.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      })
      
      .addCase(fetchBootupEducationAdView.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchBootupEducationAdView.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.bootupEducationData = action.payload.results[0];
      })
      .addCase(fetchBootupEducationAdView.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      })
      
      .addCase(fetchBootupDevotionalAdView.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchBootupDevotionalAdView.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.bootupDevotionalData = action.payload.results[0];
      })
      .addCase(fetchBootupDevotionalAdView.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      });
  },
});

export const { BootupAdViewAction } = onBootupAdViewSlice.actions;
export const BootupAdViewSelector = (state) => state.BootupAdViewReducer;
export default onBootupAdViewSlice.reducer;
