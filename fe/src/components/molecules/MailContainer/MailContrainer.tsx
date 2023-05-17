import { MailBox } from '@/components/atoms/MailBox/MailBox';
import { useInnerWidth } from '@/hooks/useInnerWidth';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { useSocket } from '@/hooks/useSocket';
import { selectModal, setMailBox } from '@/store/modules/modal';
import styled from '@emotion/styled';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MailContainerDiv = styled.aside<{ isMailBox: boolean }>`
  position: fixed;
  top: ${({ isMailBox }) => (isMailBox ? '6.5rem' : '20px')};
  right: ${({ isMailBox }) => (isMailBox ? 'calc(10rem - 100px)' : '18rem')};

  box-shadow: 0 0 0.5rem 1px #22222225;
  border-radius: ${({ isMailBox }) => (isMailBox ? '.5rem' : '50%')};
  padding: 0 1rem;
  width: ${({ isMailBox }) => (isMailBox ? '300px' : '3rem')};
  height: ${({ isMailBox }) => (isMailBox ? '300px' : '3rem')};

  z-index: 1000;

  background-color: ${({ isMailBox }) => (isMailBox ? '#ffffff' : '#ffffff')};

  overflow-x: hidden; // 가로 스크롤 숨기기
  overflow-y: scroll; // 세로 스크롤 활성화
  &::-webkit-scrollbar {
    display: none; // 스크롤바 숨기기
  }

  @media screen and (max-width: 960px) {
    right: ${({ isMailBox }) => (isMailBox ? '1rem' : '9rem')};
  }
`;

const MailBadge = styled.div<{ isMailBox: boolean; isEmpty: number }>`
  position: absolute;
  top: 0.8rem;
  left: 0.75rem;

  width: 0.4rem;
  height: 0.4rem;

  border-radius: 50%;
  box-shadow: 0 0 1px 2px #ffffff;
  background-color: #ff0000;

  align-items: center;
  justify-content: center;

  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 900;

  z-index: 1000;

  display: ${({ isMailBox, isEmpty }) =>
    isMailBox || isEmpty === 0 ? 'none' : 'flex'};
`;

const MailContainerHeader = styled.header<{ isMailBox: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isMailBox }) =>
    isMailBox ? 'space-between' : 'center'};

  position: sticky;
  top: 0;

  width: 100%;
  height: 3rem;

  background-color: #ffffff;
  border-bottom: ${({ isMailBox }) => (isMailBox ? '1px' : '0px')} solid
    #22222225;

  padding: ${({ isMailBox }) => (isMailBox ? '1rem' : '0')};
  margin-bottom: 1rem;
`;

const TotalCheckButton = styled.button<{ isMailBox: boolean }>`
  display: ${({ isMailBox }) => (isMailBox ? 'flex' : 'none')};
