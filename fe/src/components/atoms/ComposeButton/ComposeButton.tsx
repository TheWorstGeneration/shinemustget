import { useEffect } from "react";
import styled from "@emotion/styled"
import podoWrite from "@/pages/api/podoWrite";
import { useAppSelector } from "@/hooks/useRedux";
import { selectIdx } from "@/store/modules/detailIdx";

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

export function ComposeButton({ imageUrl, oneline }: { imageUrl: any, oneline: any }) {
  const { index } = useAppSelector(selectIdx);

  const propsDetail = {
    id: index,
    imageUrl: imageUrl,
    oneline:oneline,
  };

  const onClickHandler = () => {
    podoWrite(propsDetail).then(res=>console.log(res));
  };

  return (
    <Button onClick={onClickHandler}>작성</Button>
  );
}