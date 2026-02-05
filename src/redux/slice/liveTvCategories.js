import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Request } from '../../services';
import ApiConstant from '../../utils/apiConstant';
import { showToast } from '../../utils/flashMessageAlert';

const initialState = {
  homedata: [],
  epg_add: '',
  data: [],
  focusVideo: '',
  selectedChannelNumber: null,
  filterData: [],
  allChannelList: [],
  allChannelListData: [],
  FavChannelListData: [],
  FavChannelChannelListData: [],
  mergeChannelList: [],
  liveTVlanguage: [],
  channelPage: 1,
  channelCount: 0,
  channelNextPage: true,
  loading: 'idle',
  error: null,
};

export const fetchhometabs = createAsyncThunk('hometabsSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.hometabs);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchLiveTvCategories = createAsyncThunk('liveTvCategoriesSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.categories);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});


export const fetchFavLiveTvCategories = createAsyncThunk('liveFavTvCategoriesSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.getfavouriteslist);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
})
export const fetchFilterChannels = createAsyncThunk('filterChannelsSlice', async (data, thunkAPI) => {
  const { id, page } = data;
  try {
    // const response = await Request.get(ApiConstant.partnerchannellist + id);
    const response = await Request.get(`${ApiConstant.partnerchannellist}${id}/?page=${page}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});



export const fetchAddToFavourite = createAsyncThunk('addTofavouriteChannel', async (data, thunkAPI) => {
  try {
    const response = await Request.post(ApiConstant.addFavouriteChannel, data);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchDeleteToFavourite = createAsyncThunk('deleteTofavouriteChannel', async (data, thunkAPI) => {
  try {
    const response = await Request.del(ApiConstant.addFavouriteChannel, data);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchGetLiveTVLanguage = createAsyncThunk('getLiveTVLanguage', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.LiveTVLanguage);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});


export const fetchLiveTVChannelSearch = createAsyncThunk('getLiveTVChannelSearch', async (type, thunkAPI) => {
  try {
    const response = await Request.get(`${ApiConstant.ChannelSearch}?title=${type}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});


// export const fetchGetLiveTVLanguageList = createAsyncThunk('getLiveTVLanguageList', async (data, thunkAPI) => {
//   const { cid, lid } = data;
//   try {
//     const response = await Request.get(`${ApiConstant.liveTvlanguagecontent}${cid}/${lid}`);
//     // const response = await Request.get(`${ApiConstant.devotionallivecontent}${cid}/${sid}?page=${page}`);
//     return { data: response };
//   } catch (error) {
//     return thunkAPI.rejectWithValue('failed');
//   }
// });



export const fetchGetLiveTVLanguageList = createAsyncThunk('getLiveTVLanguageList', async (id, thunkAPI) => {
  try {
    const response = await Request.get(`${ApiConstant.languageData}${id}/`);
    // const response = await Request.get(`${ApiConstant.devotionallivecontent}${cid}/${sid}?page=${page}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});


export const onCategoriesSlice = createSlice({
  name: 'LoginSlice',
  initialState,
  reducers: {
    CategoriesAction(state, action) {
      state.data = action.payload;
    },
    clearFreeTvChannelData(state) {
      state.filterData = [];
      state.mergeChannelList = [];
      state.channelPage = 1;
      state.channelCount = 0;
      state.channelNextPage = true;
    },
    clearFreeTvChannelList(state) {
      state.filterData = [];
      state.mergeChannelList = [];
    },
    focusChnnelUrlAction(state, action) {
      state.focusVideo = action.payload.focusVideo ?? '';
      state.selectedChannelNumber = action.payload.selectedChannelNumber ?? null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchhometabs.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchhometabs.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.homedata = action.payload?.data.results;
      })
      .addCase(fetchhometabs.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })
      .addCase(fetchLiveTvCategories.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchLiveTvCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.data = action.payload?.data.results;
      })
      .addCase(fetchLiveTvCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })


    .addCase(fetchFavLiveTvCategories.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchFavLiveTvCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const favData = action.payload?.data;
        if (favData.favourite) {
         const channelFavList =  favData.favourite.filter((item) => item.urltype !== "AppTV",);
          state.FavChannelListData = favData.favourite
          state.FavChannelChannelListData = channelFavList
        }
        else {
          state.FavChannelListData = []
        }
      })
      .addCase(fetchFavLiveTvCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })

         .addCase(fetchFilterChannels.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchFilterChannels.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const filterChannel = action.payload?.data;
        const filteredArray = filterChannel.filter((item) => item.urltype !== "AppTV",);
        state.filterData = filterChannel;
        state.allChannelList = filteredArray
      })
      .addCase(fetchFilterChannels.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'channel failed';
      })


      .addCase(fetchAddToFavourite.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchAddToFavourite.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        showToast(action.payload.data.message, 'success');

      })
      .addCase(fetchAddToFavourite.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'channel failed';
      })
      .addCase(fetchDeleteToFavourite.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchDeleteToFavourite.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        showToast(action.payload.data.message, 'danger');
      })
      .addCase(fetchDeleteToFavourite.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'channel failed';
      })


      .addCase(fetchGetLiveTVLanguage.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchGetLiveTVLanguage.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const language = action.payload?.data;
        if (language.results.length > 0) {
          state.liveTVlanguage = language.results
        }
      })
      .addCase(fetchGetLiveTVLanguage.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'channel failed';
      })


      .addCase(fetchLiveTVChannelSearch.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchLiveTVChannelSearch.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const language = action.payload?.data?.results;
        // state.filterData = language.results
         const filteredArray = language.filter((item) => item.urltype !== "AppTV",);
        state.filterData = language;
        state.allChannelList = filteredArray
      })
      .addCase(fetchLiveTVChannelSearch.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'channel failed';
      })

      .addCase(fetchGetLiveTVLanguageList.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchGetLiveTVLanguageList.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const language = action.payload?.data.results;
        // state.liveTVlanguage = language.results
        // state.filterData = language.results;
         const filteredArray = language.filter((item) => item.urltype !== "AppTV",);
        state.filterData = language;
        state.allChannelList = filteredArray
      })
      .addCase(fetchGetLiveTVLanguageList.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'channel failed';
      });
  },
});

export const { CategoriesAction, clearFreeTvChannelData, focusChnnelUrlAction, clearFreeTvChannelList } = onCategoriesSlice.actions;
export const CategoriesSelector = ((state) => state.CategoriesReducer)
export default onCategoriesSlice.reducer;
