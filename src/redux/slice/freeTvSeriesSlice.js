import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Request } from '../../services';
import ApiConstant from '../../utils/apiConstant';

const initialState = {
  seriesData: [],
  FreeTvSeriesData: [],
  SeriesPage: 1,
  seriesCount: 0,
  totalSeriesCount: 0,
  SeriesNextPage: true,
  searchSeriesData: [],
  searchSeriesCount: 0,
  freeTvEpisode: [],
  loading: 'idle',
  error: null,
};

export const fetchFreeTvSeriesCategories = createAsyncThunk(
  'FreeTvSeriessCategoriesSlice',
  async (_, thunkAPI) => {
    try {
      const response = await Request.get(ApiConstant.FreeTvSeries);
      return { data: response };
    } catch (error) {
      return thunkAPI.rejectWithValue('failed');
    }
  }
);

export const fetchFreeTvSeries = createAsyncThunk(
  'FreeTvSeriessSlice',
  async (detail, thunkAPI) => {
    const { id, page } = detail;
    try {
      const response = await Request.get(`${ApiConstant.FreeTvSeriesFilter + id}?page=${page}`);
      return { data: response };
    } catch (error) {
      return thunkAPI.rejectWithValue('failed');
    }
  }
);

export const fetchFreeTvSeriesEpisode = createAsyncThunk(
  'FreeTvSeriessEpisodeSlice',
  async (id, thunkAPI) => {
    try {
      const response = await Request.get(ApiConstant.FreeTvSeriesEpisode + id);
      return { data: response };
    } catch (error) {
      return thunkAPI.rejectWithValue('failed');
    }
  }
);

export const fetchSearchSeries = createAsyncThunk(
  'SearchSeriesSlice',
  async (detail, thunkAPI) => {
    const { name, page } = detail;
    try {
      const response = await Request.get(ApiConstant.SearchSeries + name);
      return { data: response };
    } catch (error) {
      return thunkAPI.rejectWithValue('failed');
    }
  }
);

export const onFreeTvSeriesSlice = createSlice({
  name: 'FreeTvSeriesSlice',
  initialState,
  reducers: {
    FreeTvSeriesAction(state, action) {
      state.seriesData = action.payload;
    },
    clearSeriesData(state) {
      state.seriesData = [];
      state.SeriesPage = 1;
      state.SeriesNextPage = true;
      state.seriesCount = 0;
      state.totalSeriesCount = 0;
    },
    clearSearchSeriesData(state) {
      state.searchSeriesData = [];
      state.searchSeriesCount = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFreeTvSeriesCategories.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchFreeTvSeriesCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.FreeTvSeriesData = action.payload?.data.results;
      })
      .addCase(fetchFreeTvSeriesCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      })
      .addCase(fetchFreeTvSeries.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchFreeTvSeries.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const FreeTvSeriesList = action.payload?.data;
        state.seriesCount = FreeTvSeriesList.count;
        state.totalSeriesCount = FreeTvSeriesList.total_count;
        state.seriesData = [...state.seriesData, ...FreeTvSeriesList.results];
        state.SeriesPage = FreeTvSeriesList.current_page_number + 1;
        if (!FreeTvSeriesList.next) {
          state.SeriesNextPage = false;
        }
      })
      .addCase(fetchFreeTvSeries.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      })
      .addCase(fetchFreeTvSeriesEpisode.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchFreeTvSeriesEpisode.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.freeTvEpisode = action.payload?.data.results;
      })
      .addCase(fetchFreeTvSeriesEpisode.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      })
      .addCase(fetchSearchSeries.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSearchSeries.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const movieList = action.payload?.data;
        state.searchSeriesCount = movieList.count;
        state.searchSeriesData = movieList.results;
      })
      .addCase(fetchSearchSeries.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      });
  }
});

export const { FreeTvSeriesAction, clearSeriesData, clearSearchSeriesData } = onFreeTvSeriesSlice.actions;
export const FreeTvSeriesSelector = ((state) => state.FreeTvSeriesReducer)
export default onFreeTvSeriesSlice.reducer;
