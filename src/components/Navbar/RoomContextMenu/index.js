import { useState, useMemo, forwardRef, useImperativeHandle } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import { getRoomContextOptions } from '../../../js/examples';

const initialState = {
  room: null,
  x: null,
  y: null,
};

const RoomContextMenu = forwardRef(({ role, onChangeSound, sound }, ref) => {
  const [menu, setMenu] = useState(initialState);
  const open = (pos, room) => setMenu({ room, x: pos.x, y: pos.y });
  const close = () => setMenu(initialState);
  useImperativeHandle(ref, () => open);

  const contextOptions = useMemo(() => getRoomContextOptions(role, menu?.room), [role, menu?.room]);

  const onItemSelected = action => {
    switch (action) {
      case 'mute':
        onChangeSound();
        break;
      case 'unmute':
        onChangeSound();
        break;
      default:
        break;
    }
    close();
  };

  const isOpened = menu.room?.login !== null && menu.x !== null && menu.y !== null;
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

export default RoomContextMenu;
