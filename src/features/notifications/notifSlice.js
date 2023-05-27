import { createSlice, createSelector, nanoid } from '@reduxjs/toolkit';

const initialState = {
  services: {},
  privates: {},
  commons: {},
  popups: [],
};

const NOTIF_TYPE_MAP = {
  PRIVADA: 'privates',
  DEPARTAMENTO: 'services',
  COMUN: 'commons',
};

const NOTIF_LABEL_MAP = {
  CONVERSACIONES: 'privates',
  SERVICIOS: 'services',
  GENERAL: 'commons',
};

const notifSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addedMessageNotif: (state, action) => {
      const stateProp = NOTIF_TYPE_MAP[action.payload.type];
      const roomNotif = state[stateProp][action.payload.roomId];
      if (!roomNotif) {
        state[stateProp][action.payload.roomId] = 1;
      } else if (typeof roomNotif === 'number') {
        state[stateProp][action.payload.roomId] += 1;
      }
    },
    removedMessageNotif: (state, action) => {
      const stateProp = NOTIF_TYPE_MAP[action.payload.type];
      state[stateProp][action.payload.roomId] = 0;
    },
    clearedNotifications: state => {
      state.services = {};
      state.privates = {};
      state.commons = {};
    },
    addedPopup: {
      prepare: popup => ({ payload: { ...popup, key: nanoid(10) } }),
      reducer: (state, action) => {
        const { preventDuplicate } = action.payload.options;
        const { message } = action.payload;
        const existsPopup = state.popups.findIndex(popup => popup.message === message) >= 0;
        if (!preventDuplicate || (preventDuplicate && !existsPopup)) {
          state.popups.push(action.payload);
        }
      },
    },
    removedPopup: (state, action) => {
      state.popups.splice(action.payload, 1);
      if (!action.payload) state.popups.splice(-1, 1);
    },
  },
});

export const {
  clearedNotifications,
  addedMessageNotif,
  removedMessageNotif,
  addedPopup,
  removedPopup,
} = notifSlice.actions;

export default notifSlice.reducer;

export const getNotifications = createSelector(
  state => {
    const { privates, commons, services } = state.notifications;
    return { ...privates, ...commons, ...services };
  },
  notifications => Object.values(notifications).reduce((total, notif) => total + notif, 0)
);

export const getNotificationsByType = createSelector(
  state => state.notifications,
  (_, { roomType, roomId }) => ({
    roomType,
    roomId,
  }),
  (notifications, { roomType, roomId }) => {
    const stateProp = NOTIF_TYPE_MAP[roomType];
    return notifications[stateProp][roomId];
  }
);
export const hasRoomGroupNotifications = createSelector(
  state => state.notifications,
  (_, roomType) => roomType,
  (notifications, roomType) => {
    const stateProp = NOTIF_LABEL_MAP[roomType];
    if (!stateProp) return false;
    return Object.values(notifications[stateProp]).some(notif => notif > 0);
  }
);
