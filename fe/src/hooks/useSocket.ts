export const useSocket = () => {
  const socket = new WebSocket('wss://www.shinemustget.com/api/ws');
  
  socket.addEventListener("close", () => {
    socket.onopen;
  })

  return socket
};
