import { WebSocketServer } from 'ws';

const wss = new WebSocketServer(
  { port: 5000 },
  () => console.log(`Server started on 5000`)
);

const rooms = {} // Record<roomId, [leftClient, rightClient]>

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    message = JSON.parse(message);

    switch (message.event) {
      case 'connection':
        const {roomId} = message;

        if(!rooms[roomId]) {
          rooms[roomId] = [];
        }

        const room = rooms[roomId];

        if(room.length === 2) {
          ws.send(JSON.stringify({event: 'room-full'}));
          return;
        }

        ws.roomId = roomId;

        if(room[0]) {
          // right player entered
          ws.position = 1;
          ws.char = 5;
          room[1] = ws;
        } else {
          // left player entered
          ws.position = 0;
          ws.char = 1;
          room[0] = ws;
        }

        ws.send(JSON.stringify({ event: 'join', position: ws.position }));

        if(room.length === 2) {
          const msg = { event: 'start', chars: getChars(room) };
          broadcastMessage(room, msg);
        }

        return
      case 'char':
        if(ws.selected) return
        const {char} = message;
        ws.char = char;

        broadcastMessage(rooms[ws.roomId],{event: 'char', chars: getChars(rooms[ws.roomId])});
        return;
      case 'select':
        ws.selected = true;

        broadcastMessage(rooms[ws.roomId], {
          event: 'select',
          position: ws.position,
          char: ws.char,
          bothSelected: rooms[ws.roomId].every(client => client.selected)
        });
        return;
      default:
        console.log('unknown message');
    }
  });

  ws.on('close', () => {
    broadcastMessage(rooms[ws.roomId], { event: 'end-game' });
    delete rooms[ws.roomId];
  })
});

function getChars(room) {
  return room.map(client => client.char);
}
function broadcastMessage(room, msg) {
  room?.forEach(client => client?.send(JSON.stringify(msg)));
}
