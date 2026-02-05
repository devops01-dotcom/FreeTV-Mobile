import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Request } from '../../services';
import ApiConstant from '../../utils/apiConstant';

const initialState = {
  data: [],
  lastVideoSnapshot: null,
  lastWatchedVideo: [],
  loading: 'idle',
  error: null,
};

export const fetchWatchVideoView = createAsyncThunk(
  'liveTvWatchVideoSlice',
  async (data, thunkAPI) => {
    try {
      const response = await Request.post(ApiConstant.ContinueWatchView, data);
      return { data: response };
    } catch (error) {
      return thunkAPI.rejectWithValue('failed');
    }
  }
);

export const fetchGetWatchVideoView = createAsyncThunk(
  'liveTvGetWatchVideoSlice',
  async (_, thunkAPI) => {
    try {
      const response = await Request.get(ApiConstant.getContinueWatchView);
      return { data: response };
    } catch (error) {
      return thunkAPI.rejectWithValue('failed');
    }
  }
);

export const onWatchVideoSlice = createSlice({
  name: 'WatchVideo',
  initialState,
  reducers: {
    WatchVideoAction(state, action) {
      state.data = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWatchVideoView.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchWatchVideoView.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const WatchVideo = action.payload?.data;
        state.data = WatchVideo.results;
      })
      .addCase(fetchWatchVideoView.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })

      .addCase(fetchGetWatchVideoView.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchGetWatchVideoView.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const WatchLastVideo = action.payload?.data?.li;
        const snapshot = action.payload?.data.s;

        if (WatchLastVideo.length > 0) {
          state.lastWatchedVideo = WatchLastVideo;
        }
        if (snapshot) {
          state.lastVideoSnapshot = `${snapshot}?t=${new Date().getTime()}`;
        }
      })
      .addCase(fetchGetWatchVideoView.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      });
  },
});

export const { WatchVideoAction } = onWatchVideoSlice.actions;
export const WatchVideoSelector = (state) => state.WatchVideoReducer;
export default onWatchVideoSlice.reducer;
