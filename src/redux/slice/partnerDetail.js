import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiConstant from '../../utils/apiConstant';
import { Request } from '../../services';

const initialState = {
    helpVideos: null,
    partnerDetail: null,
    advertismentDetail: null,
    buyOttQrCode: '',
    providerDetail: [],
    loading: 'idle',
    error: null,
};

export const fetchHelpVideo = createAsyncThunk(
    'helpVideoSlice',
    async (_, thunkAPI) => {
        try {
            const response = await Request.get(ApiConstant.helpVideos);
            return { data: response };
        } catch (error) {
            return thunkAPI.rejectWithValue('help failed');
        }
    }
);

export const fetchPartnerQr = createAsyncThunk(
    'partnerQrSlice',
    async (_, thunkAPI) => {
        try {
            const response = await Request.get(ApiConstant.activatepartnerview);
            return { data: response };
        } catch (error) {
            return thunkAPI.rejectWithValue('partner qr failed');
        }
    }
);


export const fetchBuyOTT = createAsyncThunk(
    'buyottSlice', 
    async (_, thunkAPI) => {
    try {
        const response = await Request.get(ApiConstant.buyOTT);
        return { data: response };
    } catch (error) {
        return thunkAPI.rejectWithValue('partner qr failed');
    }
},
);

export const fetchadvertismentQr = createAsyncThunk(
    'advertismentQrSlice',
    async (_, thunkAPI) => {
        try {
            const response = await Request.get(ApiConstant.advertismentqrview);
            return { data: response };
        } catch (error) {
            return thunkAPI.rejectWithValue('advertisment qr failed');
        }
    }
);

export const onPartnerDetailSlice = createSlice({
    name: 'ProfileSlice',
    initialState,
    reducers: {
        SettingAction(state, action) {
            state.helpVideos = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHelpVideo.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchHelpVideo.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                const videoInfo = action.payload.data;
                state.helpVideos = videoInfo.results;
            })
            .addCase(fetchHelpVideo.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? 'Profile failed';
            })

            .addCase(fetchPartnerQr.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchPartnerQr.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                const partnerInfo = action.payload.data;
                state.partnerDetail = partnerInfo.results;
            })
            .addCase(fetchPartnerQr.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? 'Profile failed';
            })

            .addCase(fetchBuyOTT.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchBuyOTT.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                const qrcode = action.payload?.data?.qrcode
                state.buyOttQrCode = qrcode
            })
            .addCase(fetchBuyOTT.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? 'Profile failed';
            })

            .addCase(fetchadvertismentQr.pending, (state) => {
                state.loading = 'pending';
            })
            .addCase(fetchadvertismentQr.fulfilled, (state, action) => {
                state.loading = 'succeeded';
                const advertismentInfo = action.payload.data;
                state.advertismentDetail = advertismentInfo.results;
            })
            .addCase(fetchadvertismentQr.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error.message ?? 'Profile failed';
            });
    },
});

export const { SettingAction } = onPartnerDetailSlice.actions;
export const PartnerDetailSelector = (state) => state.PartnerDetailReducer;
export default onPartnerDetailSlice.reducer;
