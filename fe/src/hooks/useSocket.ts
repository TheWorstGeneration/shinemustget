export const useSocket = () => {
  const socket = new WebSocket('wss://www.shinemustget.com/api/ws');
  
  socket.addEventListener("close", () => {
    console.log("Disconnect")
  })

  return socket
};
