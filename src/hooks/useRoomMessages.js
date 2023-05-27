/*
import { useSelector } from 'react-redux';
import { selectAllRooms } from '../features/rooms/roomsSlice';

function useRoomMessages() {
  const rooms = useSelector(selectAllRooms).filter(room => !room.private);
  const privateRooms = useSelector(selectAllRooms).filter(room => room.private);
  const activeRoom = useSelector(state => state.rooms.active);

  return [activeRoom, rooms, privateRooms];
}

export default useRoomMessages;
*/