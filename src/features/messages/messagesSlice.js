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
  status: 'idle',
  error: null,
  quoteId: null,
  mention: null,
  labels: [],
};

export const fetchInitialMessages = createAsyncThunk(
  'messages/fetchInitialMessages',
  async (_data, { dispatch, getState }) => {
    try {
      const { active: roomId } = getState().rooms;
      if (roomId === -1) throw new Error('No se ha seleccionado sala');
      const { login, token, platformId } = getState().auth;
      const request = { login, token, platformId, roomId };
      const url = `${process.env.REACT_APP_ENDPOINT}messages/getAvailable`;
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

export const fetchNextMessages = createAsyncThunk(
  'messages/fetchNextMessages',
  async (_data, { dispatch, getState }) => {
    try {
      const { active: roomId } = getState().rooms;
      if (roomId === -1) throw new Error('No se ha seleccionado sala');
      const lastMessage = getState().messages.entities[getState().messages.ids[0]];
      const lastId = lastMessage?.roomId === roomId ? lastMessage?.messageId : null;
      const { login, token, platformId } = getState().auth;
      const request = { login, token, platformId, roomId, lastId };
      const url = `${process.env.REACT_APP_ENDPOINT}messages/getAvailable`;
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
  name: 'messages',
  initialState,
  reducers: {
    addedMessage: messagesAdapter.addOne,
    addedQuote: (state, action) => {
      state.quoteId = action.payload;
      state.mention = null;
    },
    removedQuote: state => {
      state.quoteId = null;
    },
    addedMention: (state, action) => {
      state.mention = action.payload;
      state.quoteId = null;
    },
    removedMention: state => {
      state.mention = null;
    },
    addedLabel: (state, action) => {
      const index = state.labels.findIndex(label => label.tag === action.payload.tag);
      if (index < 0) state.labels.push(action.payload);
    },
    removedLabel: (state, action) => {
      const index = state.labels.findIndex(label => label.tag === action.payload.tag);
      if (index >= 0) state.labels.splice(index, 1);
    },
    updatedState: (state, action) => {
      const message = state.entities[action.payload.previousId || action.payload.messageId];
      if (message) {
        const { stateDate, lastState, stateLOGIN } = action.payload;
        message.stateDate = stateDate;
        message.lastState = lastState;
        message.stateLOGIN = stateLOGIN;
        messagesAdapter.upsertOne(state, message);
      }
    },
    updatedLastMessagesCount: (state, action) => {
      state.lastMessagesCount = action.payload;
    },
    clearedForm: state => {
      state.mention = null;
      state.labels = [];
      state.quoteId = null;
    },
    sendedMessage: state => {
      state.mention = null;
      state.labels = [];
      state.quoteId = null;
    },
    clearedMessages: state => {
      messagesAdapter.removeAll(state);
      state.mention = null;
      state.labels = [];
      state.quoteId = null;
      state.status = 'idle';
      state.error = null;
      state.lastMessagesCount = 0;
    },
  },
  extraReducers: {
    [fetchInitialMessages.pending]: state => {
      messagesAdapter.removeAll(state);
      state.status = 'loading';
      state.error = null;
    },
    [fetchInitialMessages.fulfilled]: (state, action) => {
      messagesAdapter.setAll(state, action);
      state.lastMessagesCount = 0;
      state.status = 'done';
      state.error = null;
    },
    [fetchInitialMessages.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
    [fetchNextMessages.pending]: state => {
      state.status = 'loading';
      state.error = null;
      state.lastMessagesCount = 0;
    },
    [fetchNextMessages.fulfilled]: (state, action) => {
      // ! const messageCount = action.payload.length;
      // ! const isFinalFetch = messageCount === 0 || messageCount < 100;
      // ! state.lastMessagesCount = isFinalFetch ? -1 : messageCount;
      state.lastMessagesCount = action.payload.length;
      messagesAdapter.upsertMany(state, action);
      state.status = 'done';
      state.error = null;
    },
    [fetchNextMessages.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.error.message;
    },
  },
});

export default messagesSlice.reducer;

export const {
  addedMessage,
  updatedState,
  sendedMessage,
  addedQuote,
  removedQuote,
  addedMention,
  removedMention,
  addedLabel,
  removedLabel,
  clearedForm,
  updatedLastMessagesCount,
  clearedMessages,
} = messagesSlice.actions;

export const {
  selectById: selectMessageById,
  selectIds: selectMessageIds,
} = messagesAdapter.getSelectors(state => state.messages);

export const getMessageData = createSelector(
  state => state.messages.quoteId,
  state => state.messages.mention,
  state => state.messages.labels,
  (quoteId, mention, labels) => [quoteId, mention, labels]
);
