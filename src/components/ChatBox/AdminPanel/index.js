import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { sendAdminAction } from '../../../middleware/socket.io/socket.actions';

const ROLES = [
  'Agente',
  'Superagente',
  'Coordinador/Formador',
  'Comunicación',
  'Recursos Humanos',
  'Responsable',
  'Supervisor',
  'Administrador',
];

const AdminPanel = forwardRef((props, ref) => {
  const [action, setAction] = useState({ type: '', login: '' });
  const [payload, setPayload] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  const activeRoomId = useSelector(state => state.rooms.active);
  const open = () => setIsVisible(true);
  const close = () => setIsVisible(false);

  useImperativeHandle(ref, () => ({ open }));

  useEffect(() => {
    if (action.type === 'POPUP') setPayload({ message: '' });
    else if (action.type === 'UPDATE_ROOM') setPayload({ roomId: '', role: '' });
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

  // POPUP: Input => Mensaje
  // DISCONNECT => NADA
  // UPDATE_ROOM => ID sala, rol

  return (
    <Dialog open={isVisible} onClose={close} scroll="paper" maxWidth="sm" fullWidth>
      <DialogTitle>Panel de Administracion [solo Z2 -en pruebas-]</DialogTitle>
      <DialogContent dividers>
        <FormControl required variant="outlined" fullWidth>
          <InputLabel id="admin-receptor">Receptor</InputLabel>
          <OutlinedInput value={action.login} onChange={onChange} name="login" label="Receptor" />
        </FormControl>
        <br />
        <br />
        <FormControl required variant="outlined" fullWidth>
          <InputLabel id="admin-accion">Acción</InputLabel>
          <Select label="Acción" name="type" value={action.type} onChange={onChange}>
            <MenuItem value="">Selecciona una acción</MenuItem>
            <MenuItem value="UPDATE_ROOM">Añadir/modificar sala</MenuItem>
            <MenuItem value="DISCONNECT">Forzar desconexión</MenuItem>
            <MenuItem value="POPUP">Mensaje de Administración</MenuItem>
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
          {action.type === 'UPDATE_ROOM' && (
            <>
              <br />
              <FormControl variant="outlined" required fullWidth>
                <InputLabel>ID de sala</InputLabel>
                <OutlinedInput
                  label="ID de sala"
                  type="number"
                  name="roomId"
                  value={payload.roomId}
                  onChange={onChangePayload}
                />
              </FormControl>
              <br />
              <br />
              <FormControl variant="outlined" required fullWidth>
                <InputLabel>Etiqueta de rol</InputLabel>
                <Select
                  label="Etiqueta de rol"
                  name="role"
                  value={payload.role}
                  onChange={onChangePayload}
                >
                  {ROLES.map(roleTag => (
                    <MenuItem key={roleTag} value={roleTag}>
                      {roleTag}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cerrar</Button>
        <Button
          color="primary"
          onClick={() => {
            const { login, type } = action;
            dispatch(sendAdminAction({ login, type, roomId: activeRoomId, payload }));
          }}
        >
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
});

export default AdminPanel;
