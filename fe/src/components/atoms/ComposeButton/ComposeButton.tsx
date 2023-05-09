import { useEffect,useState } from "react";
import styled from "@emotion/styled"
import podoWrite from "@/pages/api/podoWrite";
import { useAppSelector } from "@/hooks/useRedux";
import { selectIdx } from "@/store/modules/detailIdx";
import podoRead from "@/pages/api/podoRead";

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
  const [podoRead2,setPodoRead2] = useState<any>("");

  const propsDetail = {
    id: index,
    imageUrl: imageUrl,
    oneline:oneline,
  };

  const onClickHandler = () => {
    podoWrite(propsDetail).then(res => {
      setPodoRead2(res);
      console.log(res)
  });
    podoRead(index);
  };

  return (
    <Button onClick={onClickHandler}>작성</Button>
  );
}