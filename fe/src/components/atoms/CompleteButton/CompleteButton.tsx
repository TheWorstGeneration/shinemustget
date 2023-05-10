import styled from "@emotion/styled"
import mandalartClear from "@/pages/api/mandalartClear";
import { useAppSelector } from "@/hooks/useRedux";
import { selectIdx } from "@/store/modules/detailIdx";

const Button = styled.button`
  margin-top: 3rem;
  align-items: center;
  border-radius: 0.55rem;
  width: 100%;
  height: 3rem;
  box-shadow: 0 0 0.5rem 1px #22222225;
  padding: 1rem;
  color:#A3DA08;
  font-weight: 900;

  &:hover {
    box-shadow: 0 0 1rem 1px #22222250;
  }
`;

export function CompleteButton() {

  const { index } = useAppSelector(selectIdx);
  
  const handleComplete = () => { 
    mandalartClear(index);
  };
  
  return (
    <Button onClick={ handleComplete}>완료</Button>
  );
}