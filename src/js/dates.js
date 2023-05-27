// En los mensajes de Calio se trabaja con el formato ISOString: "2021-06-28T09:15:20.000Z"

/**
 * Devuelve el tiempo: `horas:minutos:segundos`
 * @param {string} isoString
 * @returns {string}
 */
export const getHourTime = isoString => {
  const date = new Date(isoString);
  return date?.toLocaleTimeString();
};

/**
 * Devuelve el tiempo: `día/mes/año horas:minutos:segundos`
 * @param {string} isoString
 * @returns {string}
 */
export const getFullTime = isoString => {
  const date = new Date(isoString);
  return date.toLocaleString();
};

/**
 * Devuelve el tiempo para un mensaje en función del tipo de sala
 * @param {string} isoString
 * @param {string} roomType
 * @returns {string}
 */
export const getMessageTime = (isoString, roomType) => {
  const isCommonRoom = roomType === 'COMUN';
  return isCommonRoom ? getFullTime(isoString) : getHourTime(isoString);
};
