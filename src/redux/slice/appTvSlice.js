import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Request } from '../../services';
import ApiConstant from '../../utils/apiConstant';
import { showToast } from '../../utils/flashMessageAlert';

const initialState = {
  AppTvData: '',
  AppTvDataFilter: [],
  appTvPage: 1,
  appTvCount: 0,
  totalAppTvCount: 0,
  appTvNextPage: true,
  searchAppTvData: [],
  searchAppTvPage: 1,
  searchAppTvCount: 0,
  totalSearchAppTvCount: 1,
  AppTVLanguageList: [],
  searchAppTvNextPage: true,
  selectedAppTVTabName: '',
  loading: 'idle',
  error: null,
};

export const fetchAppTvCategories = createAsyncThunk('AppTvsCategoriesSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.AppTvCategories);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchAppTv = createAsyncThunk('AppTvsSlice', async (detail, thunkAPI) => {
  const { id, page } = detail;
  try {
    const response = await Request.get(`${ApiConstant.AppTvFilter + id}?page=${page}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchSearchAppTv = createAsyncThunk('SearchAppTvSlice', async (detail, thunkAPI) => {
  const { name } = detail;
  try {
    const response = await Request.get(ApiConstant.SerachAppTv + name);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchAddToFavouriteAppTV = createAsyncThunk('addTofavouriteAppTV', async (data, thunkAPI) => {
  try {
    const response = await Request.post(ApiConstant.addFavouriteAppTV, data);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchDeleteToFavouriteAppTV = createAsyncThunk('deleteTofavouriteAppTV', async (data, thunkAPI) => {
  try {
    const response = await Request.del(ApiConstant.addFavouriteAppTV, data);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchAppTvLanguage = createAsyncThunk('AppTvLanguageSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.Apptvlanguges);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchAppTvLanguageFilterData = createAsyncThunk('AppTvLanguageFilterDataSlice', async (data, thunkAPI) => {
  const { cid, gid } = data
  try {
    const response = await Request.get(`${ApiConstant.AppTvLanguageFilter}${cid}/${gid}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

const onAppTvSlice = createSlice({
  name: 'AppTvSlice',
  initialState,
  reducers: {
    AppTvAction(state, action) {
      state.AppTvData = action.payload;
    },
    clearAppTvData(state) {
      state.AppTvDataFilter = [];
      state.appTvPage = 1;
      state.appTvCount = 0;
      state.totalAppTvCount = 0;
      state.appTvNextPage = true;
    },
    clearSearchAppTvData(state) {
      state.searchAppTvData = [];
      state.searchAppTvPage = 1;
      state.searchAppTvCount = 0;
      state.totalSearchAppTvCount = 1;
      state.searchAppTvNextPage = true;
    },
    setAppTvSelectedAppTVTabName(state, action) {
      state.selectedAppTVTabName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppTvCategories.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchAppTvCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.AppTvData = action.payload?.data.results;
      })
      .addCase(fetchAppTvCategories.rejected, (state) => {
        state.loading = 'failed';
      })
      .addCase(fetchAppTv.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchAppTv.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const appTvList = action.payload?.data;
        //  if (appTvList.current_page_number) {
        state.appTvCount = appTvList.count
        state.totalAppTvCount = appTvList.total_count
        if (state.appTvPage === appTvList.current_page_number) {
          if (appTvList.results.favourite) {
            state.AppTvDataFilter = [...state.AppTvDataFilter, ...appTvList.results.favourite.apptv_channels];
          }
          else {
            state.AppTvDataFilter = [...state.AppTvDataFilter, ...appTvList.results.results];
          }
          // }
        }
        state.appTvPage = appTvList.current_page_number + 1;
        if (!appTvList.next) {
          state.appTvNextPage = false
        }
        // }
      })
      // const AppTvList = action.payload?.data;
      // if (AppTvList.current_page_number) {
      //   state.appTvCount = AppTvList.count;
      //   state.totalAppTvCount = AppTvList.total_count;
      //   if (state.appTvPage === AppTvList.current_page_number) {
      //     state.AppTvDataFilter = [...state.AppTvDataFilter, ...(AppTvList.results.favourite ? AppTvList.results.favourite.apptv_channels : AppTvList.results.results)];
      //   }
      //   state.appTvPage = AppTvList.current_page_number + 1;
      //   state.appTvNextPage = !!AppTvList.next;
      // }
      // })
      .addCase(fetchAppTv.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Login failed';
      })
      .addCase(fetchSearchAppTv.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSearchAppTv.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const movieList = action.payload?.data;
        state.searchAppTvCount = movieList.count;
        state.searchAppTvData = movieList.results;
      })
      .addCase(fetchSearchAppTv.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Login failed';
      })
      .addCase(fetchAddToFavouriteAppTV.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchAddToFavouriteAppTV.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        showToast(action.payload.data.message, 'success');
      })
      .addCase(fetchAddToFavouriteAppTV.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Channel failed';
      })
      .addCase(fetchDeleteToFavouriteAppTV.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchDeleteToFavouriteAppTV.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        showToast(action.payload.data.message, 'danger');
      })
      .addCase(fetchDeleteToFavouriteAppTV.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Channel failed';
      })




      .addCase(fetchAppTvLanguage.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchAppTvLanguage.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const appTVLangLisyt = action.payload?.data;
        state.AppTVLanguageList = appTVLangLisyt.results;
      })
      .addCase(fetchAppTvLanguage.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      })

      .addCase(fetchAppTvLanguageFilterData.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchAppTvLanguageFilterData.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const appTVList = action.payload?.data;
        console.log('object====appTVList:', appTVList);
        // state.searchMusicData = appTVList.results;
        // state.musicCount = appTVList.count;
        // state.totalMusicCount = appTVList.total_count;
        // state.musicFilterData = [...state.musicFilterData, ...appTVList.results];
        state.AppTvDataFilter = appTVList.results.results;

        // state.musicPage = musicList.current_page_number + 1;
        // state.musicNextPage = !!musicList.next;
      })
      .addCase(fetchAppTvLanguageFilterData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      });
  },
});

export const { AppTvAction, clearAppTvData, clearSearchAppTvData, setAppTvSelectedAppTVTabName } = onAppTvSlice.actions;
export const AppTVSelector = ((state) => state.AppTVReducer)
export default onAppTvSlice.reducer;
