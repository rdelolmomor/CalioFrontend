import { forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { SnackbarContent, useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    background: '#a885D8 !important',
    borderRadius: 4,
    padding: '12px 24px',
    flexWrap: 'wrap',
    color: '#fff',
    float: 'right',
    maxWidth: '90vw',
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
}));

const NotifyPopup = forwardRef(({ message, id }, ref) => {
  const { root, marginRight } = useStyles();
  const { closeSnackbar } = useSnackbar();

  return (
    <SnackbarContent ref={ref} className={root}>
      <Typography variant="body1" className={marginRight}>
        {message}
      </Typography>
      <Button margin="dense" onClick={() => closeSnackbar(id)} colorPrimary>
        <CloseIcon style={{ color: '#fff' }} />
      </Button>
    </SnackbarContent>
  );
});

export default NotifyPopup;
