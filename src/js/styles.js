import { makeStyles } from '@material-ui/core/styles';

export const rootStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    maxHeight: '100vh',
    backgroundColor: theme.palette.background.default,
  },
}));

export const navItemStyles = makeStyles({
  navItem: {
    '& span.MuiTypography-root': {
      textTransform: 'capitalize',
    },
  },
  badge: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    width: '100%',
    '& .MuiBadge-badge': { top: '50%' },
  },
  roomListDiv: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
  },
  exitButton: { minWidth: '40px !important' },
});

export const homeStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    margin: theme.spacing(6),
    marginRight: theme.spacing(10),
    marginLeft: theme.spacing(10),
    zIndex: 1,
  },
  loginContainer: {
    width: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiBox-root > div, & .MuiBox-root > h2': { marginBottom: theme.spacing(3) },
    '& .MuiBox-root': {
      width: '60%',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    },
    '& img': {
      width: '100%',
      marginBottom: theme.spacing(6),
    },
  },
  homeBoxContainer: {
    width: '50%',
    borderRight: '1px solid #33333342',
    position: 'relative',
    overflow: 'hidden',
    background: 'radial-gradient(circle, #d99962 50%, rgba(255,121,0,1) 100%)',
  },
  avatar: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    '& > svg': {
      width: '100%',
      height: '100%',
    },
  },
  title: {
    zIndex: 10000,
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    fontWeight: '700 !important',
    background: 'linear-gradient(0deg, rgba(51, 51, 51, 0.75) 0%, rgba(51, 51, 51, 0.2) 100%)',
  },
  logo: { maxWidth: 500 }
}));

export const navbarStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    width: 300,
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    boxSizing: 'border-box',
    width: 225,
    height: 65,
    padding: theme.spacing(1),
    paddingTop: 0,
    margin: '0 auto',
  },
  autofill: { flex: 1 },
  profileButton: {
    justifyContent: 'flex-start !important',
    '& .MuiBox-root': {
      width: 60,
      height: 60,
      marginRight: theme.spacing(1),
    },
    '& svg': {
      width: '100%',
      height: '100%',
    },
    '& .MuiTypography-subtitle2': { textTransform: 'capitalize' },
    '& .MuiBox-root + div': { textAlign: 'left' },
  },
  list: {
    maxHeight: 'calc(100% - 178px)',
    overflowY: 'auto !important',
    scrollbarWidth: 'thin',
    scrollbarColor: '#4a4a4a #dbdbdb',
    '& .MuiListSubheader-root': {
      backgroundColor: theme.palette.type === 'light' ? '#cecece' : '#333',
      '& .MuiBadge-root': {
        marginRight: theme.spacing(2),
      },
    },
  },
  searcher: { margin: theme.spacing(1) },
}));



export const profileDialogStyles = makeStyles( theme => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    scrollbarWidth: 'thin',
    scrollbarColor: '#4a4a4a #dbdbdb',
    zIndex: 2,
    flexWrap: 'wrap',
  },
  divAvatarColor: {
    display: 'flex',
    flexDirection: 'column',
    //justifyContent: 'space-evenly',
    marginTop: '30px',
    alignItems: 'center',
  },
  cuerpoAvatar: {
    display: 'flex',
    flexDirection: 'row',
  },
  selectSonido: {
    width: 'calc(50% - 60px)',
    marginRight: theme.spacing(2),
    '& .MuiSelect-root': { paddingTop: 12, paddingBottom: 12 },
  },
  btnOscuro: {
    height: 56,
    width: 'calc(50% - 16px)',
    margin: `8px !important`,
  },
  avatar: {
    width: '86%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& > svg': {
      position: 'relative',
      top: -16,
      left: -24,
    },
  },
  ajustesAvatar: {
    width: '75%',
    marginBottom: theme.spacing(2),
    '& > div': { width: 'calc(50% - 16px)', margin: theme.spacing(1) },
  },
}));

