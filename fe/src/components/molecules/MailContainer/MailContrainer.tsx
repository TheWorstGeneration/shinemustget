import { MailBox } from '@/components/atoms/MailBox/MailBox';
import { useInnerWidth } from '@/hooks/useInnerWidth';
import { useSocket } from '@/hooks/useSocket';
import styled from '@emotion/styled';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const MailContainerDiv = styled.aside<{ isActive: boolean }>`
  position: fixed;
  top: ${({ isActive }) => (isActive ? '6.5rem' : '20px')};
  right: ${({ isActive }) => (isActive ? 'calc(10rem - 100px)' : '18rem')};

  box-shadow: 0 0 0.5rem 1px #22222225;
  border-radius: ${({ isActive }) => (isActive ? '.5rem' : '50%')};
  padding: 0 1rem;
  width: ${({ isActive }) => (isActive ? '300px' : '3rem')};
  height: ${({ isActive }) => (isActive ? '300px' : '3rem')};

  z-index: 1000;

  background-color: ${({ isActive }) => (isActive ? '#ffffff' : '#ffffff')};

  overflow-x: hidden; // 가로 스크롤 숨기기
  overflow-y: scroll; // 세로 스크롤 활성화
  &::-webkit-scrollbar {
    display: none; // 스크롤바 숨기기
  }

  @media screen and (max-width: 960px) {
    right: ${({ isActive }) => (isActive ? '1rem' : '9rem')};
  }
`;

const MailBadge = styled.div<{ isActive: boolean; isEmpty: number }>`
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

  display: ${({ isActive, isEmpty }) =>
    isActive || isEmpty === 0 ? 'none' : 'flex'};
`;

const MailContainerHeader = styled.header<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isActive }) => (isActive ? 'space-between' : 'center')};

  position: sticky;
  top: 0;

  width: 100%;
  height: 3rem;

  background-color: #ffffff;
  border-bottom: ${({ isActive }) => (isActive ? '1px' : '0px')} solid #22222225;

  padding: ${({ isActive }) => (isActive ? '1rem' : '0')};
  margin-bottom: 1rem;
`;

const TotalCheckButton = styled.button<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
`;

const MailContainerMain = styled.main<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export function MailContainer() {
  const router = useRouter();
  const isLandingPage = router.pathname === '/';

  const [isClicked, setIsClicked] = useState(false);
  const [maillist, setMailList] = useState<string[]>([]);
  const isMaxWidth = useInnerWidth() > 1440;
  const isActive = isClicked || isMaxWidth;

  // for (let i = 0; i < 20; i++) {
  //   mail_list.push('당신의 만다라트에 좋아요가 눌렸습니다.');
  // }

  const handleMailContainer = () => {
    setIsClicked(!isClicked);
  };

  const handleTotalCheck = () => {
    //TODO: 전체 확인 버튼 클릭 시, 모든 메일을 확인한 것으로 처리
    // console.log('전체 확인');
  };

  const socket = useSocket();

  useEffect(() => {
    //TODO: mail controller에서 메일을 받아와서 알림창에 띄우기
    // console.log('메일 받아오기');
    
    socket.onmessage = (event) => { 
      const message = JSON.parse(event.data);
      console.log(message);
      const mail_list:string[] = [];
      if (Array.isArray(message)) {
        for (let i = 0; i < message.length; i++) { 
          mail_list.push(message[i].message);
        }
        setMailList(mail_list);
      } else { 
        if (message.cursor != (undefined || '-1')) {
          socket.send(message.cursor);
        } else { 
          mail_list.push(message);
        }
      }
      console.log("mail_list", mail_list);
      console.log(mail_list.length);
    }
    
  }, [socket]);

  return isLandingPage ? null : (
    <MailContainerDiv isActive={isActive}>
      <MailBadge isActive={isActive} isEmpty={maillist.length} />
      <MailContainerHeader isActive={isActive}>
        <button type="button" title="메일함 열기" onClick={handleMailContainer}>
          <FontAwesomeIcon icon={faEnvelope} size="lg" />
        </button>

        <TotalCheckButton
          type="button"
          title="전체 확인"
          onClick={handleTotalCheck}
          isActive={isActive}
        >
          <FontAwesomeIcon icon={faCheckDouble} />
        </TotalCheckButton>
      </MailContainerHeader>
      <MailContainerMain isActive={isActive}>
        {maillist.length === 0 ? (
          <p>메일함이 비었어요.</p>
        ) : (
          maillist.map((mail, index) => <MailBox key={index} mail={mail} />)
        )}
      </MailContainerMain>
    </MailContainerDiv>
  );
}
