import { useState, useMemo, forwardRef, useImperativeHandle } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import { getMessageContextOptions } from '../../../js/examples';
import { useDispatch, useSelector } from 'react-redux';
import { sendStateChange, sendPrivateRoom } from '../../../middleware/socket.io/socket.actionsV2';
import { addedQuote, addedMention } from '../../../features/messages/messagesSlice';

const initialState = {
  message: null,
  x: null,
  y: null,
};

const A1 = 'A1';

const ContextMenu = forwardRef((_, ref) => {
  const [menu, setMenu] = useState(initialState);
  const dispatch = useDispatch();
  const role = useSelector(state => state.rooms.entities[state.rooms.active]?.role);
  const profileLogin = useSelector(state => state.auth.login);
  const open = (pos, message) => role.role !== A1 && setMenu({ message, x: pos.x, y: pos.y });
  const close = () => setMenu(initialState);
  useImperativeHandle(ref, () => open);

  const contextOptions = useMemo(
    () => getMessageContextOptions(role, menu?.message, profileLogin),
    [role, menu?.message, profileLogin]
  );

  if (role.role === A1) return null;

  const onItemSelected = action => {
    console.log('Menu contextual en mensajes')
    switch (action) {
      case 'answer':
        dispatch(addedQuote(menu.message.messageId));
        break;
      case 'mention':
        const { login, name } = menu.message;
        dispatch(addedMention({ login, name }));
        break;
      case 'assign':
        dispatch(sendStateChange(menu.message.messageId, 3));
        break;
      case 'private':
        dispatch(sendPrivateRoom(menu.message.login));
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
      id='messages-context-menu'
      anchorReference='anchorPosition'
      onClose={close}
      open={isOpened}
      anchorPosition={position}
    >
      {contextOptions.map(option => (
        <MenuItem key={option.accion} onClick={() => onItemSelected(option.accion)}>
          <ListItemIcon>{option.icono}</ListItemIcon>
          <Typography variant='inherit'>{option.nombre}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
});

export default ContextMenu;
