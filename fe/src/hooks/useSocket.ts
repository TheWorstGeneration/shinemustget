export const useSocket = () => {
  const socket = new WebSocket('wss://www.shinemustget.com/api/ws');

  socket.onopen = () => {
    console.log('소켓 서버에 연결되었습니다.');
  };

  socket.onmessage = event => {
    console.log('소켓 메시지 수신: ', event.data);
  };

  return socket;
};
