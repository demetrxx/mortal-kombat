import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Page } from 'widgets/Page/Page.tsx';
import { classNames } from 'shared/lib/func';
import cls from './ModeSelection.module.scss';
import laughSound from '../../assets/sounds/laugh.mp3';

export type Mode = 'single' | 'multi';
interface ModeSelectionProps {
  onModeSelect: (mode: Mode) => void;
}

const ModeSelection = memo((props: ModeSelectionProps) => {
  const { onModeSelect } = props;
  const [isSingle, setIsSingle] = useState(true);
  const singleBtnRef = useRef<HTMLButtonElement>(null);
  const multiBtnRef = useRef<HTMLButtonElement>(null);
  const [selected, setSelected] = useState(false);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (selected) return;

      switch (event.code) {
        case 'ArrowUp':
        case 'ArrowDown':
          setIsSingle((pv) => !pv);
          break;
        case 'Enter':
          setSelected(true);

          if (isSingle) {
            new Audio(laughSound).play();
            setTimeout(() => onModeSelect(isSingle ? 'single' : 'multi'), 3000);
          } else {
            setTimeout(() => onModeSelect(isSingle ? 'single' : 'multi'), 1000);
          }
          break;
        default:
          break;
      }
    },
    [isSingle, onModeSelect, selected]
  );

  useEffect(() => {
    if (isSingle) {
      singleBtnRef.current?.focus();
    } else {
      multiBtnRef.current?.focus();
    }
  }, [isSingle]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Page className={classNames(cls.screen, [], { [cls.selected]: selected })}>
      <button ref={singleBtnRef} className={cls.btn} type="button">
        Singleplayer
      </button>
      <button ref={multiBtnRef} className={cls.btn} type="button">
        Multiplayer
      </button>
    </Page>
  );
});

export { ModeSelection };
