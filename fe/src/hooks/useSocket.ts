export const useSocket = () => {
  let message: any = ""
  const socket = new WebSocket('wss://www.shinemustget.com/api/ws');
  socket.onopen;

  socket.addEventListener("message", (message) => {
    message = message.data
  })

  return {
    socket,
    message
  }
};