export const chatBoxStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
    marginLeft: 0,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: '0px 2px 2px rgba(0,0,0,0.25)',
    zIndex: 100,
    padding: '8px 16px !important',
    '& span.MuiCardHeader-title': { textTransform: 'capitalize' },
    '& .MuiCardHeader-action': { marginTop: 0 },
    '& .MuiCardHeader-title': { fontSize: 24 },
  },
}));

export const virtuosoContainerStyles = makeStyles(theme => ({
  root: {
    flex: 1,
    position: 'relative',
  },
  scrollButton: {
    position: 'absolute !important',
    bottom: 8,
    right: 16,
    width: 36,
    height: 36,
    padding: 0,
    borderRadius: '50%',
    minWidth: 0,
    zIndex: 1,
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: '#fff !important',
    boxShadow: theme.shadows[5],
    '&:hover': {
      backgroundColor: `${theme.palette.primary.dark} !important`,
    },
  },
  loader: {
    position: 'absolute',
    zIndex: 10,
    left: 'calc(50% - 75px)',
    top: 'calc(50% - 75px)',
  },
}));

export const inputStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    padding: theme.spacing(1),
    '& textarea': {
      scrollbarWidth: 'thin',
      scrollbarColor: '#4a4a4a #dbdbdb',
    },
  },
  innerContainer: {
    position: 'relative',
  },
  inputForm: {
    marginRight: `${theme.spacing(1)}px !important`,
    '& .MuiInputBase-root': { paddingRight: 80 },
  },
  buttonSend: {
    position: 'absolute !important',
    right: 28,
    bottom: window.chrome ? 16 : 21,
    backgroundColor: 'transparent !important',
  },
  extraContainer: {
    position: 'absolute !important',
    maxHeight: 241,
    width: 270,
    left: 16,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderBottom: 'none',
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: 0,
    backgroundColor: theme.palette.background.default,
    scrollbarWidth: 'thin',
    scrollbarColor: '#4a4a4a #dbdbdb',
    transform: `translate(0%, calc(-100% - ${window.chrome ? '75px' : '83px'})) !important`,
    '& span.MuiListItemText-primary': { textTransform: 'capitalize' },
  },
  extraSubheader: {
    fontSize: '20px !important',
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
    '& > div': {
      margin: 0,
      padding: 4,
    },
  },
  infoBox: {
    marginTop: theme.spacing(1),
    '& > div:not(:first-of-type)': { marginLeft: theme.spacing(2) },
    '& span.MuiChip-label': { textTransform: 'capitalize' },
  },
  quote: {
    boxSizing: 'border-box',
    margin: theme.spacing(1),
    marginTop: 0,
    padding: theme.spacing(1),
    marginLeft: theme.spacing(2),
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.default,
    '&::before': {
      content: '""',
      position: 'absolute',
      backgroundColor: '#FF7900',
      width: 5,
      height: '100%',
      borderRadius: theme.shape.borderRadius,
      left: -13,
      top: 0,
    },
    '& > p': {
      display: '-webkit-box',
      overflow: 'hidden',
      textAlign: 'start',
      '-webkit-box-orient': 'vertical',
      '-webkit-line-clamp': '2',
    },
    '& > p > span': {
      textTransform: 'capitalize',
      fontWeight: 'bold',
    },
    '& button': {
      position: 'absolute',
      right: 0,
      top: 0,
    },
  },
  characterCounter: {
    position: 'absolute',
    bottom: 4,
    right: 8,
    pointerEvents: 'none',
    '& .MuiTypography-caption': {
      display: 'block',
      width: '100%',
      position: 'absolute',
      bottom: 5,
      textAlign: 'center',
      fontSize: '0.7rem !important',
    },
    '& .MuiCircularProgress-determinate': {
      color: '#CA4A20 !important',
    },
  },
}));

