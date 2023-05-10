import { useEffect,Dispatch,SetStateAction } from "react";
import styled from "@emotion/styled";
import { useAppSelector } from "@/hooks/useRedux";
import { setPodo } from "@/store/modules/detailIdx";
import podoSetting from "@/pages/api/podoSetting";
import { selectIdx } from "@/store/modules/detailIdx";

const ToggleContainer = styled.div`
  position: relative;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233,233,234);
  }
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: #A3DA08;
    transition : 0.5s
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  } >.toggle--checked {
    left: 27px;
    transition : 0.5s;
  }
`;

export function Toggle({ setting,isOn,setisOn}:{ setting:boolean, isOn: boolean,setisOn: Dispatch<SetStateAction<boolean>>}) {
  const { index } = useAppSelector(selectIdx);

  if (isOn) setisOn(true);

  const toggleHandler = () => {
    setisOn(!isOn);
    podoSetting(index);
  };

  return (
     <ToggleContainer
        onClick={toggleHandler}
      >
        <div className={`toggle-container ${isOn ? "toggle--checked" : null}`}/>
        <div className={`toggle-circle ${isOn  ? "toggle--checked" : null}`}/>
      </ToggleContainer>
      );
 }