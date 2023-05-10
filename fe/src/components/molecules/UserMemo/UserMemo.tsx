import styled from "@emotion/styled";

const UserMemoDiv = styled.div`
  box-shadow: 0 0 0.5rem 1px #22222225;
  border-radius: 0.55rem;
  padding: 1rem;
  height: 15.5rem;

  .memoContent{
    word-wrap: break-word;
  }
`;

const UserMemoDateDiv = styled.div`
  font-weight: 900;
  padding-top:0.5rem;
  padding-left:12.5rem;
`;

export function UserMemo({ podoDetail }: { podoDetail: any }) {
  return (
    <UserMemoDiv>
      <p className="memoContent">{ podoDetail == null ? (""):(podoDetail.oneline)}</p>
      <UserMemoDateDiv>
        <p>{ podoDetail == null ? (""):(podoDetail.createdAt)}</p>
      </UserMemoDateDiv>
    </UserMemoDiv>
  );
}