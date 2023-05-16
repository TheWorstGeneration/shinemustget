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

export function MailContainer() {
  const router = useRouter();
  const isLandingPage = router.pathname === '/';
  const { isMailBox } = useAppSelector(selectModal);
  const [mailList, setMailList] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  // for (let i = 0; i < 20; i++) {
  //   mail_list.push('당신의 만다라트에 좋아요가 눌렸습니다.');
  // }

  const handleMailContainer = () => {
    dispatch(setMailBox());
  };

  const handleTotalCheck = () => {
    //TODO: 전체 확인 버튼 클릭 시, 모든 메일을 확인한 것으로 처리
    // console.log('전체 확인');
  };

  // const mail_list: string[] = [];

  const socket = useSocket();
  socket.onopen;

  useEffect(() => {
    //TODO: mail controller에서 메일을 받아와서 알림창에 띄우기
    // console.log('메일 받아오기');

    socket.onmessage = event => {
      const message = JSON.parse(event.data);
      console.log(message);

      if (Array.isArray(message)) {
        for (let i = 0; i < message.length; i++) {
          setMailList(prev => [message[i].message, ...prev]);
        }
      } else {
        if (message.cursor != undefined && message.cursor != '-1.0') {
          const jsonStr = JSON.stringify({ "cursor": message.cursor });
          socket.send(jsonStr);
        }
      };
    }

    // socket.onmessage

  }, [socket.onmessage]);

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
          mailList.map((mail, index) => <MailBox key={index} mail={mail} />)
        )}
      </MailContainerMain>
    </MailContainerDiv>
  );
}
