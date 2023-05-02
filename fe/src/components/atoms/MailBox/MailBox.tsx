import styled from '@emotion/styled';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface MailBoxProps {
  mail: string;
}

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

export const MailBox = ({ mail }: MailBoxProps) => {
  return (
    <Mail>
      <p>{mail}</p>
      <MailFooter>
        <button type="button" title="확인">
          <FontAwesomeIcon icon={faCheck} />
        </button>
      </MailFooter>
    </Mail>
  );
};
