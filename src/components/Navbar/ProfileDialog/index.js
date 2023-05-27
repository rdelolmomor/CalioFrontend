import React, { useState, useContext, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Dialog, Box, DialogContent, DialogActions, DialogTitle, FormControl, InputLabel, Tooltip, Select, IconButton, MenuItem } from '@material-ui/core';
import { profileDialogStyles } from '../../../js/styles';
import { ThemeContext } from '../../../contexts/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { updatedAvatar } from '../../../features/auth/authSlice';
import { addedPopup } from '../../../features/notifications/notifSlice';
import {
  propiedadesOriginales,
  propiedadesTraducidas,
  camposTraducidos,
  camposOriginales,
} from '../../../js/avatars';
import {
  CheckOutlined as IconoGuardar,
  ClearOutlined as IconoLimpiar,
} from '@material-ui/icons';
import { errorUpdatingAvatar, doneUpdatingAvatar } from '../../../js/popups';
import Avatar from 'avataaars';
import SelectColores from './SelectColores';

const ProfileDialog = forwardRef((_, ref) => {
  const { primaryColor, setPrimaryColor } = useContext(ThemeContext);
  const estilos = profileDialogStyles();
  const dispatch = useDispatch();
  const [avatar, avatarState] = useSelector(state => [state.auth.avatar, state.auth.avatarState]);

  const [visible, setVisible] = useState(false);
  const open = () => setVisible(true);
  const close = () => setVisible(false);

  const [previewAvatar, setPreviewAvatar] = useState(avatar);
  const changeAvatar = ({ target: { name, value } }) =>
    setPreviewAvatar(prev => ({ ...prev, [name]: value }));

  const applyChanges = () => dispatch(updatedAvatar(previewAvatar));

  useEffect(() => {
    if (avatarState === 'error') {
      dispatch(addedPopup(errorUpdatingAvatar));
    } else if (avatarState === 'done') {
      dispatch(addedPopup(doneUpdatingAvatar));
    }
  }, [avatarState, dispatch]);

  useImperativeHandle(ref, () => ({ open }));

  return (
    <Dialog
      open={visible}
      onClose={close}
      scroll="paper"
      aria-labelledby="dialogo-perfil-titulo"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle id="dialogo-perfil-titulo">Mi perfil</DialogTitle>
      <DialogContent className={estilos.root} dividers>
        <div className={estilos.cuerpoAvatar}>
          <div className={estilos.divAvatarColor}>
            <Box className={estilos.avatar}>
              <Avatar {...previewAvatar} avatarStyle={'Transparent'} />
            </Box>
            <SelectColores primaryColor={primaryColor} setPrimaryColor={setPrimaryColor} />
          </div>
          <Box className={estilos.ajustesAvatar}>
            {avatar &&
              camposOriginales.map((campo, index) => (
                <FormControl key={campo} variant="outlined">
                  <InputLabel id={`avatar-${index}`}>{camposTraducidos[index]}</InputLabel>
                  <Select
                    labelId={`avatar-${index}`}
                    label={camposTraducidos[index]}
                    name={campo}
                    value={previewAvatar[campo] || ''}
                    onChange={changeAvatar}
                  >
                    {propiedadesTraducidas[camposOriginales[index]].map((prop, subIndex) => (
                      <MenuItem key={prop} value={propiedadesOriginales[campo][subIndex]}>
                        {prop}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ))}
          </Box>
        </div>
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
            onClick={applyChanges}
          >
            <IconoGuardar />
          </IconButton>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
});

export default ProfileDialog;
