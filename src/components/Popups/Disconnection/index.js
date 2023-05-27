import { forwardRef, useEffect } from 'react';
import { SnackbarContent, useSnackbar } from 'notistack';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import WarningIcon from '@material-ui/icons/Warning';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    background: '#d32f2f',
    borderRadius: 4,
    padding: '12px 24px',
    flexWrap: 'wrap',
    color: '#fff',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
}));

const Disconnection = forwardRef((props, ref) => {
  const { root, icon } = useStyles();
  const { closeSnackbar } = useSnackbar();
  const socketStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    if (socketStatus !== 'AUTENTICADO') closeSnackbar(props.id);
  }, [socketStatus, closeSnackbar, props.id]);

  return (
    <SnackbarContent ref={ref} className={root}>
      <WarningIcon className={icon} fontSize='large' />
      <Box>
        <Typography variant='h6'>Se ha perdido la conexión</Typography>
        <Typography variant='body2'>Intentando reconectar con el servidor...</Typography>
      </Box>
    </SnackbarContent>
  );
});

export default Disconnection;
