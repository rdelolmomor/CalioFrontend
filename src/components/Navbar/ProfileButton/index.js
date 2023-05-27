import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { logout } from '../../../features/auth/authSlice';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from 'avataaars';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

function ProfileButton({ className, onClick }) {
  const dispatch = useDispatch();
  const { avatar, name, login } = useSelector(state => state.auth);
  const onLogout = () => dispatch(logout());

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Tooltip title="Ajustes del perfil" arrow>
        <Button onClick={onClick} className={className}>
          <Box>
            <Avatar {...avatar} avatarStyle={'Transparent'} />
          </Box>
          <div>
            <Typography variant="subtitle2" component="h6">
              {name?.toLowerCase()}
            </Typography>
            <Typography variant="body2" component="span">
              {login}
            </Typography>
          </div>
        </Button>
      </Tooltip>
      <Box>
        <Tooltip title="Cerrar sesión" arrow>
          <IconButton aria-label="cerrar sesión" onClick={onLogout}>
            <PowerSettingsNewIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </div>
  );
}

export default ProfileButton;
