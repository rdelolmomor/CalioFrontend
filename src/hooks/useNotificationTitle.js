import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getNotifications } from '../features/notifications/notifSlice';

const CALIO = 'Calio';

function useNotificationTitle() {
  const totalNotifications = useSelector(getNotifications);
  useEffect(() => {
    document.title = totalNotifications > 0 ? `📝(${totalNotifications}) ${CALIO}` : CALIO;
  }, [totalNotifications]);
}

export default useNotificationTitle;
