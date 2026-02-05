import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Request } from '../../services';
import ApiConstant from '../../utils/apiConstant';

const initialState = {
  educational: [],
  educationalSubcategories: [],
  educationalChannelData: [],
  educationalSearchData: [],
  educationalPage: 1,
  educationalCount: 0,
  totalEducationalCount: 0,
  educationalNextPage: true,
  loading: 'idle',
  error: null,
};

export const fetchEducationalCategories = createAsyncThunk('EducationalCategoriesSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.educational);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchEducationalSubCategories = createAsyncThunk('EducationalSubCategoriesSlice', async (data, thunkAPI) => {
  const { id, page } = data;
  try {
    const response = await Request.get(`${ApiConstant.educationalSubCategories}${id}/?page=${page}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchEducationalcontent = createAsyncThunk('EducationallivecontentSlice', async (data, thunkAPI) => {
  const { cid, sid, page } = data;
  try {
    const response = await Request.get(`${ApiConstant.educationallivecontent}${cid}/${sid}/?page=${page}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchSearchEducational = createAsyncThunk('SearchEducationalSlice', async (detail, thunkAPI) => {
  const { cid, sid, name } = detail
  try {
    const response = await Request.get(`${ApiConstant.searchEducational}${cid}/${sid}/?title=${name}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
},
);

const onEducationSlice = createSlice({
  name: 'Educationallice',
  initialState,
  reducers: {
    EducationAction(state, action) {
      state.educational = action.payload;
    },
    resetEducationData(state) {
      state.educationalPage = 1;
      state.educationalChannelData = [];
      state.educationalCount = 0;
      state.totalEducationalCount = 0;
      state.educationalNextPage = true;
    },
    clearSearchEducationData(state) {
      state.educationalSearchData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducationalCategories.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEducationalCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.educational = action.payload?.data.results;
      })
      .addCase(fetchEducationalCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      })
      .addCase(fetchEducationalSubCategories.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEducationalSubCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.educationalSubcategories = action.payload?.data.results;
      })
      .addCase(fetchEducationalSubCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      })
      .addCase(fetchSearchEducational.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSearchEducational.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.educationalSearchData = action.payload?.data.results;
      })
      .addCase(fetchSearchEducational.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      })
      .addCase(fetchEducationalcontent.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchEducationalcontent.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const educationalList = action.payload?.data;
        state.educationalCount = educationalList.count;
        state.totalEducationalCount = educationalList.total_count;
        state.educationalChannelData = educationalList.results;
        // state.educationalChannelData = [...state.educationalChannelData, ...educationalList.results];
        state.educationalPage = educationalList.current_page_number + 1;
        state.educationalNextPage = !!educationalList.next;
      })
      .addCase(fetchEducationalcontent.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Request failed';
      });
  },
});

export const { EducationAction, resetEducationData, clearSearchEducationData } = onEducationSlice.actions;
export const EducationSelector = ((state) => state.EducationReducer)
export default onEducationSlice.reducer;
