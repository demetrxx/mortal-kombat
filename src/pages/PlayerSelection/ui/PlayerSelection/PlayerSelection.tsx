import { memo, useEffect } from 'react';
import { Page } from 'widgets/Page/Page.tsx';
import { classNames } from 'shared/lib/func';
import { charactersMap } from 'shared/characters/characters.ts';
import cls from './PlayerSelection.module.scss';
import { CharactersGrid } from '../CharactersGrid/CharactersGrid.tsx';
import {
  playSelectionScreenTheme,
  pauseSelectionScreenTheme,
} from '../../lib/sounds/playSelectionScreenTheme.ts';

export type Players = [number, number];

export type Position = 'left' | 'right';

interface PlayerSelectionProps {
  left: number;
  right: number;
  active: Position | null;
  onSelectCharacter: () => void;
  onChangeCharacter: (id: number) => void;
}

const PlayerSelection = memo((props: PlayerSelectionProps) => {
  const { left, right, active, onSelectCharacter, onChangeCharacter } = props;

  useEffect(() => {
    playSelectionScreenTheme();

    return () => {
      pauseSelectionScreenTheme();
    };
  }, []);

  return (
    <Page className={classNames(cls.screen, [])}>
      <h1 className={cls.title}>SELECT YOUR FIGHTER</h1>

      <CharactersGrid
        className={cls.grid}
        onChangeCharacter={onChangeCharacter}
        onSelectCharacter={onSelectCharacter}
        left={left}
        active={active}
        right={right}
      />

      <img
        className={classNames(cls.sprite, [cls.left])}
        src={charactersMap[left].sprite}
        alt={charactersMap[left].name}
      />
      <img
        className={classNames(cls.sprite, [cls.right])}
        src={charactersMap[right].sprite}
        alt={charactersMap[right].name}
      />

      <h2 className={cls.zone}>KOMBAT ZONE: SOUL CHAMBER</h2>
    </Page>
  );
});

export { PlayerSelection };
