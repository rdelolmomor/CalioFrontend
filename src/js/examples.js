import ChatIcon from '@material-ui/icons/Chat';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import ReplyIcon from '@material-ui/icons/Reply';
import AssignmentIcon from '@material-ui/icons/Assignment';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

const LOWEST_ROLES = ['A1', 'A2'];
//const ROLES = ['A1', 'A2', 'C1', 'C2', 'C3', 'S1', 'R1', 'Z1', 'Z2'];

export const getUserContextOptions = (role, user) => {
  let options = [];
  if (!user) return options;
  options.push({
    action: 'private',
    name: 'Abrir conversación',
    icon: <QuestionAnswerIcon fontSize="small" />,
  });
  if (role.canAnswerMention) {
    options.push({
      action: 'mention',
      name: 'Mencionar',
      icon: <AlternateEmailIcon fontSize="small" />,
    });
  }
  return options;
};

export const getRoomContextOptions = (role, room) => {
  let options = [];
  if (!LOWEST_ROLES.includes(role)) {
    if (room?.sound) {
      options.push({
        action: 'mute',
        name: 'Silenciar',
        icon: <VolumeOffIcon fontSize="small" />,
      });
    } else if (!room?.sound) {
      options.push({
        action: 'unmute',
        name: 'Activar Sonido',
        icon: <VolumeUpIcon fontSize="small" />,
      });
    }
  }
  return options;
};

export const getMessageContextOptions = (role, message, login) => {
  let options = [];
  if (!message) return options;
  const { role: messageRole, lastState, stateLOGIN } = message;
  if (role.canAnswerMention) {
    if (lastState < 4) {
      options.push({
        action: 'answer',
        name: 'Responder',
        icon: <ReplyIcon fontSize="small" />,
      });
    }
    if (role.role !== 'A1') {
      options.push({
        action: 'mention',
        name: 'Mencionar usuario',
        icon: <AlternateEmailIcon fontSize="small" />,
      });
    }
  }
  if (role.role === 'C1') {
    if (lastState < 3 || lastState === 5) {
      options.push({
        action: 'assign',
        name: 'Asignarme el mensaje',
        icon: <AssignmentIcon fontSize="small" />,
      });
    }
    if (lastState === 3 && stateLOGIN === login) {
      options.push({
        action: 'unassign',
        name: 'Desasignarme el mensaje',
        icon: <AssignmentIcon fontSize="small" />,
      });
    }
  }
  const { canSeeOnline } = role;
  if (canSeeOnline && (canSeeOnline === 'ALL' || canSeeOnline.includes(messageRole))) {
    options.push({
      action: 'private',
      name: 'Escribir en privado',
      icon: <ChatIcon fontSize="small" />,
    });
  }
  return options;
};
