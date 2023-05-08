import { useState,Dispatch,SetStateAction } from "react";
import styled from "@emotion/styled"
import Image from "next/image";
import { ComposeButton } from "@/components/atoms/ComposeButton/ComposeButton";
import { StickerList } from "@/constants/stickerList";

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
  position: relative;
  z-index: 9999;
  padding-top:1.25rem;
`;

const UserCommentTextDiv = styled.textarea`
  position: relative;
  z-index: 9999;
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
  const [countLetter, setCountLetter] = useState(0);
  const [oneline,setOneLine] = useState("");
  const [imageUrl,setImageUrl] = useState("");
  const handleOnChange = (e: any) => {
    setCountLetter(e.target.value.length);
    setOneLine(e.target.value);
  };

  return (
    <UserCommentDiv>
      <UserCommentImageDiv>
        {StickerList.map((key) => (
          <Image src={key.imageUrl} onClick={() => { setImageUrl(key.imageUrl); console.log(key.imageUrl); }} width={32.5} height={32.5} alt="image" style={{ marginLeft: "0.75rem" }} ></Image>
        ))}
      </UserCommentImageDiv>
      <UserCommentContentDiv>
        <UserCommentTextDiv placeholder="메모를 작성해주세요!" onChange={handleOnChange} maxLength={150}></UserCommentTextDiv>
      </UserCommentContentDiv>
      <UserCommentDateDiv><p>{countLetter}/150</p></UserCommentDateDiv>
      <UserCommentCompleteDiv>
        <UserCommentCompleteImageDiv>
          <Image src={ imageUrl} width={32.5} height={32.5} alt="Image"></Image>
        </UserCommentCompleteImageDiv>
        <UserCommentCompleteButtonDiv>
          <ComposeButton imageUrl={"https://www.shinemustget.com/images/stickers/default.png"} oneline={oneline} />
        </UserCommentCompleteButtonDiv>
      </UserCommentCompleteDiv>
    </UserCommentDiv>
  );
}