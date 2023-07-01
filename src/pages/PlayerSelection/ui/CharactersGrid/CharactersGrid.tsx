import { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/func';
import { charactersList } from 'shared/characters/characters.ts';
import cls from './CharactersGrid.module.scss';

interface CharactersGridProps {
  className?: string;
  active: 'left' | 'right' | null;
  left: number;
  right: number;
  onChangeCharacter: (id: number) => void;
  onSelectCharacter: () => void;
}

const navigation = {
  up: (val: number) => (val <= 5 ? val + 10 : val - 5),
  down: (val: number) => (val >= 11 ? val - 10 : val + 5),
  left: (val: number) => (val % 5 === 1 ? val + 4 : val - 1),
  right: (val: number) => (val % 5 === 0 ? val - 4 : val + 1),
};

export const CharactersGrid = memo((props: CharactersGridProps) => {
  const { className, onChangeCharacter, active, left, right, onSelectCharacter } = props;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      let direction: keyof typeof navigation | undefined;

      switch (event.code) {
        case 'ArrowLeft':
          direction = 'left';
          break;
        case 'ArrowUp':
          direction = 'up';
          break;
        case 'ArrowRight':
          direction = 'right';
          break;
        case 'ArrowDown':
          direction = 'down';
          break;
        case 'Enter':
          onSelectCharacter();
          break;
        default:
          break;
      }

      if (direction && active) {
        onChangeCharacter(navigation[direction](active === 'left' ? left : right));
      }
    },
    [active, left, onChangeCharacter, onSelectCharacter, right]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className={classNames(cls.charactersGrid, [className])}>
      {charactersList.map((char) => (
        <div
          key={char.id}
          className={classNames(cls.item, [], {
            [cls.left]: char.id === left,
            [cls.right]: char.id === right,
          })}
        >
          <img className={cls.avatar} src={char.avatar} alt={char.name} />
        </div>
      ))}
    </div>
  );
});
