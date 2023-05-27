import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';

const MAX_MSG_LENGTH = 300;

function CharacterCounter({ messageLength, className }) {
  const [isNearLimit, setIsNearLimit] = useState(MAX_MSG_LENGTH - messageLength <= 20);

  useEffect(() => {
    setIsNearLimit(MAX_MSG_LENGTH - messageLength <= 20);
  }, [messageLength]);

  return (
    <Fade in={isNearLimit} className={className}>
      <Box>
        <CircularProgress thickness={4} size={22} variant='determinate' value={messageLength / 3} />
        <Typography variant='caption'>{MAX_MSG_LENGTH - messageLength}</Typography>
      </Box>
    </Fade>
  );
}

export default CharacterCounter;
