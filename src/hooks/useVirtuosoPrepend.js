import { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatedLastMessagesCount, fetchNextMessages } from '../features/messages/messagesSlice';

const FIRST_ITEM_INDEX = 5000;
const MESSAGE_FETCH_COUNT = 100;

function useVirtuosoPrepend(actualMessageCount) {
  const dispatch = useDispatch();
  const [firstItemIndex, setFirstItemIndex] = useState(FIRST_ITEM_INDEX);
  const lastMessagesCount = useSelector(state => state.messages.lastMessagesCount);

  const prependItems = useCallback(() => {
    if (actualMessageCount < MESSAGE_FETCH_COUNT || lastMessagesCount === -1) return;
    dispatch(fetchNextMessages());
  }, [dispatch, actualMessageCount, lastMessagesCount]);

  useEffect(() => {
    if (lastMessagesCount === 0) return setFirstItemIndex(FIRST_ITEM_INDEX);
    setFirstItemIndex(prev => prev - lastMessagesCount);
    if (lastMessagesCount > 0 && lastMessagesCount < 100) dispatch(updatedLastMessagesCount(-1));
  }, [lastMessagesCount, dispatch]);

  return [firstItemIndex, prependItems];
}

export default useVirtuosoPrepend;
