/* eslint no-console: 0 */
import { memo, useCallback, useEffect, useState } from 'react';
// import laughSound from 'pages/ModeSelection/assets/sounds/laugh.mp3';
import { PlayerSelection, Position, Players } from 'pages/PlayerSelection';
import { Versus } from 'pages/Versus';
import { charactersMap } from 'shared/characters/characters.ts';
import { playSwitchCharacterSound } from 'pages/PlayerSelection/lib/sounds/playSwitchCharacterSound.ts';

interface SingleplayerProps {
  onReset: () => void;
}

export const Singleplayer = memo((props: SingleplayerProps) => {
  const { onReset } = props;
  const [players, setPlayers] = useState<Players | null>(null);
  const [left, setLeft] = useState(1);
  const [right, setRight] = useState(5);
  const [active, setActive] = useState<Position | null>('left');

  useEffect(() => {
    let timeout: number | null = null;

    if (players) {
      timeout = window.setTimeout(() => {
        setPlayers(null);
        onReset();
      }, 6000);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [onReset, players]);

  const handleSelectCharacter = useCallback(() => {
    if (active === 'left') {
      setActive('right');
      new Audio(charactersMap[left].sound).play();
      return;
    }

    if (active === 'right') {
      setActive(null);
      new Audio(charactersMap[right].sound).play();

      setTimeout(() => setPlayers([left, right]), 2000);
    }
  }, [active, left, right]);

  const handleChangeCharacter = useCallback(
    (id: number) => {
      playSwitchCharacterSound();

      if (active === 'left') {
        setLeft(id);
      } else {
        setRight(id);
      }
    },
    [active]
  );

  return !players ? (
    <PlayerSelection
      right={right}
      left={left}
      active={active}
      onSelectCharacter={handleSelectCharacter}
      onChangeCharacter={handleChangeCharacter}
    />
  ) : (
    <Versus players={players} />
  );
});
