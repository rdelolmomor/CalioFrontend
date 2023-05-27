import { addedMessage, updatedState } from '../../features/messages/messagesSlice';
import {
  addedMessageNotif,
  removedMessageNotif,
  addedPopup,
} from '../../features/notifications/notifSlice';
import { addedRoom, changedActiveRoom, removedRoom } from '../../features/rooms/roomsSlice';
import { createMessageState } from './socket.actions';
import { prepareIncomingPrivateRoom, filterIncomingPrivate } from '../../js/room.helper';
import {
  playSound,
  infoPopup,
  mentionMessage,
  answerMessage,
  privateRequest,
  adminPopup,
  notifyPopup,
} from '../../js/popups';
import { userAdded, userRemoved } from '../../features/users/usersSlice';
import { logout } from '../../features/auth/authSlice';
import { rebuildMessage } from '../../js/messages';

const onMessage = (messageData, getState, dispatch) => {
  const { roomId, message, previousUserName = '', emitter, receiver, previousId } = messageData;
  const { login, name } = getState().auth;
  const messageRoom = getState().rooms.entities[roomId];
  const isForActiveRoom = getState().rooms.active === roomId;
  const isMentionForMe = receiver === login;
  if (isMentionForMe) dispatch(addedPopup(mentionMessage(message)));
  if (isForActiveRoom) {
    messageData.compoundText = rebuildMessage(messageData.message);
    dispatch(addedMessage(messageData));
    if (messageRoom.sound) playSound();
    if (messageRoom.type === 'PRIVADA') playSound();
  } else dispatch(addedMessageNotif({ roomId, type: messageRoom.type }));
  if (previousId) {
    const newState = createMessageState(emitter, 4);
    dispatch(updatedState({ previousId, ...newState }));
    const isAnswerForMe = previousUserName.toLowerCase() === name.toLowerCase();
    isAnswerForMe && dispatch(addedPopup(answerMessage(message)));
  }
};

const onOnline = (user, getState, dispatch) => {
  const isOnline = user.status === 'online';
  if (isOnline && user.roomId !== getState().rooms.active) return;
  dispatch(isOnline ? userAdded(user) : userRemoved(user));
};

const onMessageState = (change, _, dispatch) => dispatch(updatedState(change));

const onPrivateRoom = (privateRoomEvent, getState, dispatch) => {
  const privateRoom = filterIncomingPrivate(getState().rooms.entities, privateRoomEvent.roomId);
  if (privateRoom) return dispatch(changedActiveRoom(privateRoom.roomId));
  const finalRoom = prepareIncomingPrivateRoom(privateRoomEvent);
  dispatch(addedRoom(finalRoom));
  dispatch(addedPopup(privateRequest(finalRoom.roomName)));
};

const onExitPrivate = (exitRoom, getState, dispatch) => {
  const room = getState().rooms.entities[exitRoom.roomId];
  if (!room) return;
  dispatch(addedPopup(infoPopup(`El usuario ${room.roomName} ha abandonado la sala privada`)));
  dispatch(removedMessageNotif({ roomId: exitRoom.roomId, type: 'PRIVADA' }));
  dispatch(removedRoom(exitRoom.roomId));
};

// * Acciones de administración:
const onUpdateRoom = (room, getState, dispatch) => {
  const actualRoom = getState().rooms.entities[room.roomId];
  const popupText = actualRoom
    ? `Te han actualizado al permiso ${room.role.role} en la sala: ${room.roomName}`
    : `Te han añadido a la sala ${room.roomName} con permiso ${room.role.role}`;
  dispatch(addedRoom(room));
  dispatch(addedPopup(adminPopup(popupText)));
};

const onForceDisconnect = (_data, _getState, dispatch) => {
  const popupText =
    'Un administrador ha solicitado tu desconexión. Desconectando en 10 segundos...';
  dispatch(addedPopup(adminPopup(popupText)));
  setTimeout(() => {
    dispatch(logout());
  }, 10000);
};

export const onAdminPopup = (message, _getState, dispatch) => {
  dispatch(addedPopup(adminPopup(message.message)));
};

export const onNotifyPopup = (message, _getState, dispatch) => {
  dispatch(addedPopup(notifyPopup(message.message)));
};

const onRemoveRoom = (room, getState, dispatch) => {
  const actualRoom = getState().rooms[room.roomId];
  if (actualRoom) {
    dispatch(removedRoom(room.roomId));
    dispatch(addedPopup(adminPopup(`Has sido eliminado de la sala ${room.roomName}`)));
  }
};

export const customListeners = {
  message: onMessage,
  online: onOnline,
  messageState: onMessageState,
  privateRoom: onPrivateRoom,
  exitPrivate: onExitPrivate,
  adminPopup: onAdminPopup,
  notifyPopup: onNotifyPopup,
  updateRoom: onUpdateRoom,
  removeRoom: onRemoveRoom,
  forceDisconnect: onForceDisconnect,
};

export const CUSTOM_EVENTS = [
  'message',
  'online',
  'messageState',
  'privateRoom',
  'exitPrivate',
  'adminPopup',
  'notifyPopup',
  'updateRoom',
  'removeRoom',
  'forceDisconnect',
];
