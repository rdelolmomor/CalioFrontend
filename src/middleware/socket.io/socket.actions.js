import { createAction } from '@reduxjs/toolkit';

export const actionTypes = {
  sendMessage: 'socket/sendMessage',
  sendPrivateRoom: 'socket/privateRoom',
  exitPrivateRoom: 'socket/exitPrivate',
  sendStateChange: 'socket/stateChange',
  sendAdminAction: 'socket/adminAction',
  sendNotifyAction: 'socket/notifyAction',
};

/**
 * Acción para enviar un mensaje
 * @param {{message: string, labels: string, receiver?: string, previousId?: number}} message
 */
export const sendMessage = createAction(actionTypes.sendMessage);

/**
 * Acción para abrir una sala privada
 * @param {{ guestLogin: string }} data
 */
export const sendPrivateRoom = createAction(actionTypes.sendPrivateRoom);

/**
 * Acción para modificar el estado de un mensaje
 * @param {{ messageId: number, stateId: number}} data
 */
export const sendStateChange = createAction(actionTypes.sendStateChange);

/**
 * Acción para abandonar una sala privada
 * @param {number} roomId
 */
export const exitPrivateRoom = createAction(actionTypes.exitPrivateRoom);

/**
 * Acción para mandar una acción de administrador
 * @param {{ receiver: string, type: string, roomId: number, payload: Object}} data
 */
export const sendAdminAction = createAction(actionTypes.sendAdminAction, data => {
  const { login, type, roomId, payload } = data;
  const parsedRoomId = type === 'UPDATE_ROOM' ? parseInt(payload.roomId) : parseInt(roomId)
  console.log(parsedRoomId);
  return {
    payload: {
      type,
      receiver: login,
      roomId: parsedRoomId,
      payload: { ...payload, roomId: parsedRoomId },
    },
  };
});

/**
 * Acción para mandar una notificación
 * @param {{ receiver: string, type: string, roomId: number, payload: Object}} data
 */
export const sendNotifyAction = createAction(actionTypes.sendNotifyAction, data => {
  const { login, type, roomId, payload } = data;
  const parsedRoomId = parseInt(roomId);
  return {
    payload: {
      type,
      receiver: login,
      roomId: parsedRoomId,
      payload: { ...payload, roomId: parsedRoomId },
    },
  };
});

/**
 * Crea un objeto con los datos relativos a un estado de mensaje
 * @param {string} login
 * @param {number} newState
 * @returns {{ stateDate: string, lastState: number, stateLogin: string}}
 */
export const createMessageState = (login, newState) => {
  let stateDate = new Date();
  stateDate = stateDate.toISOString();
  return {
    stateDate,
    lastState: newState,
    stateLOGIN: login,
  };
};
