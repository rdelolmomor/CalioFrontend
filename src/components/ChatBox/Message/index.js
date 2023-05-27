import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import { messageStyles } from '../../../js/styles';
import safeParse from '../../../js/safeParse';
import { selectMessageById } from '../../../features/messages/messagesSlice';
import { selectUserById } from '../../../features/users/usersSlice';
import Avatar from '../Avatar';
import Primary from './Primary';
import Secondary from './Secondary';
import { useSelector } from 'react-redux';

const estiloCursor = { cursor: 'pointer' };

const Message = ({ id, isScrolling, onContextMenu, onDoubleClick }) => {
  const styles = messageStyles();
  const message = useSelector(state => selectMessageById(state, id));
  const [login, profileName, roomType] = useSelector(state => [
    state.auth.login,
    state.auth.name.toLowerCase(),
    state.rooms.entities[message?.roomId]?.type,
  ]);
  const receiverUser = useSelector(state => selectUserById(state, message?.receiver)) || '';

  if (!message) return null;

  const handleContextMenu = e => {
    e.preventDefault();
    const { clientX: x, clientY: y } = e;
    const { messageId, emitter, name, role, lastState, stateLOGIN } = message;
    onContextMenu({ x, y }, { messageId, login: emitter, name, role, lastState, stateLOGIN });
  };

  const getStyleFromState = () => {
    const { lastState } = message;
    if (lastState === 3) return styles.assigned;
    if (lastState === 4) return styles.answered;
    return '';
  };

  const getMentionName = mentionLogin =>
  mentionLogin === login ? profileName : receiverUser?.name || mentionLogin;
  const getStyleFromEmitter = () => (message.emitter === login ? styles.mine : '');
  const avatar = safeParse(message.avatar, message.avatar);

  return (
    <ListItem
      divider
      alignItems="center"
      id={message.messageId}
      className={`${styles.root} ${getStyleFromState()} ${getStyleFromEmitter()}`}
      onContextMenu={handleContextMenu}
    >
      <Box style={estiloCursor}>
        <Avatar className={styles.avatar} avatar={avatar} isScrolling={isScrolling} />
      </Box>
      <Box
        onDoubleClick={() => onDoubleClick(message.emitter, message.messageId, message.lastState)}
        style={estiloCursor}
      >
        <ListItemText
          className={styles.text}
          primary={<Primary name={message.name} date={message.date} roomType={roomType} />}
          secondary={
            <Secondary
              id={message.messageId}
              receiver={message.receiver}
              compoundMessage={message.compoundText}
              getMentionName={getMentionName}
            />
          }
        />
        {message.previousId && (
          <Box className={styles.quote}>
            <Typography component="h6" variant="subtitle2" color="textPrimary">
              en respuesta a {<span className="quote-user">{message.previousUserName}</span>}:
            </Typography>
            <Typography component="span" variant="body2" color="textSecondary">
              {message.previousMessage}
            </Typography>
          </Box>
        )}
        {message.labels && (
          <Box className={styles.labelContainer}>
            {message.labels.split(',').map(label => (
              <Chip key={label} label={label.trim().toUpperCase()} size="small" />
            ))}
          </Box>
        )}
      </Box>
    </ListItem>
  );
};

export default React.memo(Message);
