import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Request } from '../../Authservices';
import ApiConstant from '../../utils/apiConstant';
import { showLoader, hideLoader } from './loadingSlice';
import { navigateTo, resetNavigation } from '../../utils/navigateTo';

const initialState = {
  loginData: null,
  isLogedIn: false,
  loading: 'idle',
  error: null,
};

export const fetchLogin = createAsyncThunk('LoginSlice', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoader());
    const response = await Request.post(ApiConstant.Login, data);
    return { data: response };
  } catch (error) {
    thunkAPI.dispatch(hideLoader());
    return thunkAPI.rejectWithValue('Login failed');
  } finally {
    thunkAPI.dispatch(hideLoader());
  }
});

export const fetchLoginWithMacid = createAsyncThunk('LoginwithmacidSlice', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoader());
    const response = await Request.post(ApiConstant.LoginWithMacID, data);
    return { data: response };
  } catch (error) {
    thunkAPI.dispatch(hideLoader());
    return thunkAPI.rejectWithValue('Login failed');
  } finally {
    thunkAPI.dispatch(hideLoader());
  }
});


export const fetchLoginWithPin = createAsyncThunk('LoginWithPinSlice', async (data, thunkAPI) => {
  try {
    const response = await Request.post(ApiConstant.LoginWithPin, data);
    return { data: response };
    // return { data: response } as { data: any };
  } catch (error) {
    return thunkAPI.rejectWithValue('Login failed');
  }
},
);

export const fetchOtp = createAsyncThunk('OtpSlice', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoader());
    const response = await Request.post(ApiConstant.otp, data);
    return { data: response };
  } catch (error) {
    thunkAPI.dispatch(hideLoader());
    return thunkAPI.rejectWithValue('Login failed');
  } finally {
    thunkAPI.dispatch(hideLoader());
  }
});

export const onLoginSlice = createSlice({
  name: 'LoginSlice',
  initialState,
  reducers: {
    LoginAction(state, action) {
      state.isLogedIn = action.payload;
    },
    AutoLoginData(state) {
      state.loginData = null;
      state.isLogedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const userinfo = action.payload.data.data;
        if (userinfo.success) {
          state.loginData = userinfo;
          state.isLogedIn = true;
          setTimeout(() => {
            resetNavigation('Home');
          }, 100);
        }
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Login failed';
      })

      .addCase(fetchLoginWithPin.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchLoginWithPin.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const userinfo = action.payload.data.data
        if (userinfo.success) {
          state.loginData = userinfo
          state.isLogedIn = true
          setTimeout(() => {
            resetNavigation('Home')
          }, 1000)
        }
      })
      .addCase(fetchLoginWithPin.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })


      .addCase(fetchLoginWithMacid.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchLoginWithMacid.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const userinfo = action.payload.data.data;
        if (userinfo.status) {
          state.loginData = userinfo;
          state.isLogedIn = true;
          setTimeout(() => {
            resetNavigation('Home');
          }, 100);
        }
      })
      .addCase(fetchLoginWithMacid.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Login failed';
      })
      .addCase(fetchOtp.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchOtp.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const userinfo = action.payload.data.data;
        if (userinfo.success) {
          state.loginData = userinfo;
          state.isLogedIn = true;
          setTimeout(() => {
            resetNavigation('Home');
          }, 100);
        }
      })
      .addCase(fetchOtp.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Login failed';
      });
  },
});

export const { LoginAction, AutoLoginData } = onLoginSlice.actions;
export const AuthSelector = (state) => state.AuthReducer;
export default onLoginSlice.reducer;
