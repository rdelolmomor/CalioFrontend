import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit';
import { addedPopup } from '../notifications/notifSlice';
import { setFilterProp } from '../messages/filteredMessagesSlice';
import { connectionError, errorPopup } from '../../js/popups';
import axios from 'axios';
import safeParse from '../../js/safeParse';
import { defaultAvatar } from '../../js/avatars';
import thunkCatch from '../../js/thunkCatch';

export const login = createAsyncThunk('auth/login', async (loginParams, { dispatch }) => {
  let response;
  const url = `${process.env.REACT_APP_ENDPOINT}auth/login`;
  try {
    response = await axios.post(url, loginParams);
    console.log("Response: ", response);
    const avatar = safeParse(response.data.profile.avatar, defaultAvatar);
    response.data.profile.avatar = avatar === 'Default' ? defaultAvatar : avatar;
    return { ...response.data.session, ...response.data.profile };
  } catch (err) {
    if (err?.request?.response) {
      const error = safeParse(err.request.response, { error: 'Error durante el logado' });
      dispatch(addedPopup(errorPopup(error.error)));
      throw new Error(error.error);
    } else if (err.toString() === 'Error: Network Error') {
      dispatch(addedPopup(connectionError));
    }
    throw new Error(err);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { getState, dispatch }) => {
  const { login, token } = getState().auth;
  dispatch(setFilterProp(''));
  const url = `${process.env.REACT_APP_ENDPOINT}auth/logout`;
  return await axios.post(url, { login, token });
});

export const updatedAvatar = createAsyncThunk(
  'auth/updatedAvatar',
  async (avatar, { getState, dispatch }) => {
    try {
      const { login, token } = getState().auth;
      const url = `${process.env.REACT_APP_ENDPOINT}auth/updateAvatar`;
      const response = await axios.post(url, { login, token, avatar });
      return response?.data || false;
    } catch (err) {
      thunkCatch(err, dispatch);
    }
  }
);

const initialState = {
  state: 'idle',
  error: null,
  token: undefined,
  expireTime: undefined,
  login: undefined,
  platformId: undefined,
  name: undefined,
  avatar: undefined,
  avatarState: 'idle',
  status: undefined,
  socket: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    connected: (state, action) => {
      state.socket = action.payload;
      state.status = 'ACTIVO';
    },
    disconnected: state => {
      state.status = 'AUTENTICADO';
    },
  },
  extraReducers: {
    [login.pending]: state => {
      state.state = 'loading';
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.state = 'done';
      state.token = action.payload.token;
      state.expireTime = action.payload.expireTime;
      state.login = action.payload.login;
      state.platformId = action.payload.platformId;
      state.name = action.payload.name;
      state.status = action.payload.state;
      state.avatar = action.payload.avatar;
      state.error = null;
    },
    [login.rejected]: (state, action) => {
      state.state = 'error';
      state.error = action.error.message;
    },
    [logout.fulfilled]: state => {
      state.token = undefined;
      state.expireTime = undefined;
      state.login = undefined;
      state.platformId = undefined;
      state.name = undefined;
      state.avatar = undefined;
      state.status = undefined;
      state.avatar = undefined;
      state.state = 'idle';
      state.socket = undefined;
    },
    [logout.rejected]: state => {
      state.token = undefined;
      state.expireTime = undefined;
      state.login = undefined;
      state.platformId = undefined;
      state.name = undefined;
      state.avatar = undefined;
      state.status = undefined;
      state.avatar = undefined;
      state.state = 'idle';
      state.socket = undefined;
    },
    [updatedAvatar.pending]: (state, action) => {
      state.avatarState = 'loading';
    },
    [updatedAvatar.fulfilled]: (state, action) => {
      if (action.payload) {
        state.avatar = action.payload;
        state.avatarState = 'done';
      }
    },
    [updatedAvatar.rejected]: (state, action) => {
      state.avatarState = 'error';
    },
  },
});

export default authSlice.reducer;

export const { addedReward, connected, disconnected } = authSlice.actions;

export const getIsAuthenticated = createSelector(
  state => state.auth,
  auth => {
    const { login, token } = auth;
    return Boolean(login) && Boolean(token);
  }
);
