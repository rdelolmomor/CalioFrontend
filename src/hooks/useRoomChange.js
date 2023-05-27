import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActiveRoom } from '../features/rooms/roomsSlice';
import { fetchInitialMessages, clearedForm } from '../features/messages/messagesSlice';
import { fetchFilteredMessages } from '../features/messages/filteredMessagesSlice';
import { fetchUsersByRoom } from '../features/users/usersSlice';
import { removedMessageNotif } from '../features/notifications/notifSlice';

function useRoomChange() {
  const dispatch = useDispatch();
  const activeRoom = useSelector(getActiveRoom);
  const filter = useSelector(state => state.filteredMessages.filter);
  useEffect(() => {
    if (activeRoom) {
      dispatch(clearedForm());
      dispatch(fetchInitialMessages());
      if (filter !== '') dispatch(fetchFilteredMessages());
      dispatch(fetchUsersByRoom());
      dispatch(removedMessageNotif({ roomId: activeRoom?.roomId, type: activeRoom?.type }));
    }
    //eslint-disable-next-line
  }, [activeRoom, dispatch]);

  return activeRoom;
}

export default useRoomChange;
