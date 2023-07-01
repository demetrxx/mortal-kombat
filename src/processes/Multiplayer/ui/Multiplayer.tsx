import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/func';
import { Page } from 'widgets/Page/Page.tsx';
import laughSound from 'pages/ModeSelection/assets/sounds/laugh.mp3';
import { codeItems } from 'pages/Versus/lib/codes/codes.ts';
import { Players, PlayerSelection } from 'pages/PlayerSelection';
import { Versus } from 'pages/Versus';
import { charactersMap } from 'shared/characters/characters.ts';
import { playSwitchCharacterSound } from 'pages/PlayerSelection/lib/sounds/playSwitchCharacterSound.ts';
import cls from './Multiplayer.module.scss';
import { WsMsg, connect, sendChangeCharMsg, sendSelectCharMsg } from '../api/ws.ts';

interface MultiplayerProps {
  className?: string;
  onReset: () => void;
}

export const Multiplayer = memo((props: MultiplayerProps) => {
  const { className, onReset } = props;
  const [isLeft, setIsLeft] = useState(true);
  const [room, setRoom] = useState(0);
  const [connected, setConnected] = useState(false);
  const [bothJoined, setBothJoined] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [bothSelected, setBothSelected] = useState(false);
  const [left, setLeft] = useState(1);
  const [right, setRight] = useState(5);
  const [roomTakenNotification, setRoomTakenNotification] = useState(false);

  const handleWSMsg = useCallback(
    (msg: WsMsg) => {
      switch (msg.event) {
        case 'room-full':
          setRoomTakenNotification(true);
          return;
        case 'join':
          setConnected(true);
          setIsLeft(msg.position === 0);
          return;
        case 'start':
          new Audio(laughSound).play();
          setTimeout(() => setGameStarted(true), 3000);
          setBothJoined(true);
          return;
        case 'char':
          playSwitchCharacterSound();
          setLeft(msg.chars[0]);
          setRight(msg.chars[1]);
          return;
        case 'select':
          new Audio(charactersMap[msg.char].sound).play();

          if (msg.bothSelected) {
            setTimeout(() => setBothSelected(true), 2000);
            setTimeout(onReset, 7000);
          }
          return;
        case 'end-game':
          setTimeout(() => onReset(), 2000);
          return;
        default:
          // eslint-disable-next-line no-console
          console.log('unknown message');
      }
    },
    [onReset]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (connected) return;

      if (event.code === 'KeyQ') {
        setRoomTakenNotification(false);
        setRoom((pv) => (pv + 1) % 9);
      }

      if (event.code === 'Enter') {
        connect(room, handleWSMsg, onReset);
      }
    },
    [connected, handleWSMsg, onReset, room]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const players = useMemo<Players>(() => [left, right], [left, right]);

  if (!gameStarted) {
    return (
      <Page className={classNames(cls.screen, [className], { [cls.ready]: bothJoined })}>
        {connected ? (
          <span>Waiting for second player...</span>
        ) : (
          <>
            <span className={cls.btn}>Join Room</span>
            {roomTakenNotification && <span>Room is already taken, select another one</span>}

            <img className={cls.room} src={codeItems[room]} alt="room code" />
            <span className={cls.tip}>Use &quot;Q&quot; key to select room</span>
          </>
        )}
      </Page>
    );
  }

  return !bothSelected ? (
    <PlayerSelection
      right={right}
      left={left}
      active={isLeft ? 'left' : 'right'}
      onSelectCharacter={sendSelectCharMsg}
      onChangeCharacter={sendChangeCharMsg}
    />
  ) : (
    <Versus players={players} />
  );
});
