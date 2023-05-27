import axios from 'axios';
import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import thunkCatch from '../../js/thunkCatch';
import { rebuildMessage } from '../../js/messages';

const messagesAdapter = createEntityAdapter({
  selectId: message => message.messageId,
  sortComparer: (a, b) => a.messageId - b.messageId,
});

const initialState = {
  ...messagesAdapter.getInitialState(),
  lastMessagesCount: 0,
  filter: '',
  status: 'idle',
  error: null,
};

export const fetchFilteredMessages = createAsyncThunk(
  'messages/fetchFilteredMessages',
  async (_, { dispatch, getState }) => {
    try {
      const { active: roomId } = getState().rooms;
      if (roomId === -1) throw new Error('No se ha seleccionado sala');
      const { login, token, platformId } = getState().auth;
      const { filter } = getState().filteredMessages;
      const request = { login, token, platformId, roomId, filter };
      const url = `${process.env.REACT_APP_ENDPOINT}messages/getFiltered`;
      const response = await axios.post(url, request);
      if (Array.isArray(response.data)) {
        return response.data.map(message => ({
          ...message,
          compoundText: rebuildMessage(message.message),
        }));
      }
      return response.data;
    } catch (err) {
      thunkCatch(err, dispatch);
    }
  }
);

const messagesSlice = createSlice({
  name: 'filteredMessages',
  initialState,
  reducers: {
    addedMessage: messagesAdapter.addOne,
    setFilterProp: (state, action) => {
      if (action.payload !== ' ') state.filter = action.payload;
    },
  },
  extraReducers: {
    [fetchFilteredMessages.pending]: state => {
      messagesAdapter.removeAll(state);
      state.status = 'loading';
      state.error = null;
    },
    [fetchFilteredMessages.fulfilled]: (state, action) => {
      messagesAdapter.setAll(state, action);
      state.lastMessagesCount = 0;
      state.status = 'done';
      state.error = null;
    },
    [fetchFilteredMessages.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
  },
});

export default messagesSlice.reducer;

export const { addedMessage, setFilterProp } = messagesSlice.actions;

export const {
  selectById: selectFilteredMessageById,
  selectIds: selectFilteredMessageIds,
} = messagesAdapter.getSelectors(state => state.filteredMessages);

export const getMessageData = createSelector(
  state => state.filteredMessages.quoteId,
  state => state.filteredMessages.mention,
  state => state.filteredMessages.labels,
  (quoteId, mention, labels) => [quoteId, mention, labels]
);

export const { selectAll: selectAllMessagesList } = messagesAdapter.getSelectors(
  state => state.filteredMessages
);
