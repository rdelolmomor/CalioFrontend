import { useRef, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { navbarStyles } from '../../js/styles';
import Card from '@material-ui/core/Card';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import NavItem from './NavItem';
import ProfileButton from './ProfileButton';
import Logo from '../Home/Login/Logo';
import ProfileDialog from './ProfileDialog';
import { useDispatch, useSelector } from 'react-redux';
import { changedActiveRoom, getGroupedRooms, getActiveRoom } from '../../features/rooms/roomsSlice';
import useNotificationTitle from '../../hooks/useNotificationTitle';
import NavLabel from './NavLabel';

const AVAILABLE_PATHS = ['/calio/', '/calio/chat'];

function Navbar() {
  const activeRoom = useSelector(getActiveRoom);
  const { root, autofill, logo, profileButton, list, searcher } = navbarStyles();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const profileDialogRef = useRef();
  const groupedRooms = useSelector(getGroupedRooms);
  const [search, setSearch] = useState('');
  useNotificationTitle();

  const onItemSelected = item => dispatch(changedActiveRoom(item.roomId));
  const openProfileDialog = () => profileDialogRef.current?.open();

  if (!AVAILABLE_PATHS.includes(pathname)) return <Redirect to={AVAILABLE_PATHS[0]} />;
  if (pathname === AVAILABLE_PATHS[0]) return null;

  return (
    <>
      <Card elevation={0} className={root} raised>
        <Logo className={logo} />
        <OutlinedInput
          className={searcher}
          variant="outlined"
          margin="dense"
          placeholder="Buscar salas..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <List component="nav" disablePadding className={list}>
          {groupedRooms
            ?.filter(
              room =>
                !search ||
                Boolean(room.label) ||
                room.roomName.toLowerCase().includes(search.toLowerCase())
            )
            .map((room, i) =>
              room.label ? (
                <NavLabel key={`${i}-${room.label}`} label={room.label} />
              ) : (
                <NavItem
                  key={room.roomId}
                  {...room}
                  selected={room.roomId === activeRoom.roomId}
                  onSelected={onItemSelected}
                />
              )
            )}
        </List>
        <div className={autofill} />
        <ProfileButton className={profileButton} onClick={openProfileDialog} />
      </Card>
      <ProfileDialog ref={profileDialogRef} />
    </>
  );
}

export default Navbar;
