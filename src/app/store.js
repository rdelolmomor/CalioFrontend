import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import messagesReducer from '../features/messages/messagesSlice';
import filteredMessagesReducer from '../features/messages/filteredMessagesSlice';
import roomsReducer from '../features/rooms/roomsSlice';
import usersReducer from '../features/users/usersSlice';
import notifReducer from '../features/notifications/notifSlice';
import socketMiddleware from '../middleware/socket.io/socket.middleware';
import SocketClient from './SocketClient';

const socket = new SocketClient();

export default configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesReducer,
    filteredMessages: filteredMessagesReducer,
    rooms: roomsReducer,
    users: usersReducer,
    notifications: notifReducer,
  },
  middleware: [socketMiddleware(socket)],
});
