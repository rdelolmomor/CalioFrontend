export const prepareOutgoingPrivateRoom = privateRoom => {
  const finalRoom = { ...privateRoom };
  finalRoom.roomName = finalRoom.guestName.toLowerCase();
  finalRoom.userLogin = finalRoom.guestLogin;
  delete finalRoom.creatorName;
  delete finalRoom.guestName;
  return finalRoom;
};

export const prepareIncomingPrivateRoom = privateRoom => {
  const finalRoom = { ...privateRoom };
  finalRoom.roomName = finalRoom.creatorName.toLowerCase();
  finalRoom.userLogin = finalRoom.creatorLogin;
  delete finalRoom.creatorName;
  delete finalRoom.guestName;
  return finalRoom;
};

export const filterIncomingPrivate = (rooms, roomId) =>
  Object.values(rooms).filter(room => room.private && room.roomId === roomId)[0];

export const filterOutgoingPrivate = (rooms, privateRoom) =>
  Object.values(rooms).filter(
    room =>
      room.private &&
      (room.userLogin === privateRoom.guestLogind || room.guestLogin === privateRoom.guestLogin)
  )[0];
