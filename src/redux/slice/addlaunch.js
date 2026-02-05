import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiConstant from '../../utils/apiConstant';
import { Request } from '../../services';

const initialState = {
  data: '',
  liveAdds: null,
  livePreviewAdds: null,
  loading: 'idle',
  error: null,
};

export const fetchAddlaunch = createAsyncThunk('liveTvHomeAddlaunchSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.HomeAddView);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchLiveAddlaunch = createAsyncThunk('liveTvAddlaunchSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.LiveAddView);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchLivePreviewAddlaunch = createAsyncThunk('liveTvPreviewAddlaunchSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.LivePreviewAddView);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

const onAddlaunchSlice = createSlice({
  name: 'Addlaunch',
  initialState,
  reducers: {
    AddlaunchAction(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddlaunch.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchAddlaunch.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload?.data?.results;
      })
      .addCase(fetchAddlaunch.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Login failed';
      })
      .addCase(fetchLiveAddlaunch.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchLiveAddlaunch.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.liveAdds = action.payload?.data?.results;
      })
      .addCase(fetchLiveAddlaunch.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Login failed';
      })
      .addCase(fetchLivePreviewAddlaunch.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchLivePreviewAddlaunch.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.livePreviewAdds = action.payload?.data?.results;
      })
      .addCase(fetchLivePreviewAddlaunch.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { AddlaunchAction } = onAddlaunchSlice.actions;
export const AddlaunchSelector = (state) => state.AddlaunchReducer;
export default onAddlaunchSlice.reducer;
