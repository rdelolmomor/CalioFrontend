import { useState, useMemo, forwardRef, useImperativeHandle } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import { getUserContextOptions } from '../../../js/examples';
import { useDispatch, useSelector } from 'react-redux';
import { sendPrivateRoom } from '../../../middleware/socket.io/socket.actions';
import { addedMention } from '../../../features/messages/messagesSlice';
import { getActiveRole } from '../../../features/rooms/roomsSlice';

const initialState = {
  user: null,
  x: null,
  y: null,
};

const UsersContextMenu = forwardRef((_,ref) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(initialState);
  const role = useSelector(getActiveRole);
  const open = (pos, user) => setMenu({ user, x: pos.x, y: pos.y });
  const close = () => setMenu(initialState);
  useImperativeHandle(ref, () => open);

  const contextOptions = useMemo(() => getUserContextOptions(role, menu?.user), [role, menu?.user]);

  const onItemSelected = action => {
    console.log('Menu contextual en lista de usuarios');
    switch (action) {
      case 'mention':
        const { login, name } = menu.user;
        dispatch(addedMention({ login, name }));
        break;
      case 'private':
        dispatch(sendPrivateRoom({ guestLogin: menu?.user?.login }));
        break;
      default:
        break;
    }
    close();
  };

  const isOpened = menu.user?.login !== null && menu.x !== null && menu.y !== null;
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
        <MenuItem key={option.action} onClick={() => onItemSelected(option.action)}>
          <ListItemIcon>{option.icon}</ListItemIcon>
          <Typography variant='inherit'>{option.name}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
});

export default UsersContextMenu;
