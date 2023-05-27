import { useEffect, useRef, useState, useContext } from 'react';
import { addedPopup } from '../../features/notifications/notifSlice';
import { disconnection } from '../../js/popups';
import { useSelector, useDispatch } from 'react-redux';
import { chatBoxStyles, menuSearchStyles } from '../../js/styles';
import { ThemeContext } from '../../contexts/ThemeContext';
import useRoomChange from '../../hooks/useRoomChange';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FeedbackIcon from '@material-ui/icons/Feedback';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import LightIcon from '@material-ui/icons/Brightness5';
import DarkIcon from '@material-ui/icons/Brightness3';
import CloseIcon from '@material-ui/icons/Close';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';  
import TextField from '@material-ui/core/TextField';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Input from './Input';
import UsersList from './UsersList';
import Avatar from '@material-ui/core/Avatar';
import VirtuosoContainer from './VirtuosoContainer';
import FeedbackDialog from './FeedbackDialog';
import AdminPanel from './AdminPanel';
import NotifyPanel from './NotifyPanel';
import {
  fetchFilteredMessages,
  setFilterProp,
} from '../../features/messages/filteredMessagesSlice';

const MAX_FILTER_LENGTH = 200;

function ChatBox() {
  const dispatch = useDispatch();
  const [openSearchMenu, setOpenSearchMenu] = useState(false);
  const [positionMenu, setPositionMenu] = useState(null);
  const [filter, setFilter] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);
  const feedbackRef = useRef();
  const adminRef = useRef();
  const notifyRef = useRef();
  const socketStatus = useSelector(state => state.auth.status);
  const activeRoom = useRoomChange();
  const { dropdown } = menuSearchStyles();
  const { root, header } = chatBoxStyles();
  const { theme } = useContext(ThemeContext);
  const changeTheme = theme.changeTheme;
  const darkMode = theme.darkMode;


  useEffect(() => {
    if (socketStatus === 'AUTENTICADO') dispatch(addedPopup(disconnection));
  }, [socketStatus, dispatch]);

  const onOpenFeedback = () => feedbackRef?.current?.open();
  const onOpenAdmin = () => adminRef?.current?.open();
  const onOpenNotify = () => notifyRef?.current?.open();

  function onFilterChange({ target: { value } }) {
    if (value.length >= MAX_FILTER_LENGTH) return;
    setFilter(value);
  }

  function handleSearchClick() {
    setOpenSearchMenu(!openSearchMenu);
  }

  //Cargar datos de mensajes filtrados
  function onSearchClick() {
    console.log('onSearchClick');
    dispatch(setFilterProp(filter));
    dispatch(fetchFilteredMessages());
    setIsFiltered(true);
  }

  //Cargar datos de mensajes filtrados
  function onCancelSearchClick() {
    setIsFiltered(false);
  }

  const onKeyPress = e => {
    if (e.code === 'Enter' && e.target.value) {
      e.preventDefault();
      onSearchClick();
    }
  };

  const handleMenuClick = event => {
    setOpenSearchMenu(false);
    setPositionMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setPositionMenu(null);
  };

  function getCapitalLetters(string) {
    let letter = '';
    const array = string?.split(' ');
    array?.forEach(element => {
      if (element.length > 3 && letter.length < 2) {
        letter += element.charAt(0);
      }
    });
    return letter.toUpperCase();
  }

  const isAdmin = activeRoom?.role?.role === 'Z2';
  const isntUser = activeRoom?.role?.role !== 'A1' && activeRoom?.role?.role !== 'A2';

  return (
    <>
      <UsersList />
      <Card elevation={0} raised className={root}>
        <CardHeader
          className={header}
          avatar={<Avatar>{getCapitalLetters(activeRoom?.roomName)}</Avatar>}
          title={activeRoom?.roomName || 'Ninguna sala seleccionada'}
          titleTypographyProps={true}
          action={
            <>
              {isAdmin && (
                <>
                  <Tooltip title="Administracion beta" arrow>
                    <IconButton aria-label="administracion" onClick={onOpenAdmin}>
                      <FastfoodIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              <>
                <Tooltip title="Menu" arrow>
                  <IconButton aria-label="menu" onClick={handleMenuClick}>
                    <MenuIcon />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="optionsMenu"
                  getContentAnchorEl={null}
                  anchorEl={positionMenu}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  open={Boolean(positionMenu)}
                  onClose={handleMenuClose}
                >
                  {isntUser && (
                    <MenuItem onClick={onOpenNotify}>
                      <IconButton aria-label="notificacion">
                        <AddAlertIcon />
                      </IconButton>
                      Notificaciones
                    </MenuItem>
                  )}
                  <MenuItem onClick={onOpenFeedback}> 
                    <IconButton aria-label="dar feedback">
                      <FeedbackIcon/> 
                    </IconButton>
                    Feedback
                  </MenuItem>
                  {darkMode ? (
                    <MenuItem onClick={changeTheme}>
                      <IconButton aria-label="modo claro">
                        <LightIcon />
                      </IconButton>
                      Modo Claro
                    </MenuItem>
                  ) : (
                    <MenuItem onClick={changeTheme}>
                      <IconButton aria-label="modo oscuro">
                        <DarkIcon />
                      </IconButton>
                      Modo Oscuro
                    </MenuItem>
                  )}
                </Menu>
                <Tooltip title="Buscar mensajes" arrow>
                  <IconButton aria-label="buscar mensajes" onClick={handleSearchClick}>
                    <SearchIcon />
                  </IconButton>
                </Tooltip>
                {openSearchMenu ? (
                  <div className={dropdown}>
                    <TextField
                      fullWidth
                      value={filter}
                      onChange={onFilterChange}
                      onKeyPress={onKeyPress}
                      name="search"
                      label="Busqueda*"
                      variant="outlined"
                    />
                    {!isFiltered ? (
                      <IconButton onClick={onSearchClick}>
                        <SearchIcon />
                      </IconButton>
                    ) : (
                      <IconButton onClick={onCancelSearchClick}>
                        <CloseIcon />
                      </IconButton>
                    )}
                  </div>
                ) : null}
              </>
            </>
          }
        />
        <VirtuosoContainer isFiltered={isFiltered} />
        <Input />
      </Card>
      <FeedbackDialog ref={feedbackRef} />
      {isAdmin && (
        <>
          <AdminPanel ref={adminRef} />
        </>
      )}
      {isntUser && (
        <>
          <NotifyPanel ref={notifyRef} />
        </>
      )}
    </>
  );
}

export default ChatBox;
