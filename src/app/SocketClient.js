import io from 'socket.io-client';
import { socketConnectError, errorPopup, tokenExpired } from '../js/popups';

class SocketClient {
  socket;

  connect(login, token, onSuccess, onError, onNotif, onDisconnect) {
     console.log('%cSocket inicializando...', 'color: seagreen', { login, token });
    if (onNotif) this.onNotif = onNotif;
    if (onSuccess) this.onSuccess = onSuccess;
    if (onError) this.onError = onError;
    if (onDisconnect) this.onDisconnect = onDisconnect;
    this.socket = io(process.env.REACT_APP_ENDPOINT, {
      auth: { login, token },
      autoConnect: false,
      reconnectionAttempts: 10,
    });
    this.socket.on('connect', () => {
      console.log('%cSocket on "connect"', 'color: royalblue');
      if (this.onSuccess instanceof Function) this.onSuccess(this.socket.id);
    });
    this.socket.on('connect_error', error => {
       console.error('%cSocket on "connect_error"', 'color: firebrick', error);
      this.onNotif(socketConnectError);
      setTimeout(() => {
        if (this.onError instanceof Function) this.onError();
      }, 2000);
    });
    this.socket.open();
  }

  disconnect() {
     //console.log('%cDesconectando socket...');
    if (!this.socket) return;
    this.socket.disconnect(() => {
      this.socket = null;
      console.log('%cSocket on "disconnect"', 'color: slateblue');
    });
  }

  emit(event, data, fn) {
    if (!this.socket) return;
    // console.log(`%cSocket emit on "${event}:`, 'color: royalblue', data);
    return this.socket.emit(event, data, response => {
      if (response.error) {
        // console.log(`%cSocket error response on "${event}:`, 'color: firebrick', response);
        if (response.error === 'Sesión inválida') {
          // TODO: Mostrar popup de error con un botón que permita volver al inicio
          this.onNotif(tokenExpired);
        }
        this.onNotif(errorPopup(response.error));
        return response.error;
      }
      fn(response);
    });
  }

  on(event, fun) {
    if (!this.socket) return;
    // console.log(`%cSocket on "${event}" handler set`, 'color: royalblue');
    this.socket.on(event, fun);
  }
}

export default SocketClient;
