export const useSocket = () => {
  const socket = new WebSocket('wss://www.shinemustget.com/api/ws');
  
  return socket;
};
