import { useState, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Person from '@material-ui/icons/Person';
import Lock from '@material-ui/icons/Lock';
import VpnKey from '@material-ui/icons/VpnKey';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../features/auth/authSlice';
import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';

const principalPath = '/calio/chat';

function Login({ className, logoClassName }) {
  const [form, setForm] = useState({ login: '', password: '' });
  const [hidePassword, setHidePassword] = useState(true);
  const [activeCaps, setActiveCaps] = useState(false);
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const history = useHistory();
  const [buttonActive, setButtonActive] = useState(true);

  useEffect(() => {
    if (auth.state === 'done' && auth.status === 'ACTIVO') {
      history.push(principalPath);
    }
  }, [auth, history]);

  const onChange = ({ target: { name, value } }) =>
    setForm(prev => ({ ...prev, [name]: value.trim() }));

  const toggleHidePassword = () => setHidePassword(prev => !prev);

  const onKeyUp = e => {
    const caps = e.getModifierState('CapsLock');
    setActiveCaps(caps);
  };

  const onSubmit = async e => {
    setButtonActive(false);
    e.preventDefault();
    dispatch(login(form));
  };

  const isSubmitDisabled = !form.login || !form.password || !buttonActive;

  return (
    <Box component="form" onSubmit={onSubmit} className={className}>
      <Box>
        <Logo className={logoClassName} />
        <FormControl variant="outlined">
          <InputLabel htmlFor="login-login">Prometheus ID</InputLabel>
          <OutlinedInput
            required
            variant="outlined"
            label="Prometheus ID"
            placeholder="Prometheus ID"
            id="login-login"
            name="login"
            type="text"
            value={form.login}
            onChange={onChange}
            startAdornment={
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="login-password">Contraseña</InputLabel>
          <OutlinedInput
            required
            inputRef={passwordRef}
            variant="outlined"
            label="Contraseña"
            placeholder="Contraseña"
            id="login-password"
            name="password"
            type={hidePassword ? 'password' : 'text'}
            value={form.password}
            onChange={onChange}
            onKeyUp={onKeyUp}
            onBlur={() => setHidePassword(true)}
            startAdornment={
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <Tooltip title="Ver Contraseña" placement="top" arrow>
                  <IconButton onClick={toggleHidePassword}>
                    {hidePassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            }
          />
          <Typography variant="body2" color="error">
            {activeCaps ? '¡Hey! Las mayúsculas están activas' : ' '}
          </Typography>
        </FormControl>
        <Button disableElevation
          disabled={isSubmitDisabled}
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<VpnKey />}
        >
          {auth.state === 'loading' ? 'Accediendo...' : 'Acceder con Prometheus ID'}
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
