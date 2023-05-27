/*
import { useState } from 'react';

const [LABEL_CHAR, MENTION_CHAR] = ['#', '@'];

function getBoxParams(inputValue) {
  const lastPos = inputValue.length - 1;
  const lastLetter = inputValue[lastPos] || '';
  const isValid = !inputValue[lastPos - 1] || inputValue[lastPos - 1] === ' ';
  const shouldOpenOnline = isValid && lastLetter === MENTION_CHAR;
  const shouldOpenLabels = isValid && lastLetter === LABEL_CHAR;
  return { lastPos, shouldOpenOnline, shouldOpenLabels };
}

const getActive = (shouldOpenLabels, shouldOpenOnline) => {
  return shouldOpenLabels ? 'labels' : shouldOpenOnline ? 'online' : null;
};

const initialInputBoxState = { active: null, charPos: null, search: '' };

function useInputBoxes(maxMsgLength, onMentionSelected, onLabelSelected) {
  const [input, setInput] = useState('');
  const [inputBox, setInputBox] = useState(initialInputBoxState);

  const closeInputBox = () => setInputBox(initialInputBoxState);
  const clearInput = () => setInput('');

  const onChange = ({ target: { value } }) => {
    if (value.length > maxMsgLength) return;
    const { lastPos, shouldOpenOnline, shouldOpenLabels } = getBoxParams(value);
    const active = getActive(shouldOpenLabels, shouldOpenOnline);
    setInput(value);
    if (active) setInputBox(prev => ({ ...prev, active, charPos: lastPos }));
    const { charPos } = inputBox;
    const shouldDeactivate = ![LABEL_CHAR, MENTION_CHAR].includes(charPos);
    if (shouldDeactivate) return closeInputBox();
    const search = value.slice(charPos + 1);
    setInputBox(prev => ({ ...prev, search }));
  };

  const onItemSelected = item => {
    const { active, charPos } = inputBox;
    if (!active) return;
    const isMention = active === 'mention';
    setInputBox(initialInputBoxState);
    setInput(prev => prev.slice(0, charPos));
    isMention ? onMentionSelected(item) : onLabelSelected(item);
  };

  return [input, inputBox, { closeInputBox, clearInput, onChange, onItemSelected }];
}

export default useInputBoxes;
*/