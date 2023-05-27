import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Collapse from '@material-ui/core/Collapse';
import { useSelector, useDispatch } from 'react-redux';
import { selectMessageById, removedQuote } from '../../../../features/messages/messagesSlice';

function Quote({ className, quoteId }) {
  const dispatch = useDispatch();
  const quote = useSelector(state => selectMessageById(state, quoteId));

  function onRemoveQuote() {
    dispatch(removedQuote());
  }

  return (
    <Collapse in={Boolean(quote)}>
      <Box className={className}>
        <Typography variant='body2' color='textSecondary'>
          En respuesta a {<span className='quote-name'>{quote?.name}</span>}:
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {quote?.message}
        </Typography>
        <IconButton size='small' onClick={onRemoveQuote}>
          <CancelIcon fontSize='small' />
        </IconButton>
      </Box>
    </Collapse>
  );
}

export default Quote;
