import styled from "@emotion/styled"
import Image from "next/image";
import { CompleteButton } from "@/components/atoms/CompleteButton/CompleteButton";

const UserCommentDiv = styled.div`
  box-shadow: 0 0 0.5rem 1px #22222225;
  border-radius: 0.55rem;
  padding: 1rem;
  margin-top: 1.25em;
  height:22.5rem;
`;

const UserCommentContentDiv = styled.div`
  padding-top:2.25rem;
`;

const UserCommentImageDiv = styled.div`
  padding-top:1.25rem;
`;

const UserCommentTextDiv = styled.textarea`
  height: 8rem;
  width:100%;
  border:none;
  word-wrap:break-word;
`;

const UserCommentDateDiv = styled.div`
  font-weight: 900;
  padding-top:0.5rem;
  text-align: right;
`;

const UserCommentCompleteDiv = styled.div`
  display: flex;
  padding-top:1.05rem;
`;

const UserCommentCompleteImageDiv = styled.div`
  padding:0.45rem;
  flex:1;
`;

const UserCommentCompleteButtonDiv = styled.div`
  width:12.5rem;
  flex:2.75;
`;

export function UserComment() { 
  return (
    <UserCommentDiv>
      <UserCommentImageDiv>
        <Image src="/assets/images/grapeBoard/default.png" width={32.5} height={32.5} alt="image"></Image>{" "}
        <Image src="/assets/images/grapeBoard/default.png" width={32.5} height={32.5} alt="image"></Image>{" "}
        <Image src="/assets/images/grapeBoard/default.png" width={32.5} height={32.5} alt="image"></Image>{" "}
        <Image src="/assets/images/grapeBoard/default.png" width={32.5} height={32.5} alt="image"></Image>{" "}
        <Image src="/assets/images/grapeBoard/default.png" width={32.5} height={32.5} alt="image"></Image>{" "}
        <Image src="/assets/images/grapeBoard/default.png" width={32.5} height={32.5} alt="image"></Image>{" "}
      </UserCommentImageDiv>
      <UserCommentContentDiv>
        <UserCommentTextDiv placeholder="메모를 작성해주세요!"></UserCommentTextDiv>
      </UserCommentContentDiv>
      <UserCommentDateDiv><p>150/150</p></UserCommentDateDiv>
      <UserCommentCompleteDiv>
        <UserCommentCompleteImageDiv>
          <Image src="/assets/images/grapeBoard/default.png" width={32.5} height={32.5} alt="image"></Image>
        </UserCommentCompleteImageDiv>
        <UserCommentCompleteButtonDiv>
          <CompleteButton/>
        </UserCommentCompleteButtonDiv>
      </UserCommentCompleteDiv>
    </UserCommentDiv>
  );
}