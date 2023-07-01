import selectionScreenAudio from '../../assets/sounds/selection.mp3';

const audio = new Audio(selectionScreenAudio);
audio.loop = true;
audio.volume = 0.7;
export const playSelectionScreenTheme = () => audio.play();
export const pauseSelectionScreenTheme = () => audio.pause();
