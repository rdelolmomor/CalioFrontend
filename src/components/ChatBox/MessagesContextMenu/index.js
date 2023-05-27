import { useState, useMemo, forwardRef, useImperativeHandle } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import { getMessageContextOptions } from '../../../js/examples';
import { useDispatch, useSelector } from 'react-redux';
import { sendStateChange, sendPrivateRoom } from '../../../middleware/socket.io/socket.actions';
import { addedQuote, addedMention } from '../../../features/messages/messagesSlice';
import { getActiveRole } from '../../../features/rooms/roomsSlice';

const initialState = {
  message: null,
  x: null,
  y: null,
};

const MessagesContextMenu = forwardRef((_, ref) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(initialState);
  const user = useSelector(state => state.auth);
  const role = useSelector(getActiveRole);
  const open = (pos, message) => {
    ((message.role !== 'A1' && message.role !== 'A2') || role !== 'A1') &&
      setMenu({ message, x: pos.x, y: pos.y });
  };

  const close = () => setMenu(initialState);
  useImperativeHandle(ref, () => open);

  const contextOptions = useMemo(() => getMessageContextOptions(role, menu?.message, user.login), 
  //eslint-disable-next-line
  [role,menu?.message,]);

  const onItemSelected = action => {
    switch (action) {
      case 'answer':
        dispatch(addedQuote(menu?.message?.messageId));
        break;
      case 'mention':
        const { login, name } = menu.message;
        dispatch(addedMention({ login, name }));
        break;
      case 'assign':
        dispatch(sendStateChange({ messageId: menu?.message?.messageId, stateId: 3 }));
        break;
      case 'unassign':
        dispatch(sendStateChange({ messageId: menu?.message?.messageId, stateId: 5 }));
        break;
      case 'private':
        dispatch(sendPrivateRoom({ guestLogin: menu?.message?.login }));
        break;
      default:
        break;
    }
    close();
  };

  const isOpened = menu.message?.messageId !== null && menu.x !== null && menu.y !== null;
  const position = menu.y !== null && menu.x !== null ? { top: menu.y, left: menu.x } : undefined;

  return (
    <Menu
      keepMounted
      id="messages-context-menu"
      anchorReference="anchorPosition"
      onClose={close}
      open={isOpened}
      anchorPosition={position}
    >
      {contextOptions.map(option => (
        <MenuItem key={option.action} onClick={() => onItemSelected(option.action)}>
          <ListItemIcon>{option.icon}</ListItemIcon>
          <Typography variant="inherit">{option.name}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
});

export default MessagesContextMenu;