export const messageStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    width: 'auto',
    cursor: 'default',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '& .MuiTypography-h6': {
      fontSize: '1rem',
      textTransform: 'capitalize',
    },
  },
  mine: {
    justifyContent: 'flex-end !important',
    '& .MuiListItemAvatar-root, & .avatar-placeholder': {
      marginRight: '0 !important',
      marginLeft: theme.spacing(2),
      order: 10,
    },
  },
  answered: {
    backgroundColor: theme.palette.type === 'light' ? '#EBFFE6' : '#68886D',
  },
  assigned: {
    backgroundColor: theme.palette.type === 'light' ? '#FEDD9E' : '#815139',
  },
  avatar: {
    alignSelf: 'flex-start',
    width: 56,
    height: 56,
    marginRight: theme.spacing(2),
    '& svg': {
      width: '100%',
      height: '100%',
    },
  },
  quote: {
    position: 'relative',
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.type === 'light' ? '#eee' : theme.palette.background.default,
    padding: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    '&::before': {
      content: '""',
      position: 'absolute',
      left: -theme.spacing(1) * 1.5,
      top: 0,
      height: '97.5%',
      width: 5,
      borderRadius: 32,
      backgroundColor: theme.palette.primary.main,
    },
    '& .MuiTypography-subtitle2 span': {
      textTransform: 'capitalize',
      fontWeight: 'bold',
    },
  },
  labelContainer: {
    marginTop: theme.spacing(1),
    '& > .MuiChip-root:not(:first-of-type)': {
      marginLeft: theme.spacing(1),
    },
  },
  text: {
    margin: '0 !important',
    // paddingTop: 8,
    // paddingBottom: 8,
    '& p.MuiListItemText-secondary': {
      color: theme.palette.type === 'light' ? '#000' : '#fff',
    },
  },
}));

export const usersListStyles = makeStyles(theme => ({
  root: {
    width: 325,
    margin: theme.spacing(1),
    marginLeft: 0,
    '& .MuiCardContent-root': { padding: 0 },
  },
  header: {
    boxSizing: 'border-box',
    borderBottom: `1px solid ${theme.palette.divider}`,
    boxShadow: '0px 2px 2px rgba(0,0,0,0.25)',
    zIndex: 100,
    '& span.MuiCardHeader-title': { textTransform: 'capitalize' },
  },
  content: { height: 'calc(100% - 88px)' },
  list: {
    height: 'calc(100% - 40px)',
    overflow: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: '#4a4a4a #dbdbdb',
    '& .MuiListSubheader-root': {
      backgroundColor: theme.palette.type === 'light' ? '#cecece' : '#333',
    },
  },
  item: {
    '& span.MuiTypography-root': {
      textTransform: 'capitalize',
    },
  },
  searchBox: {
    margin: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)}px)`,
  },
}));

export const mentionAnswerStyles = makeStyles(theme => ({
  root: {
    flexGrow: 'initial',
    minWidth: 288,
    //minWidth: '180',
    background: 'royalblue',
    borderRadius: 4,
    padding: '6px 16px',
    display: 'flex',
    flexDirection: 'column',
  },
}));

export const feedbackDialogStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > .MuiFormControl-root': {
      marginBottom: theme.spacing(2),
    },
  },
}));

export const loaderStyles = makeStyles(theme => ({
  root: { display: 'flex' },
  progress: { margin: '0 auto' },
}));

export const rewardListStyles = makeStyles(theme => ({
  list: {
    maxHeight: 200,
    width: '100%',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: '#4a4a4a #dbdbdb',
  },
  subheader: {
    backgroundColor: theme.palette.type === 'light' ? '#cecece !important' : '#333 !important',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    '& .MuiListItemText-root': {
      display: 'inline-flex',
    },
  },
}));

export const pollListStyles = makeStyles(theme => ({
  list: {
    maxHeight: '37.5vh',
    overflowY: 'auto',
    scrollbarWidth: 'thin',
    scrollbarColor: '#4a4a4a #dbdbdb',
  },
  actionTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 8,
  },
  pollItem: { flexWrap: 'wrap' },
  pollResults: { width: '100%' },
}));

export const menuSearchStyles = makeStyles(theme => ({
  dropdown: {
    display: 'flex',
    flexDirection: 'row',
    position: 'fixed',
    width: 400,
    top: '80px',
    right: '18px',
    border: '1px solid #dbdbdb',
    borderRadius: 4,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    color: '#dbdbdb',
  },
}));
