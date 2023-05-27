import axios from 'axios';
import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import thunkCatch from '../../js/thunkCatch';

const usersAdapter = createEntityAdapter({
  selectId: user => user.login,
  sortComparer: (a, b) => {
    const roleComparision = a.role.localeCompare(b.role);
    if (roleComparision !== 0) return roleComparision * -1;
    return a.name.localeCompare(b.name);
  },
});

const initialState = {
  ...usersAdapter.getInitialState(),
  state: 'idle',
  error: null,
};

/**
 * Solicitud al backend para que nos devuelva los usuarios conectados dada una lista de salas
 * @param {Array<string>} rooms Lista de salas para las que pedimos los usuarios.
 */
export const fetchUsersByRoom = createAsyncThunk(
  'users/fetchUsersByRoom',
  async (_, { getState, dispatch }) => {
    try {
      const { token, login } = getState().auth;
      const { active: roomId } = getState().rooms;
      const url = `${process.env.REACT_APP_ENDPOINT}users/getConnected`;
      const response = await axios.post(url, { login, token, roomId });
      return response?.data;
    } catch (err) {
      thunkCatch(err, dispatch);
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdded: usersAdapter.upsertOne,
    userRemoved: (state, action) => {
      usersAdapter.removeOne(state, action.payload.login);
    },
    clearedUsers: state => {
      usersAdapter.removeAll(state);
      state.state = 'idle';
      state.error = null;
    },
  },
  extraReducers: {
    // * fetchUsersByRooms
    [fetchUsersByRoom.pending]: usersAdapter.removeAll,
    [fetchUsersByRoom.fulfilled]: (state, action) => {
      usersAdapter.setAll(state, action);
      state.state = 'done';
    },
    [fetchUsersByRoom.rejected]: state => {
      state.state = 'done';
    },
  },
});

export default usersSlice.reducer;

export const { userAdded, userRemoved, userChanged, clearedUsers } = usersSlice.actions;

export const {
  selectById: selectUserById,
  selectIds: selectUsersIds,
  selectAll: selectAllUsers,
} = usersAdapter.getSelectors(state => state.users);

const AGENT_ROLES = ['A1', 'A2'],
  AGENT_LABEL = '# AGENTES',
  STAFF_LABEL = '# STAFF';

export const getGroupedUsers = createSelector(
  state => state.users.entities,
  userEntities => {
    const users = Object.values(userEntities);
    const usersCount = users.length;
    const firstAgentIndex = users.findIndex(({ role }) => AGENT_ROLES.includes(role));
    const firstStaffIndex = users.findIndex(({ role }) => !AGENT_ROLES.includes(role));
    let modif = 0;
    if (firstStaffIndex >= 0) {
      users.splice(firstStaffIndex, 0, { label: STAFF_LABEL });
      modif++;
    }
    if (firstAgentIndex >= 0) users.splice(firstAgentIndex + modif, 0, { label: AGENT_LABEL });
    return [users, usersCount];
  }
);
