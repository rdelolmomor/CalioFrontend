import { connected, disconnected, logout } from '../../features/auth/authSlice';
import { addedPopup, clearedNotifications } from '../../features/notifications/notifSlice';
import { clearedMessages } from '../../features/messages/messagesSlice';
import { setRooms, clearedRooms } from '../../features/rooms/roomsSlice';
import { eventHandlers } from './socket.eventHandlers';
import { customListeners, CUSTOM_EVENTS } from './socket.listeners';

const loginSuccess = 'auth/login/fulfilled';
const logoutSuccess = 'auth/logout/pending';
const socketStart = 'socket';

const middleware = socket => ({ getState, dispatch }) => next => action => {

  if (typeof action === 'function') return action(dispatch, getState);

  if (action.type === loginSuccess) {
    const { login, token, rooms } = action.payload;
    const onConnectionSuccess = socketId => dispatch(connected(socketId));
    const onConnectError = () => dispatch(logout());
    const onDisconnect = () => dispatch(disconnected());
    const onNotif = popup => dispatch(addedPopup(popup));
    dispatch(setRooms(rooms));
    socket.connect(login, token, onConnectionSuccess, onConnectError, onNotif, onDisconnect);
    CUSTOM_EVENTS.forEach(event => {
      const handler = customListeners[event];
      if (handler instanceof Function) {
        socket.on(event, data => handler(data, getState, dispatch));
      }
    });
    return next(action);
  }

  if (action.type === logoutSuccess) {
    dispatch(clearedNotifications());
    dispatch(clearedMessages());
    dispatch(clearedRooms());
    socket.disconnect();
    document.title = 'Calio';
  }

  if (action.type.startsWith(socketStart)) {
    const actionName = action.type.split('/')[1];
    const callback = eventHandlers[actionName];
    if (callback instanceof Function) return callback(socket, action, getState, dispatch);
  }

  //console.log('action ', action);
  next(action);
};

export default middleware;
