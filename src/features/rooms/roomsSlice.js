import { createSlice, createSelector, createEntityAdapter } from '@reduxjs/toolkit';

const roomSort = (roomA, roomB) => {
  const typeComparision = roomA.type.localeCompare(roomB.type);
  if (typeComparision !== 0) return typeComparision;
  return roomA.roomName.localeCompare(roomB.roomName);
};

const roomsAdapter = createEntityAdapter({
  selectId: room => room.roomId,
  sortComparer: roomSort,
});

const initialState = {
  ...roomsAdapter.getInitialState(),
  state: 'idle',
  error: null,
  active: -1,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    setRooms: (state, action) => {
      roomsAdapter.setAll(state, action);
      state.active = state.ids[0];
    },
    addedRoom: (state, action) => {
      roomsAdapter.upsertOne(state, action);
      state.active = action.payload.roomId;
    },
    removedRoom: (state, action) => {
      if (action.payload === state.active) state.active = state.ids[0];
      roomsAdapter.removeOne(state, action);
    },
    changedActiveRoom: (state, action) => {
      state.active = action.payload;
    },
    changedRoomSound: (state, action) => {
      roomsAdapter.upsertOne(state, action);
    },
    clearedRooms: state => {
      roomsAdapter.removeAll(state);
      state.state = 'idle';
      state.error = null;
      state.active = -1;
    },
  },
});

export default roomsSlice.reducer;

export const {
  addedRoom,
  removedRoom,
  changedActiveRoom,
  changedRoomSound,
  setRooms,
  clearedRooms,
} = roomsSlice.actions;

export const { selectAll: selectAllRooms } = roomsAdapter.getSelectors(state => state.rooms);

export const getActiveRoom = createSelector(
  [state => state.rooms.active, state => state.rooms.entities],
  (activeRoomId, rooms) => rooms[activeRoomId]
);

const GROUP_LABELS = ['GENERAL', 'SERVICIOS', /* 'GRUPALES', */ 'CONVERSACIONES'];

export const getGroupedRooms = createSelector(
  state => state.rooms.entities,
  roomEntities => {
    const rooms = Object.values(roomEntities).sort(roomSort);
    const firstIndexCommon = rooms.findIndex(({ type }) => type === 'COMUN');
    const firstIndexService = rooms.findIndex(({ type }) => type === 'DEPARTAMENTO');
    // const firstIndexGroup = rooms.findIndex(({ type }) => type === 'GRUPAL');
    const firstIndexPrivate = rooms.findIndex(({ type }) => type === 'PRIVADA');
    let modif = 0;
    [firstIndexCommon, firstIndexService, /* firstIndexGroup, */ firstIndexPrivate].forEach(
      (index, pos) => {
        if (index < 0) return;
        rooms.splice(index + modif, 0, { label: GROUP_LABELS[pos] });
        modif++;
      }
    );
    return rooms;
  }
);

export const getActiveRole = createSelector(
  state => state.rooms.entities,
  state => state.rooms.active,
  (rooms, activeRoomId) => rooms[activeRoomId]?.role
);
