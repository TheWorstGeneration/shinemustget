import styled from '@emotion/styled';

const UserMemoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  box-shadow: 0 0 0.5rem 1px #22222225;
  border-radius: 0.55rem;
  padding: 1rem;
  height: 15.5rem;

  .memoContent {
    word-wrap: break-word;
    font-weight: 900;
  }
`;

const UserMemoDateDiv = styled.div`
  font-weight: 300;
  width: 100%;
  text-align: right;
`;

export function UserMemo({ podoDetail }: { podoDetail: any }) {
  return (
    <UserMemoDiv>
      <p className="memoContent">
        {podoDetail === null ? '' : podoDetail.oneline}
      </p>
      <UserMemoDateDiv>
        <p>{podoDetail === null ? '' : podoDetail.createdAt}</p>
      </UserMemoDateDiv>
    </UserMemoDiv>
  );
}
