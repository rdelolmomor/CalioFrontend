import { useRef, useState, useEffect } from 'react';
import { inputStyles } from '../../../js/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import CharacterCounter from './CharacterCounter';
import { selectAllUsers } from '../../../features/users/usersSlice';
import { useDispatch, useSelector } from 'react-redux';
import {
  addedMention,
  addedLabel,
  removedLabel,
  removedMention,
  getMessageData,
} from '../../../features/messages/messagesSlice';
import { sendMessage } from '../../../middleware/socket.io/socket.actions';
import ExtraBox from './ExtraBox';
import Quote from './Quote';
import MessageInfo from './MessageInfo';

const labelChar = '#',
  userChar = '@';
const initialBoxState = { active: false, charPos: undefined, search: '' };

function getBoxParams(inputValue) {
  const lastPos = inputValue.length - 1;
  const lastLetter = inputValue[lastPos] || '';
  const isValid = !inputValue[lastPos - 1] || inputValue[lastPos - 1] === ' ';
  const shouldOpenOnline = isValid && lastLetter === userChar;
  const shouldOpenLabels = isValid && lastLetter === labelChar;
  return { lastPos, shouldOpenOnline, shouldOpenLabels };
}

const MAX_MSG_LENGTH = 300;

function Input() {
  const {
    root,
    extraContainer,
    extraSubheader,
    infoBox,
    quote,
    inputForm,
    buttonSend,
    characterCounter,
    innerContainer,
  } = inputStyles();
  const [input, setInput] = useState('');
  const inputRef = useRef();
  const onlineUsers = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const [quoteId, mention, labels] = useSelector(getMessageData);
  const [activeRoomId, activeRoom] = useSelector(state => [
    state.rooms.active,
    state.rooms.entities[state.rooms.active]?.role,
  ]);
  // Estado para los cajones de usuarios conectados y etiquetas
  const [onlineBox, setOnlineBox] = useState(initialBoxState);
  const [labelsBox, setLabelsBox] = useState(initialBoxState);
  const removeMention = () => dispatch(removedMention());
  const removeLabel = labelToRemove => dispatch(removedLabel(labelToRemove));

  const onChange = ({ target: { value } }) => {
    if (value.length > MAX_MSG_LENGTH) return;
    const { lastPos, shouldOpenOnline, shouldOpenLabels } = getBoxParams(value);
    if (!onlineBox.active && !labelsBox.online && shouldOpenOnline) {
      setOnlineBox({ active: true, search: '', charPos: lastPos });
    }
    if (!labelsBox.active && !onlineBox.active && shouldOpenLabels) {
      setLabelsBox({ active: true, search: '', charPos: lastPos });
    }
    setInput(value);
    if (onlineBox.active) {
      setOnlineBox(prev =>
        value[onlineBox.charPos] !== userChar
          ? { ...prev, active: false }
          : { ...prev, search: value.slice(prev.charPos + 1) }
      );
    }
    if (labelsBox.active) {
      setLabelsBox(prev =>
        value[labelsBox.charPos] !== labelChar
          ? { ...prev, active: false }
          : { ...prev, search: value.slice(prev.charPos + 1) }
      );
    }
  };

  const onExtraBoxItemSelected = (origin, item) => {
    const isOnline = origin === 'online';
    isOnline
      ? setOnlineBox(prev => ({ ...prev, active: false }))
      : setLabelsBox(prev => ({ ...prev, active: false }));
    setInput(prev => prev.slice(0, isOnline ? onlineBox.charPos : labelsBox.charPos));
    isOnline ? dispatch(addedMention(item)) : dispatch(addedLabel(item));
  };

  const onKeyPress = e => {
    if (e.ctrlKey && e.code === 'NumpadEnter' && e.target.value) {
      setInput(input + '\n');
    }
    if (!e.ctrlKey) {
      if ((e.code === 'Enter' && e.target.value) || (e.code === 'NumpadEnter' && e.target.value)) {
        e.preventDefault();
        onSendMessage();
      }
    }
  };

  function onSendMessage() {
    if (!input) return;
    const messageData = {
      message: input,
      receiver: mention?.login,
      labels: labels.map(l => l.tag).join(),
    };
    if (quoteId) messageData.previousId = quoteId;
    dispatch(sendMessage(messageData));
    setInput('');
  }

  useEffect(() => {
    if ([mention, labels, quoteId].some(Boolean)) inputRef.current?.focus();
  }, [mention, labels, quoteId]);

  if ((activeRoomId === 10617 || activeRoomId === 12325) && !activeRoom?.canSendRelease)
    return null;

  return (
    <Box className={root} component="form">
      <Quote className={quote} quoteId={quoteId} />
      <Box className={innerContainer}>
        <FormControl fullWidth className={inputForm}>
          <TextField
            inputRef={inputRef}
            id="outlined-multiline-static"
            placeholder="Escribe un mensaje aquí"
            variant="outlined"
            onKeyPress={onKeyPress}
            rows={2}
            value={input}
            onChange={onChange}
            multiline
          />
        </FormControl>
        <CharacterCounter messageLength={input.length} className={characterCounter} />
        <IconButton size="small" className={buttonSend} disabled={!input} onClick={onSendMessage}>
          <SendIcon fontSize="large" />
        </IconButton>
      </Box>
      {activeRoom?.canAnswerMention && (
        <ExtraBox
          type="online"
          active={!mention && onlineBox.active}
          search={onlineBox.search}
          content={onlineUsers}
          onClick={onExtraBoxItemSelected}
          containerStyle={extraContainer}
          subheaderStyle={extraSubheader}
          close={() => setOnlineBox(prev => ({ ...prev, active: false }))}
        />
      )}
      <MessageInfo
        labels={labels}
        mention={mention}
        removeMention={removeMention}
        removeLabel={removeLabel}
        className={infoBox}
      />
    </Box>
  );
}

export default Input;
