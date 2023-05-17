import {
  deleteMailList,
  mailList,
} from '@/components/molecules/MailContainer/MailContrainer';
import styled from '@emotion/styled';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction } from 'react';

const MailContainer = styled.div`
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.1);

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0.5rem 0;
  height: 7rem;
`;

const Mail = styled.article`
  padding: 0.5rem 0 0.5rem 1rem;
`;

const MailText = styled.div``;

const MailDate = styled.div`
  margin-top: 0.5rem;
  text-align: right;
  font-size: 0.9rem;
`;

const MailFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 1vw;
  height: 100%;
  padding: 1rem;
  border-radius: 0 1rem 1rem 0;
  &:hover {
    background-color: #ebecf0;
  }
`;

export const MailBox = ({
  key,
  mail,
  setDeleteScore,
}: {
  key: number;
  mail: mailList;
  setDeleteScore: Dispatch<SetStateAction<string>>;
}) => {
  const handleOnClick = () => {
    setDeleteScore(mail.score);
  };

  return (
    <MailContainer>
      <Mail>
        <MailText>{mail.message}</MailText>
        <MailDate>{mail.formattedCreatedAt}</MailDate>
      </Mail>
      <MailFooter>
        <button type="button" title="확인">
          <FontAwesomeIcon icon={faCheck} onClick={handleOnClick} />
        </button>
      </MailFooter>
    </MailContainer>
  );
};
