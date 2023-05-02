import styled from '@emotion/styled';

const CompletedLogBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 1rem 0.5rem 0.5rem;
  text-align: center;
  font-size: 1.5rem;

  overflow: scroll;
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

export function CompletedLog(props: CompletedLogs) {
  return (
    <CompletedLogBox>
      <span>🎉</span>
      <Completed>
        <span>
          <b>{props.content}</b>
        </span>
        <span>{props.clearAt}</span>
      </Completed>
      <span>
        <Invert>🎉</Invert>
      </span>
    </CompletedLogBox>
  );
}
