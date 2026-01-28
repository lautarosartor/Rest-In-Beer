import { config } from 'services/config';
import io from 'socket.io-client';

let socket;

export const initiateSocket = (room) => {
  socket = io(config.URL_SOCKET, {
    path: '/socket',
    transports: ['websocket'],
  });
  console.log(`Connecting socket...`);
  
  if (socket && room) socket.emit('join', room); 
}

export const disconnectSocket = () => {
  console.log('Disconnecting socket...');
  if(socket) socket.disconnect();
}

export const subscribeToChatHistory = (cb) => {
  if (!socket) return(true);
  socket.on('chat history', msgs => {
    console.log('Historial del chat recibido :)');
    return cb(null, msgs);
  });
}

export const subscribeToChat = (cb) => {
  if (!socket) return(true);
  socket.on('chat', msg => {
    return cb(null, msg);
  });
}

export const sendMessage = (room, message) => {
  if (socket) socket.emit('chat', { room, message });
}