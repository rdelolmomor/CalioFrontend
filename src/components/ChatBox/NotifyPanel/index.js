import { useState, useEffect, useContext, forwardRef, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendNotifyAction } from '../../../middleware/socket.io/socket.actions';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { makeStyles } from '@material-ui/core/styles';
import {
  Dialog, DialogContent, DialogActions, DialogTitle, OutlinedInput, FormControl,
  InputLabel, Select, MenuItem, Box, Typography, Tooltip, IconButton
} from '@material-ui/core';

import {
  ClearOutlined as IconoLimpiar,
  NotificationsActive as IconoEnviar,
} from '@material-ui/icons';


const estilos = makeStyles();
const NotifyPanel = forwardRef((props, ref) => {
  const [action, setAction] = useState({ type: '', login: '' });
  const [payload, setPayload] = useState({});
  const { primaryColor } = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const activeRoomId = useSelector(state => state.rooms.active);
  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);

  useImperativeHandle(ref, () => ({ open }));

  useEffect(() => {
    if (action.type === 'POPUP') setPayload({ message: '' });
    else setPayload({});
  }, [action.type]);

  const onChange = ({ target: { name, value } }) => {
    setAction(prev => ({ ...prev, [name]: value }));
  };

  const onChangePayload = ({ target: { name, value } }) => {
    setPayload(prev => ({ ...prev, [name]: value }));
  };

  // Campo de texto: receptor de la acción
  // Selector de la acción: POPUP, DISCONNECT, UPDATE_ROOM [REMOVE_ROOM]
  // Campos para ejecutar la acción
  // { type: string, login: string, platformId: number, payload: {} }

  return (
    <Dialog open={isVisible} onClose={close} scroll="paper" maxWidth="sm" fullWidth>
      <DialogTitle>Enviar Notificación</DialogTitle>
      <DialogContent dividers>
      <Typography variant="subtitle2"> Utiliza ("/todos") para enviar una notificación a <b>todos los usuarios online de la actual sala.</b> Además, si es posible, 
      envía un mensaje claro y conciso.</Typography>
        <br />
        <br />
      
        <FormControl required variant="outlined" fullWidth>
          <InputLabel id="admin-receptor">Usuario Receptor</InputLabel>
          <OutlinedInput value={action.login} onChange={onChange} name="login" label="Usuario Receptor" />
        </FormControl>
        <br />
        <br />
        <FormControl required variant="outlined" fullWidth>
          <InputLabel id="admin-accion">¿Qué acción quieres realizar?</InputLabel>
          <Select label="¿Qué acción quieres realizar?" name="type" value={action.type} onChange={onChange}>
            <MenuItem value="">Selecciona una acción</MenuItem>
            <MenuItem value="POPUP">Mensaje de notificación</MenuItem>
          </Select>
        </FormControl>
        <Box>
          {action.type === 'POPUP' && (
            <>
            <br />
            <FormControl variant="outlined" required fullWidth>
              <InputLabel>Mensaje</InputLabel>
              <OutlinedInput
                label="Mensaje"
                multiline
                maxRows={2}
                name="message"
                value={payload.message}
                onChange={onChangePayload}
              />
            </FormControl>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Tooltip title="Cerrar">
          <IconButton
            className={estilos.btnCerrar}
            onClick={close}
          >
            <IconoLimpiar />
          </IconButton>
        </Tooltip>


        <Tooltip title="Enviar Notificación">
          <IconButton
            style={{ backgroundColor: primaryColor }}
            className={estilos.btnGuardar}
            onClick={() => {
              const { login, type } = action;
              dispatch(sendNotifyAction({ login, type, roomId: activeRoomId, payload }));
            }}
          >
            <IconoEnviar />
          </IconButton>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
});

export default NotifyPanel;
