import { forwardRef } from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { mentionAnswerStyles } from '../../../js/styles';
import { SnackbarContent } from 'notistack';

const MentionAnswer = forwardRef(({ message }, ref) => {
  const { root } = mentionAnswerStyles();

  return (
    <SnackbarContent ref={ref} className={root}>
      <Typography variant='body1'>{message}</Typography>
      <OutlinedInput placeholder='Respuesta...' margin='dense' />
      <Button variant='outlined' margin='dense'>
        Responder
      </Button>
    </SnackbarContent>
  );
});

export default MentionAnswer;