`;

const MailContainerMain = styled.main<{ isMailBox: boolean }>`
  display: ${({ isMailBox }) => (isMailBox ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export interface mailList {
  message: string;
  formattedCreatedAt: string;
  score: string;
}

export interface deleteMailList {
  deleteStart: string;
  deleteEnd: string;
}

export function MailContainer() {
  const router = useRouter();
  const isLandingPage = router.pathname === '/';
  const { isMailBox } = useAppSelector(selectModal);
  const [mailList, setMailList] = useState<mailList[]>([]);
  const [deleteScore, setDeleteScore] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleMailContainer = () => {
    dispatch(setMailBox());
  };

  // const socket = useSocket();
  // socket.onopen;

  // useEffect(() => {
  //   socket.onmessage = event => {
  //     const message = JSON.parse(event.data);
  //     console.log(message);

  //     if (Array.isArray(message)) {
  //       for (let i = 0; i < message.length; i++) {
  //         setMailList(prev => [...prev, message[i]]);
  //       }
  //     } else {
  //       if (message.cursor != undefined && message.cursor != '-1.0') {
  //         const jsonStr = JSON.stringify({ "cursor": message.cursor });
  //         socket.send(jsonStr);
  //       }
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   socket.onopen = () => {
  //   console.log('WebSocket connection opened');
  //   };
  //   console.log('change socket');
  //   const handleSocketMessage = (event:any) => {
  //     console.log('receive message');
  //     const message = JSON.parse(event.data);
  //     console.log(message);

  //     if (Array.isArray(message)) {
  //       for (let i = 0; i < message.length; i++) {
  //         setMailList(prev => [...prev, message[i]]);
  //       }
  //     } else {
  //       if (message.cursor != undefined && message.cursor != '-1.0') {
  //         const jsonStr = JSON.stringify({ cursor: message.cursor });
  //         socket.send(jsonStr);
  //       }
  //     }
  //   };

  //   socket.addEventListener('message', handleSocketMessage);

  //   return () => {
  //     socket.removeEventListener('message', handleSocketMessage);
  //     socket.onopen = null;
  //   };
  // }, []);

  const [socket, setSocket] = useState<WebSocket | null>(null);

  const handleSocketClose = () => {
    socket?.removeEventListener('close', handleSocketClose);
    reconnect();
  };

  useEffect(() => {
    const newSocket = new WebSocket('wss://www.shinemustget.com/api/ws');
    setSocket(newSocket);

    newSocket.addEventListener('close', handleSocketClose);

    return () => {
      newSocket.removeEventListener('close', handleSocketClose);
    };
  }, []);

  const reconnect = () => {
    const newSocket = new WebSocket('wss://www.shinemustget.com/api/ws');
    setSocket(newSocket);
    newSocket.addEventListener('close', handleSocketClose);
  };

  useEffect(() => {
    if (!socket) return;

    const handleSocketMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      console.log(message);

      if (Array.isArray(message)) {
        for (let i = 0; i < message.length; i++) {
          setMailList(prev => [...prev, message[i]]);
        }
      } else {
        if (message.cursor != undefined && message.cursor != '-1.0') {
          const jsonStr = JSON.stringify({ cursor: message.cursor });
          socket.send(jsonStr);
        }
      }
    };

    socket.addEventListener('message', handleSocketMessage);

    return () => {
      socket.removeEventListener('message', handleSocketMessage);
    };
  }, [socket]);

  useEffect(() => {
    const jsonStr = JSON.stringify({
      deleteStart: deleteScore,
      deleteEnd: deleteScore,
    });

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(jsonStr);
      console.log('jsonStr', jsonStr);
      setMailList(prevMailList =>
        prevMailList.filter(mail => mail.score !== deleteScore),
      );
    }
  }, [deleteScore]);

  const handleTotalCheck = () => {
    const jsonStr = JSON.stringify({
      deleteStart: mailList[0].score,
      deleteEnd: mailList[mailList.length - 1].score,
    });
    socket?.send(jsonStr);
    setMailList([]);
  };

  return isLandingPage ? null : (
    <MailContainerDiv isMailBox={isMailBox}>
      <MailBadge isMailBox={isMailBox} isEmpty={mailList.length} />
      <MailContainerHeader isMailBox={isMailBox}>
        <button type="button" title="메일함 열기" onClick={handleMailContainer}>
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
        </button>

        <TotalCheckButton
          type="button"
          title="전체 확인"
          onClick={handleTotalCheck}
          isMailBox={isMailBox}
        >
          <FontAwesomeIcon icon={faCheckDouble} />
        </TotalCheckButton>
      </MailContainerHeader>
      <MailContainerMain isMailBox={isMailBox}>
        {mailList.length === 0 ? (
          <p>메일함이 비었어요.</p>
        ) : (
          mailList.map((mail, index) => (
            <MailBox key={index} mail={mail} setDeleteScore={setDeleteScore} />
          ))
        )}
      </MailContainerMain>
    </MailContainerDiv>
  );
}
