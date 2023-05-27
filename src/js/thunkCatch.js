import safeParse from './safeParse';
import { addedPopup } from '../features/notifications/notifSlice';
import { errorPopup, tokenExpired } from './popups';

const TOKEN_EXPIRED = 'Sesión inválida';

function thunkCatch(err, dispatch) {
  const responseError = err?.request?.response;
  if (responseError) {
    const error = safeParse(responseError, { error: 'Error del servidor' });
    if (error.error === TOKEN_EXPIRED) {
      dispatch(addedPopup(tokenExpired));
    } else {
      dispatch(addedPopup(errorPopup(error.error)));
    }
    throw new Error(error.error);
  }
  throw new Error(err);
}

export default thunkCatch;
