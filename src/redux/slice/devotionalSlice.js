import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Request } from '../../services';
import ApiConstant from '../../utils/apiConstant';

const initialState = {
  devotional: [],
  devotionalSubcategories: [],
  devotionalChannelData: [],
  devotionalSearchData: [],
  devotionalPage: 1,
  devotionalCount: 0,
  totalDevotionalCount: 0,
  devotionalNextPage: true,
  devotionalArchiveData: [],
  devotionalLiveData: [],
  loading: 'idle',
  error: null,
};

export const fetchDevotionalCategories = createAsyncThunk('DevotionalCategoriesSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.devotional);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchDevotionalSubCategories = createAsyncThunk('DevotionalSubCategoriesSlice', async (data, thunkAPI) => {
   const { id, page } = data;
  try {
    // const response = await Request.get(`${ApiConstant.devotionalSubCategories}${id}`);
    const response = await Request.get(`${ApiConstant.devotionalSubCategories}${id}/?page=${page}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchDevotionallivecontent = createAsyncThunk('devotionallivecontentSlice', async (data, thunkAPI) => {
  const { cid, sid, page } = data;
  try {
    const response = await Request.get(`${ApiConstant.devotionallivecontent}${cid}/${sid}/?page=${page}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchSearchDevotional = createAsyncThunk('SearchDevotionalSlice', async (detail, thunkAPI) => {
     const {cid, sid, name} = detail
  try {
     const response = await Request.get(`${ApiConstant.searchDevotional}${cid}/${sid}/?title=${name}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchDevotionalArchive = createAsyncThunk('DevotionalArchiveSlice', async (id, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.devotionalSarchivecontent + id);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const onDevotionalSlice = createSlice({
  name: 'DevotionalSlice',
  initialState,
  reducers: {
    DevotionalAction(state, action) {
      state.devotional = action.payload;
    },
    resetDevotionalData(state) {
      state.devotionalPage = 1;
      state.devotionalChannelData = [];
      state.devotionalCount = 0;
      state.totalDevotionalCount = 0;
      state.devotionalNextPage = true;
    },
    clearSearchDevotionalData(state) {
      state.devotionalSearchData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevotionalCategories.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchDevotionalCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.devotional = action.payload?.data.results;
      })
      .addCase(fetchDevotionalCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      })
      .addCase(fetchDevotionalSubCategories.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchDevotionalSubCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.devotionalSubcategories = action.payload?.data.results;
      })
      .addCase(fetchDevotionalSubCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      })

     .addCase(fetchSearchDevotional.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSearchDevotional.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const devotionalList = action.payload?.data;
        state.devotionalSearchData = devotionalList.results;
      })
      .addCase(fetchSearchDevotional.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      }) 

      .addCase(fetchDevotionallivecontent.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchDevotionallivecontent.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const devotionalList = action.payload?.data;
        state.devotionalCount = devotionalList.count;
        state.totalDevotionalCount = devotionalList.total_count;
        // state.devotionalChannelData = [...state.devotionalChannelData, ...devotionalList.results];
        state.devotionalChannelData = devotionalList.results;

        state.devotionalPage = devotionalList.current_page_number + 1;
        state.devotionalNextPage = !!devotionalList.next;
      })
      .addCase(fetchDevotionallivecontent.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      })
      .addCase(fetchDevotionalArchive.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchDevotionalArchive.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.devotionalArchiveData = action.payload?.data.results;
      })
      .addCase(fetchDevotionalArchive.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      });
  },
});

export const { DevotionalAction, resetDevotionalData, clearSearchDevotionalData } = onDevotionalSlice.actions;
export const DevotionalSelector = ((state) => state.DevotionalReducer)
export default onDevotionalSlice.reducer;
