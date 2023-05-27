import { useState, useRef, useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useSelector, useDispatch } from 'react-redux';
import { selectMessageIds, addedQuote } from '../../../features/messages/messagesSlice';
import { selectFilteredMessageIds } from '../../../features/messages/filteredMessagesSlice';
import useVirtuosoPrepend from '../../../hooks/useVirtuosoPrepend';
import { getActiveRoom } from '../../../features/rooms/roomsSlice';
import Message from '../Message';
import FilteredMessage from '../FilteredMessage';
import MessageContextMenu from '../MessagesContextMenu';
import ScrollButton from '../ScrollButton';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { virtuosoContainerStyles } from '../../../js/styles';

const scrollbarStyle = {
  scrollbarWidth: 'thin',
  scrollbarColor: '#ff7900 #dbdbdb',
};

const VirtuosoContainer = ({ isFiltered }) => {
  const contextMenuRef = useRef();
  const virtuosoRef = useRef();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const activeRoom = useSelector(getActiveRoom);
  const status = useSelector(state => state.messages.status);
  const filteredStatus = useSelector(state => state.filteredMessages.status);
  const messageIds = useSelector(selectMessageIds);
  const filteredMessageIds = useSelector(selectFilteredMessageIds);
  const login = useSelector(state => state.auth.login);

  const dispatch = useDispatch();

  const { root, scrollButton, loader } = virtuosoContainerStyles();
  const [firstItemIndex, prependItems] = useVirtuosoPrepend(messageIds.length);
  const [filteredFirstItemIndex, filteredPrependItems] = useVirtuosoPrepend(
    filteredMessageIds.length
  );

  const scrollToBottom = useCallback(behavior => {
    const scrollOptions = { behavior, align: 'start', index: Number.MAX_VALUE };
    setTimeout(() => virtuosoRef?.current.scrollToIndex(scrollOptions));
  }, []);

  function onMessageContextMenu(position, message) {
    if (activeRoom?.private || message.login === login) return;
    const openContextMenu = contextMenuRef.current;
    if (openContextMenu instanceof Function) {
      openContextMenu(position, message);
    }
  }

  function onMessageDoubleClick(messageLogin, messageId, state) {
    if (!activeRoom?.role.canAnswerMention || messageLogin === login || state === 4) return;
    dispatch(addedQuote(messageId));
  }

  const isLoading = status === 'loading';
  const isFilteredLoading = filteredStatus === 'loading';

  //Si la carga se realiza desde MessagesSlice
  if (!isFiltered) {
    if (messageIds.length === 0)
      return (
        <Box className={root}>
          {isLoading && (
            <CircularProgress
              size={75}
              variant="indeterminate"
              color="primary"
              className={loader}
            />
          )}
        </Box>
      );

    return (
      <Box className={root}>
        {isLoading && (
          <CircularProgress size={75} variant="indeterminate" color="primary" className={loader} />
        )}
        <Virtuoso
          ref={virtuosoRef}
          firstItemIndex={firstItemIndex}
          initialTopMostItemIndex={messageIds.length - 1}
          atBottomStateChange={setIsBottom}
          startReached={prependItems}
          isScrolling={setIsScrolling}
          data={messageIds}
          style={scrollbarStyle}
          followOutput={isBottom ? 'smooth' : false}
          itemContent={(_, messageId) => (
            <Message
              id={messageId}
              onContextMenu={onMessageContextMenu}
              onDoubleClick={onMessageDoubleClick}
              isScrolling={isScrolling}
            />
          )}
        />
        <ScrollButton
          anchored={isBottom}
          onClick={() => scrollToBottom('smooth')}
          className={scrollButton}
        />
        <MessageContextMenu ref={contextMenuRef} />
      </Box>
    );
    //Si la carga se realiza desde FilteredMessagesSlice
  } else if (isFiltered) {
    if (filteredMessageIds.length === 0)
      return (
        <Box className={root}>
          {isFilteredLoading && (
            <CircularProgress
              size={75}
              variant="indeterminate"
              color="primary"
              className={loader}
            />
          )}
        </Box>
      );

    return (
      <Box className={root}>
        {isFilteredLoading && (
          <CircularProgress size={75} variant="indeterminate" color="primary" className={loader} />
        )}
        <Virtuoso
          ref={virtuosoRef}
          firstItemIndex={filteredFirstItemIndex}
          initialTopMostItemIndex={filteredMessageIds.length - 1}
          atBottomStateChange={setIsBottom}
          startReached={filteredPrependItems}
          isScrolling={setIsScrolling}
          data={filteredMessageIds}
          style={scrollbarStyle}
          followOutput={isBottom ? 'smooth' : false}
          itemContent={(_, messageId) => (
            <FilteredMessage
              id={messageId}
              onContextMenu={onMessageContextMenu}
              onDoubleClick={onMessageDoubleClick}
              isScrolling={isScrolling}
            />
          )}
        />
        <ScrollButton
          anchored={isBottom}
          onClick={() => scrollToBottom('smooth')}
          className={scrollButton}
        />
        <MessageContextMenu ref={contextMenuRef} />
      </Box>
    );
  }
};

export default VirtuosoContainer;
