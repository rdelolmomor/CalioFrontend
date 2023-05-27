import { useState, useRef, useEffect } from 'react';
import { camposOriginales, propiedadesOriginales, avatarAleatorio } from '../../../js/avatars';

function useInterval(callback, delay = 1000) {
  const cb = useRef(callback);

  useEffect(() => {
    if (callback instanceof Function) cb.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (cb.current instanceof Function) cb.current();
    }
    const id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

function useRandomAvatar() {
  const [avatar, setAvatar] = useState(avatarAleatorio());

  useInterval(() => {
    const randomFieldIndex = Math.ceil(Math.random() * camposOriginales.length - 1);
    const randomField = camposOriginales[randomFieldIndex];
    const props = propiedadesOriginales[randomField];
    const randomPropIndex = Math.ceil(Math.random() * props.length - 1);
    setAvatar(prev => ({ ...prev, [randomField]: props[randomPropIndex] }));
  }, 150);

  return avatar;
}
export default useRandomAvatar;
