import { deleteMailList, mailList } from '@/components/molecules/MailContainer/MailContrainer';
import styled from '@emotion/styled';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSocket } from '@/hooks/useSocket';
import { Dispatch,SetStateAction } from 'react';

const Mail = styled.article`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0.5rem 0;

  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

const MailFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;


export const MailBox = ({ mail,setDeleteIdx }: { mail: mailList,setDeleteIdx: Dispatch<SetStateAction<string>> }) => {
  
  const handleOnClick = () => { 
    setDeleteIdx(mail.score);
  };

  return (
    <Mail>
      <p>{mail.message}</p>
      <p>{ mail.formattedCreatedAt}</p>
      <MailFooter>
        <button type="button" title="확인">
          <FontAwesomeIcon icon={faCheck} onClick={handleOnClick} />
        </button>
      </MailFooter>
    </Mail>
  );
};
