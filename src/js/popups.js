import AdminPopup from '../components/Popups/AdminPopup';
import NotifyPopup from '../components/Popups/NotifyPopup';
import MentionAnswer from '../components/Popups/MentionAnswer';
import Disconnection from '../components/Popups/Disconnection';
import TokenExpired from '../components/Popups/TokenExpired';
import ring from '../resources/sounds/appointed.ogg';
import { Howl } from 'howler';

const howl = new Howl({ src: ring });
export function playSound() {
  // console.log('Playing sound!!!!');
  howl.play();
}

export const errorUpdatingAvatar = {
  message: 'Error actualizando el avatar',
  options: { variant: 'error' },
};

export const doneUpdatingAvatar = {
  message: 'Avatar actualizado',
  options: { variant: 'success' },
};

export const socketConnectError = {
  message: 'Error de autenticación',
  options: { variant: 'error' },
};

export const mentionMessage = message => ({
  message: `Has sido mencionado: ${message}`,
  options: { variant: 'info' },
});

export const answerMessage = message => ({
  message: `Han respondido a un mensaje tuyo: ${message}`,
  options: { variant: 'info' },
});

export const privateRequest = user => ({
  message: `Has recibido una invitación a una sala privada con ${user}`,
  options: { variant: 'info' },
});

export const customPopup = {
  message: 'Custom popup',
  options: {
    persist: true,
    content: (key, message) => <MentionAnswer key={key} message={message} />,
  },
};

export const disconnection = {
  options: {
    persist: true,
    content: key => <Disconnection key={key} id={key} />,
    anchorOrigin: { horizontal: 'center', vertical: 'top' },
    variant: 'warning',
  },
};

export const tokenExpired = {
  message: 'Sesión inválida',
  options: {
    preventDuplicate: true,
    persist: true,
    content: key => <TokenExpired key={key} id={key} />,
    anchorOrigin: { horizontal: 'center', vertical: 'top' },
  },
};

export const feedbackSended = {
  message: 'Se ha enviado el feedback, gracias',
  options: {
    variant: 'success',
  },
};

export const connectionError = { message: 'Error de conexión', options: { variant: 'error' } };

export const errorPopup = message => ({ message, options: { variant: 'error' } });
export const infoPopup = message => ({ message, options: { variant: 'info' } });
export const warnPopup = message => ({ message, options: { variant: 'warning' } });

export const adminPopup = message => ({
  message,
  options: {
    persist: true,
    variant: 'warning',
    content: key => <AdminPopup key={key} id={key} message={message} />,
  },
});

export const notifyPopup = message => ({
  message,
  options: {
    persist: true,
    variant: 'warning',
    content: key => <NotifyPopup key={key} id={key} message={message} />,
  },
});
