import switchCharacter from '../../assets/sounds/switch.mp3';

export const playSwitchCharacterSound = () => {
  const audio = new Audio(switchCharacter);
  audio.play();
};
