export const useSocket = () => {
  const socket = new WebSocket('wss://www.shinemustget.com/api/ws');

  socket.onopen = () => {
    console.log('소켓 서버에 연결되었습니다.');
  };

  socket.onmessage = event => {
    console.log('소켓 메시지 수신: ', event.data);
  };

  socket.onmessage = function(event) {
  const message = event.data;
  console.log('받은 메시지:', message);

  // 여기에서 메시지를 처리하거나 원하는 동작을 수행할 수 있습니다.
  };

  return socket;
};
