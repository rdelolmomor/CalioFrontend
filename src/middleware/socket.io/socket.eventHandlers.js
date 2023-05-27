import { addedMessage, updatedState, clearedForm } from '../../features/messages/messagesSlice';
import { addedPopup, removedMessageNotif } from '../../features/notifications/notifSlice';
import { addedRoom, changedActiveRoom, removedRoom } from '../../features/rooms/roomsSlice';
import { createMessageState } from './socket.actions';
import { errorPopup, infoPopup } from '../../js/popups';
import { prepareOutgoingPrivateRoom, filterOutgoingPrivate } from '../../js/room.helper';
import { rebuildMessage } from '../../js/messages';

const PRIVATE_TYPE = 'PRIVADA';

function sendMessage(socket, action, getState, dispatch) {
  const [roomId, rooms] = [getState().rooms.active, getState().rooms.entities];
  if (roomId === -1) {
    const popup = errorPopup('No se ha seleccionado ninguna sala');
    dispatch(addedPopup(popup));
  }
  const actualRoom = rooms[roomId];
  const isPrivate = actualRoom.type === PRIVATE_TYPE;
  socket.emit('message', { ...action.payload, private: isPrivate, roomId }, message => {
    message.compoundText = rebuildMessage(message.message);
    dispatch(addedMessage(message));
    dispatch(clearedForm());
    const { previousId, emitter } = message;
    if (previousId !== null) {
      const newState = createMessageState(emitter, 4);
      dispatch(updatedState({ ...newState, previousId }));
    }
  });
}

function stateMessage(socket, action, getState, dispatch) {
  const roomId = getState().rooms.active;
  return socket.emit('messageState', { ...action.payload, roomId }, response => {
    return dispatch(updatedState(response));
  });
}

function privateRoom(socket, action, getState, dispatch) {
  const privateRoom = filterOutgoingPrivate(getState().rooms.entities, action.payload);
  if (privateRoom) return dispatch(changedActiveRoom(privateRoom.roomId));
  const roomId = getState().rooms.active;
  return socket.emit('privateRoom', { ...action.payload, roomId }, response => {
    const finalRoom = prepareOutgoingPrivateRoom(response);
    dispatch(addedRoom(finalRoom));
  });
}

function exitPrivate(socket, action, _getState, dispatch) {
  return socket.emit('exitPrivate', { roomId: action.payload }, _response => {
    dispatch(removedMessageNotif({ roomId: action.payload, type: PRIVATE_TYPE }));
    dispatch(removedRoom(action.payload));
  });
}

function adminAction(socket, action, _getState, dispatch) {
  //console.log('[1] Interceptamos solicitud de acción de administrador', action.payload);
  return socket.emit('adminAction', action.payload, response => {
    //console.log('[2] Recibimos respuesta en "adminAction":', response);
    if (!response) return dispatch(addedPopup(errorPopup('No se ha podido ejecutar la acción')));
    dispatch(addedPopup(infoPopup('Se ha ejecutado la acción solicitada')));
  });
}

function notifyAction(socket, action, _getState, dispatch) {
  console.log('[1] Interceptamos solicitud de acción de notificación', action.payload);
  return socket.emit('notifyAction', action.payload, response => {
    console.log('[2] Recibimos respuesta en "notifyAction":', response);
    if (!response) return dispatch(addedPopup(errorPopup('No se ha podido ejecutar la acción')));
    dispatch(addedPopup(infoPopup('Se ha ejecutado la acción solicitada')));
  });
}

export const eventHandlers = {
  sendMessage,
  privateRoom,
  exitPrivate,
  adminAction,
  notifyAction,
  stateChange: stateMessage,
};
