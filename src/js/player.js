import { Howl } from 'howler';

export function playSound(sound) {
  let howl;
  if (typeof sound === 'string') {
    howl = new Howl({ src: sound });
  } else if (typeof sound === 'object') {
    howl = new Howl({ src: sound.src });
  }
  howl?.play();
}
