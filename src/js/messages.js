// eslint-disable-next-line
const urlRegexp = /(https?:\/\/([wW]{3}\.)?\w+[\._-][\w\/\.:?=%&#-]+)/gim;

export const rebuildMessage = msg => {
  let lastIndex = 0,
    match;
  const compoundText = [];
  while ((match = urlRegexp.exec(msg)) !== null) {
    compoundText.push({ type: 'text', value: msg.slice(lastIndex, match.index) });
    compoundText.push({ type: 'link', value: match[0] });
    lastIndex = match.index + match[0].length;
  }
  if (match === undefined) compoundText.push({ type: 'text', value: msg });
  else if (lastIndex !== msg.length)
    compoundText.push({ type: 'text', value: msg.slice(lastIndex) });
  return compoundText;
};
