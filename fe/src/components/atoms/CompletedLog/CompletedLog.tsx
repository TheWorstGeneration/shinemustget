import styled from '@emotion/styled';
import Image from 'next/image';

const CompletedLogBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 1rem 0.5rem 0.5rem;
  text-align: center;
  font-size: 1.5rem;

  overflow: hidden;
`;

const Completed = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  font-size: 1rem;

  > span {
    margin-bottom: 0.5rem;
  }
`;

const Invert = styled.div`
  transform: rotateY(180deg);
`;

interface CompletedLogs {
  content: string;
  clearAt: string;
}

export const CompletedLog = (props: CompletedLogs) => {
  const date: string = props.clearAt.split('T')[0];

  return (
    <CompletedLogBox>
      <Image
        src="/assets/images/profile/congratulation_light.svg"
        width={40}
        height={40}
        alt="image"
      ></Image>
      <Completed>
        <span>
          <b>{props.content}</b>
        </span>
        <span>{date}</span>
      </Completed>
      <Invert>
        <Image
          src="/assets/images/profile/congratulation_light.svg"
          width={40}
          height={40}
          alt="image"
        ></Image>
      </Invert>
    </CompletedLogBox>
  );
};
