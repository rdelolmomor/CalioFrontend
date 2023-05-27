import React, { useState, useRef } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import { navItemStyles } from '../../../js/styles';
import { getNotificationsByType } from '../../../features/notifications/notifSlice';
import { selectAllRooms, changedRoomSound } from '../../../features/rooms/roomsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { exitPrivateRoom } from '../../../middleware/socket.io/socket.actions';
import RoomContextMenu from './../RoomContextMenu';

import {
  ListItem, ListItemText, ListItemIcon, IconButton, Badge, Tooltip, Avatar,
} from '@material-ui/core';

import {
  VolumeOff,
} from '@material-ui/icons';

function NavItem({ roomName, role, type: roomType, roomId, onSelected, selected }) {
  const [sound, setSound] = useState(true);
  const data = useSelector(selectAllRooms);
  const actualRoom = data.find(room => room.roomId === roomId);
  const { navItem, exitButton, roomListDiv } = navItemStyles();
  const isPrivate = roomType === 'PRIVADA';
  const roomContextMenuRef = useRef();
  const notifications = useSelector(state => getNotificationsByType(state, { roomType, roomId }));
  const dispatch = useDispatch();
  const onExitRoom = e => {
    e.stopPropagation();
    if (!isPrivate) return;
    dispatch(exitPrivateRoom(roomId));
  };

  const handleContextMenu = e => {
    e.preventDefault();
    const { clientX: x, clientY: y } = e;
    onRoomContextMenu({ x, y }, actualRoom);
  };

  function onRoomContextMenu(position, room) {
    const openContextMenu = roomContextMenuRef.current;
    if (openContextMenu instanceof Function) openContextMenu(position, room);
  }

  const onChangeSound = () => {
    const room = {
      roomId: actualRoom.roomId,
      role: actualRoom.role,
      roomName: actualRoom.roomName,
      type: actualRoom.type,
      sound: !actualRoom.sound,
    };
    setSound(room.sound);
    dispatch(changedRoomSound(room));
  };

  function getCapitalLetters(string) {
    let letter = '';
    const array = string.split(' ');
    array.forEach(element => {
      if (element.length > 3 && letter.length < 2) {
        letter += element.charAt(0);
      }
    });
    return letter.toUpperCase();
  }

  return (
    <>
    <ListItem
      divider
      button
      className={navItem}
      selected={selected}
      onClick={() => onSelected({ roomName, code: role.role, roomId })}
      onContextMenu={handleContextMenu}
    >
        <div className={roomListDiv}>

          {/* <Badge className={badge} color="primary" badgeContent={notifications || 0}>
            {<Avatar>{getCapitalLetters(roomName)}</Avatar>}
          </Badge> */}
          <div><Badge  badgeContent={notifications || 0} color="primary">
            <Avatar >{getCapitalLetters(roomName)}</Avatar>
            </Badge>
          </div>
          <ListItemText primary={roomName.toLowerCase()} />

        </div>
        <div>
          <IconButton aria-label="silenciar" size="small">
            {!sound && <VolumeOff />}
          </IconButton>
        </div>
        {isPrivate && (
          <ListItemIcon className={exitButton}>
            <Tooltip arrow title="Abandonar conversación">
              <IconButton aria-label="abandonar conversación" size="small" onClick={onExitRoom}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </ListItemIcon>
        )}
    </ListItem>
      {actualRoom?.role.role !== 'A1' && actualRoom?.role.role !== 'A2' && (
    <RoomContextMenu
      ref={roomContextMenuRef}
      role={actualRoom?.role.role}
      onChangeSound={onChangeSound}
      sound
    />
  )}
    </>
  );
}

export default React.memo(NavItem);
