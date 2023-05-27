import { forwardRef } from 'react';
import { SnackbarContent, useSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { makeStyles } from '@material-ui/core/styles';
import { logout } from '../../../features/auth/authSlice';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    background: '#d32f2f',
    borderRadius: 4,
    padding: '12px 24px',
    flexWrap: 'wrap',
    color: '#fff',
    width: '100%',
  },
  marginRight: {
    marginRight: theme.spacing(2),
  },
  button: {
    color: '#fff',
    borderColor: '#fff',
  },
}));

const TokenExpired = forwardRef((props, ref) => {
  const { root, marginRight, button } = useStyles();
  const { closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const onExit = () => {
    dispatch(logout());
    closeSnackbar(props.id);
  };

  return (
    <SnackbarContent ref={ref} className={root}>
      <WarningIcon className={marginRight} fontSize='large' />
      <Typography variant='h6' className={marginRight}>
        La sesión ha caducado
      </Typography>
      <Button
        disableElevation
        className={button}
        variant='outlined'
        endIcon={<PowerSettingsNewIcon />}
        onClick={onExit}
      >
        Salir
      </Button>
    </SnackbarContent>
  );
});

export default TokenExpired;
