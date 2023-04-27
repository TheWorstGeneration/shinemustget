import { useState,Dispatch,SetStateAction } from "react";
import styled from "@emotion/styled"

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.55rem;
  width: 100%;
  height: 3rem;
  box-shadow: 0 0 0.5rem 1px #22222225;
  padding: 0.5rem;
  color:#A3DA08;
  font-weight: 900;

  &:hover {
    box-shadow: 0 0 1rem 1px #22222250;
  }
`;

export function CompleteButton({imageUrl,onLine}: {imageUrl:any,onLine:any}) { 

  const onClickHandler = () => {
    console.log("메모 작성 완료!");
    console.log(imageUrl);
    console.log(onLine);
  };

  return (
    <Button onClick={onClickHandler}>완료</Button>
  );
}