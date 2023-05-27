import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { removedPopup } from '../../features/notifications/notifSlice';

let displayed = [];

function Notifier() {
  const dispatch = useDispatch();
  const popups = useSelector(state => state.notifications.popups);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = id => displayed.push(id);
  const removeDisplayed = id => {
    displayed = [...displayed.filter(key => key !== id)];
  };

  useEffect(() => {
    popups.forEach(popup => {
      const { key, message, options, dismissed = false } = popup;
      if (dismissed) return closeSnackbar(key);
      if (displayed.includes(key)) return;
      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, popupKey) => {
          if (options.onClose instanceof Function) {
            options.onClose(event, reason, popupKey);
          }
        },
        onExited: (_, popupKey) => {
          dispatch(removedPopup(popupKey));
          removeDisplayed(popupKey);
        },
      });
      storeDisplayed(key);
    });
  }, [dispatch, enqueueSnackbar, closeSnackbar, popups]);

  return null;
}

export default Notifier;
