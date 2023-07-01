import versusScreenAudio from '../../assets/sounds/versus.mp3';

const audio = new Audio(versusScreenAudio);
export const playVersusSound = () => audio.play();
