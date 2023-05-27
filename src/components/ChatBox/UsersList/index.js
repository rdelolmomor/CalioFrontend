import { useState, useRef } from 'react';
import UserItem from './UserItem';
import { usersListStyles } from '../../../js/styles';
import { useSelector } from 'react-redux';
import { getGroupedUsers } from '../../../features/users/usersSlice';
import { getActiveRole } from '../../../features/rooms/roomsSlice';
import { UserLabel, NoResultsPlaceholder, NoUsersConnectedPlaceholder } from './Placeholders';
import UsersContextMenu from '../UsersContextMenu';

import { Card, CardContent, CardHeader, List, OutlinedInput, InputAdornment, useMediaQuery } from '@material-ui/core';


import {
  SearchOutlined,
} from '@material-ui/icons';




const filterUsers = ({ label, name }, search) => !!label || name.includes(search.toLowerCase());

function UserList() {
  const { root, header, content, list, item, searchBox } = usersListStyles();
  const usersContextMenuRef = useRef();
  const [groupedUsers, usersCount] = useSelector(getGroupedUsers);
  const role = useSelector(getActiveRole);
  const [search, setSearch] = useState('');
  const onSearchChange = ({ target: { value } }) => setSearch(value);
  const isSmallScreen = useMediaQuery(theme => theme.breakpoints.down('md'));

  function onUserContextMenu(position, user) {
    const openContextMenu = usersContextMenuRef.current;
    if (openContextMenu instanceof Function) openContextMenu(position, user);
  }

  const getFilteredUsers = () => {
    const finalUsers = search ? groupedUsers.filter(u => filterUsers(u, search)) : groupedUsers;
    if (usersCount === 0) return <NoResultsPlaceholder />;
    return finalUsers.map(user =>
      user.label ? (
        <UserLabel key={user.label} label={user.label} />
      ) : (
        <UserItem
          key={user.login}
          user={user}
          role={role}
          className={item}
          onUserContextMenu={onUserContextMenu}
        />
      )
    );
  };

  if (isSmallScreen) return null;

  return (
    <>
      <Card elevation={0} raised className={root}>
        <CardHeader className={header} title={`Online: ${usersCount}`} />
        <CardContent className={content}>
          <OutlinedInput
            className={searchBox}
            margin="dense"
            variant="outlined"
            value={search}
            onChange={onSearchChange}
            placeholder="Buscar usuarios..."
            endAdornment={
              <InputAdornment position="end">
                <SearchOutlined />
              </InputAdornment>
            }
          />
          <List disablePadding className={list}>
            {usersCount === 0 ? <NoUsersConnectedPlaceholder /> : getFilteredUsers()}
          </List>
        </CardContent>
      </Card>
      <UsersContextMenu ref={usersContextMenuRef} />
    </>
  );
}

export default UserList;
