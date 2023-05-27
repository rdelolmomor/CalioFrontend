import { useDispatch } from 'react-redux';
import { addedMention } from '../../../../features/messages/messagesSlice';

import {
  ListItem, ListItemText, Avatar,
} from '@material-ui/core';



function UserItem({ role, user, className, onUserContextMenu }) {

  console.log("User: ", user)

  const dispatch = useDispatch();

  const onClick = () => {
    role.canAnswerMention && dispatch(addedMention(user));
  };

  const handleContextMenu = e => {
    e.preventDefault();
    const { clientX: x, clientY: y } = e;
    onUserContextMenu({ x, y }, user);
  };

  function getCapitalLetters(string) {
    if(!string){return null}
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
    <ListItem
      button
      divider
      className={className}
      onClick={onClick}
      onContextMenu={handleContextMenu}
    >
      <Avatar style={{marginRight: '5px'}}>{getCapitalLetters(user.name)}</Avatar>&nbsp;
      
      <ListItemText primary={user.name} />

    </ListItem>
  );
}

export default UserItem;
