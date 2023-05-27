import { useState, forwardRef, useContext, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { feedbackSended, errorPopup } from '../../../js/popups';
import { makeStyles } from '@material-ui/core/styles';
import { addedPopup } from '../../../features/notifications/notifSlice';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { feedbackDialogStyles } from '../../../js/styles';
import axios from 'axios';

import {
  Dialog, DialogContent, DialogActions,DialogTitle, OutlinedInput, FormControl, 
  InputLabel, Select, MenuItem, Box, Typography, Tooltip, IconButton, 
} from '@material-ui/core';  

import {
  CheckOutlined as IconoGuardar,
  ClearOutlined as IconoLimpiar,
} from '@material-ui/icons';


const feedbackDefault = {
  type: 'Función incompleta',
  observations: '',
};

const useStyles = makeStyles((theme) => ({

  btnGuardar: {
    marginRight: 20,
    width: 30,
    height: 30,
    borderRadius: '50%',
    color: theme.palette.background.main,
    backgroundColor: theme.palette.primary.main,
  },

  btnCerrar: {
    marginRight: 20,
    width: 30,
    height: 30,
    borderRadius: '50%',
    color: theme.palette.background.main,
  },

}));



const FeedbackDialog = forwardRef((props, ref) => {
  const { primaryColor } = useContext(ThemeContext);
  const [visible, setVsible] = useState(false);
  const [feedback, setFeedback] = useState(feedbackDefault);
  const open = () => setVsible(true);
  const close = () => setVsible(false);
  const estilos = useStyles();
  function onChange({ target: { name, value } }) {
    setFeedback(prev => ({ ...prev, [name]: value }));
  }
  useImperativeHandle(ref, () => ({ open }));
  const dispatch = useDispatch();
  const { login, token } = useSelector(state => state.auth);

  async function onSendFeedback(e) {
    e.preventDefault();
    if (!feedback.type || !feedback.observations) {
      return dispatch(addedPopup(errorPopup('No se han rellenado todos los campos')));
    }
    const feedbackRequest = {
      VERSION: 'M4.0.0',
      DEPARTAMENTO: 'CALIO',
      APLICACION: 'Calio',
      TIPO: feedback.type,
      OBSERVACIONES: feedback.observations,
      LOGIN: login,
      tokenID: token,
    };
    const url = 'https://localhost:5010/api/nuevoReporte';
    try {
      const response = await axios.post(url, feedbackRequest);
      if (response.data === 'insertOK') {
        dispatch(addedPopup(feedbackSended));
        setFeedback(feedbackDefault);
        return close();
      }
      throw new Error('No se ha podido enviar el Feedback');
    } catch (err) {
      dispatch(addedPopup(errorPopup('No se ha podido enviar el Feedback')));
    }
  }

  const { root } = feedbackDialogStyles();

  return (
    <Dialog
      open={visible}
      onClose={close}
      scroll="paper"
      aria-labelledby="dialogo-feedback-titulo"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="dialogo-feedback-titulo">Feedback</DialogTitle>
      <DialogContent dividers>
        <Typography variant="subtitle2" color="textPrimary">
          Para colaborar con el progreso de la herramienta, ponemos a vuestra disposición este
          pequeño formulario desde el que podéis darnos feedback sobre su funcionamiento.
          Agradecemos vuestra paciencia mientras revisamos las solicitudes.
        </Typography>
        <br />
        <br />
        <Box component="form" className={root}>
          <FormControl required variant="outlined">
            <InputLabel id="select-tipo-reporte">Motivo</InputLabel>
            <Select label="Motivo" name="type" value={feedback.type} onChange={onChange}>
              <MenuItem value="Función incompleta">Función incompleta</MenuItem>
              <MenuItem value="Propuesta de mejora">Propuesta de mejora</MenuItem>
              <MenuItem value="Lentitud">Lentitud en la web</MenuItem>
              <MenuItem value="Otros">Otros</MenuItem>
            </Select>
          </FormControl>
          <FormControl required variant="outlined">
            <InputLabel id="input-observaciones-reporte">Observaciones</InputLabel>
            <OutlinedInput
              multiline
              rowsMax={3}
              label="Observaciones"
              name="observations"
              value={feedback.observations}
              onChange={onChange}
            />
          </FormControl>
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

        <Tooltip title="Guardar">
          <IconButton
            style={{ backgroundColor: primaryColor }}
            className={estilos.btnGuardar}
            onClick={onSendFeedback}
          >
            <IconoGuardar />
          </IconButton>
        </Tooltip>






        
      </DialogActions>
    </Dialog>
  );
});

export default FeedbackDialog;
