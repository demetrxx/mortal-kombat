import { useCallback, useState } from 'react';
import { ModeSelection, Mode } from 'pages/ModeSelection';
import { Multiplayer } from 'processes/Multiplayer';
import { Singleplayer } from 'processes/Singleplayer';

export default function App() {
  const [mode, setMode] = useState<Mode | null>(null);

  const handleResetGame = useCallback(() => {
    setMode(null);
  }, []);

  return (
    <div className="app">
      {!mode && <ModeSelection onModeSelect={setMode} />}
      {mode === 'single' && <Singleplayer onReset={handleResetGame} />}
      {mode === 'multi' && <Multiplayer onReset={handleResetGame} />}
    </div>
  );
}
