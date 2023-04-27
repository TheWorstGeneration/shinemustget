import styled from "@emotion/styled";

const UserMemoDiv = styled.div`
  box-shadow: 0 0 0.5rem 1px #22222225;
  border-radius: 0.55rem;
  padding: 1rem;
  height: 15.5rem;
`;

const UserMemoDateDiv = styled.div`
  font-weight: 900;
  padding-top:0.5rem;
  padding-left:12.5rem;
`;

export function UserMemo() { 
  return (
    <UserMemoDiv>
      <p>여기에 댓글을 작성 컴포넌트를 넣으면 세부 목표 달성 버튼은 어디에여기에 댓글을 작성 컴포넌트를 넣으면 세부 목표 달성 버튼은 어디에여기에 댓글을 작성 컴포넌트를 넣으면 세부 목표 달성 버튼은 어디에여기에 댓글을 작성 컴포넌트를 넣으면 세부 목표 달성 버튼은 어디에여기</p>
      <UserMemoDateDiv>
        <p>2023.04.26</p>
      </UserMemoDateDiv>
    </UserMemoDiv>
  );
}