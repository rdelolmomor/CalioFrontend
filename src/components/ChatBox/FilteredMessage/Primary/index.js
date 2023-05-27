import Typography from '@material-ui/core/Typography';
import { getMessageTime } from '../../../../js/dates';

function Primary({ name, date, roomType }) {
  return (
    <>
      <Typography component='span' variant='h6' color='textPrimary'>
        {name}
      </Typography>
      <Typography component='span' variant='body2' color='textPrimary'>
        &nbsp;&nbsp;•&nbsp;&nbsp;
        {getMessageTime(date, roomType)}h
      </Typography>
    </>
  );
}

export default Primary;
