import { Players } from 'pages/PlayerSelection';

let socket: WebSocket | null = null;

type WsEvtType = 'room-full' | 'join' | 'start' | 'char' | 'select' | 'end-game';

export interface WsMsg {
  event: WsEvtType;
  position: number;
  chars: Players;
  bothSelected: boolean;
  char: number;
}

export function connect(room: number, onMessage: (msg: WsMsg) => void, onClose: () => void) {
  socket = new WebSocket(__API_URL__);

  socket.onopen = () => {
    socket?.send(JSON.stringify({ event: 'connection', roomId: room }));
  };

  socket.onmessage = (event: { data: string }) => {
    const message = JSON.parse(event.data);
    onMessage(message);
  };
  socket.onclose = () => {
    onClose();
    console.log('Socket closed');
  };
}

export const sendChangeCharMsg = async (position: number) => {
  const message = {
    char: position,
    event: 'char',
  };
  socket?.send(JSON.stringify(message));
};

export const sendSelectCharMsg = async () => {
  const message = {
    event: 'select',
  };
  socket?.send(JSON.stringify(message));
};
