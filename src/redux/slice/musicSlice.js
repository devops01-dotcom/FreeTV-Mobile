import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Request } from '../../services';
import ApiConstant from '../../utils/apiConstant';

const initialState = {
  musicData: '',
  musicFilterData: [],
  musicPage: 1,
  musicCount: 0,
  totalMusicCount: 0,
  musicNextPage: true,
  searchMusicData: [],
  searchMusicPage: 1,
  SearchMusicCount: 0,
  totalSearchMusicCount: 1,
  searchMusicNextPage: true,
  musicLanguageList: [],
  loading: 'idle',
  error: null,
};

export const fetchMusicCategories = createAsyncThunk('MusicCategoriesSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.Music);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchMusic = createAsyncThunk('MusicSlice', async (detail, thunkAPI) => {
  const { id, page } = detail;
  try {
    const response = await Request.get(`${ApiConstant.MusicFilter}${id}/?page=${page}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});  //musicLanguage


export const fetchMusicLanguage = createAsyncThunk('MusicLanguageSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.musicLanguage);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchMusicLanguageFilterData = createAsyncThunk('MusicLanguageFilterDataSlice', async (data, thunkAPI) => {
  const { cid, lid } = data
  try {
    const response = await Request.get(`${ApiConstant.musicLanguageFilter}${cid}/${lid}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});


export const fetchSearchMusic = createAsyncThunk('SearchMusicSlice', async (detail, thunkAPI) => {
  const { name, page, id } = detail
  try {
    const response = await Request.get(`${ApiConstant.SerachMusic}${id}/?title=${name}&page=${page}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

const onMusicSlice = createSlice({
  name: 'MusicSlice',
  initialState,
  reducers: {
    MusicAction(state, action) {
      state.musicData = action.payload;
    },
    clearMusicData(state) {
      state.musicFilterData = [];
      state.musicPage = 1;
      state.musicCount = 0;
      state.totalMusicCount = 0;
      state.musicNextPage = true;
    },
    clearSearchMusicData(state) {
      state.searchMusicData = [];
      state.SearchMusicCount = 0;
      state.searchMusicPage = 1,
      state.totalSearchMusicCount = 1,
      state.searchMusicNextPage = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusicCategories.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchMusicCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.musicData = action.payload?.data.results;
      })
      .addCase(fetchMusicCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      })
      .addCase(fetchMusic.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchMusic.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const musicList = action.payload?.data;
        state.musicCount = musicList.count;
        state.totalMusicCount = musicList.total_count;
        state.musicFilterData = [...state.musicFilterData, ...musicList.results];
        // state.musicFilterData = musicList.results;

        state.musicPage = musicList.current_page_number + 1;
        state.musicNextPage = !!musicList.next;
      })
      .addCase(fetchMusic.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      })

      .addCase(fetchSearchMusic.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSearchMusic.fulfilled, (state, action) => {
        state.loading = 'succeeded';

        const searchMusicList = action.payload?.data;
        if (!searchMusicList) return;

        state.SearchMusicCount = searchMusicList.count;
        state.totalMusicCount = searchMusicList.total_count;
        state.searchMusicPage = searchMusicList.current_page_number + 1;
        state.searchMusicNextPage = !!searchMusicList.next;

        if (searchMusicList.current_page_number === 1) {
          // First page, replace data
          state.searchMusicData = searchMusicList.results;
        } else {
          // Next pages, append data
          state.searchMusicData = [...state.searchMusicData, ...searchMusicList.results];
        }
      })
      .addCase(fetchSearchMusic.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })

      .addCase(fetchMusicLanguage.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchMusicLanguage.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const musicList = action.payload?.data;
        state.musicLanguageList = musicList.results;
      })
      .addCase(fetchMusicLanguage.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      })

      .addCase(fetchMusicLanguageFilterData.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchMusicLanguageFilterData.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const musicList = action.payload?.data;
        // state.searchMusicData = musicList.results;
        // state.musicCount = musicList.count;
        // state.totalMusicCount = musicList.total_count;
        // state.musicFilterData = [...state.musicFilterData, ...musicList.results];
        state.musicFilterData = musicList.results;

        // state.musicPage = musicList.current_page_number + 1;
        // state.musicNextPage = !!musicList.next;
      })
      .addCase(fetchMusicLanguageFilterData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      });
  }
});

export const { MusicAction, clearMusicData, clearSearchMusicData } = onMusicSlice.actions;
export const MusicSelector = ((state) => state.MusicReducer)
export default onMusicSlice.reducer;
