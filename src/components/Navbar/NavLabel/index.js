import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import Badge from '@material-ui/core/Badge';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import ChatBubble from '@material-ui/icons/ChatBubble';
import Announcement from '@material-ui/icons/Announcement';
import { useSelector } from 'react-redux';
import { hasRoomGroupNotifications } from '../../../features/notifications/notifSlice';

const LABEL_ICONS = {
  GENERAL: <Announcement />,
  SERVICIOS: <ChatBubble />,
  CONVERSACIONES: <QuestionAnswer />,
};

const NavLabel = ({ label }) => {
  const hasNotifications = useSelector(state => hasRoomGroupNotifications(state, label));
  return (
    <>
      <ListSubheader>
        <Badge color='primary' variant='dot' invisible={!hasNotifications}>
          {LABEL_ICONS[label]}
        </Badge>
        {label}
      </ListSubheader>
      <Divider />
    </>
  );
};

export default NavLabel;
