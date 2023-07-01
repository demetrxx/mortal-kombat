import { memo, useEffect, useState } from 'react';
import { Page } from 'widgets/Page/Page.tsx';
import { classNames } from 'shared/lib/func';
import { charactersMap } from 'shared/characters/characters.ts';
import { Players } from 'pages/PlayerSelection';
import { Codes } from '../Codes/Codes.tsx';
import cls from './Versus.module.scss';
import { playVersusSound } from '../../lib/sounds/playVersusSound.ts';
import vsImg from '../../assets/img/vs.gif';
import battleImg from '../../assets/img/battle.gif';
import dragonLeftImg from '../../assets/img/dragon-left.gif';
import dragonRightImg from '../../assets/img/dragon-right.gif';

interface VersusProps {
  players: Players;
}
const Versus = memo(({ players }: VersusProps) => {
  const [left, right] = players;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));

    setTimeout(() => playVersusSound(), 1000);
  }, []);

  return (
    <Page className={classNames(cls.screen, [], { [cls.mounted]: mounted })}>
      <img className={cls.battle} src={battleImg} alt="battle" />
      <img className={cls.versus} src={vsImg} alt="versus" />

      <img className={classNames(cls.dragon, [cls.left])} src={dragonLeftImg} alt="dragon" />
      <img className={classNames(cls.dragon, [cls.right])} src={dragonRightImg} alt="dragon" />

      <img
        className={classNames(cls.player, [cls.left])}
        src={charactersMap[left].versus}
        alt={charactersMap[left].name}
      />
      <img
        className={classNames(cls.player, [cls.right])}
        src={charactersMap[right].versus}
        alt={charactersMap[right].name}
      />

      <Codes className={cls.codes} />
    </Page>
  );
});

export { Versus };
