import { useState,useEffect } from "react"
import styled from "@emotion/styled"
import { Toggle } from "@/components/atoms/Toggle/Toggle"
import { GrapeBoardList } from "../GrapeBoardList/GrapeBoardList"
import { UserComment } from "../UserComment/UserComment"
import { UserMemo } from "../UserMemo/UserMemo"
import { podoListRecord } from "@/constants/grapeboardList"
import { sticker } from "@/constants/stickerList"
import { Dispatch, SetStateAction } from "react";

const DetailedOverDiv = styled.div`
  @media (max-width: 960px) {
      width: calc(100vw - 2rem);
  }

   @media (max-width: 500px) {
      width: 90vw;
  }
`;

const DetailedDiv = styled.div`
  display: flex;
  margin-bottom:2.05rem;
`;

const DetailedDivGoal = styled.div`
    flex:1;

`;

const DetailedDivToggle = styled.div`
  flex:1;
  margin-left : 32.25rem;
  display: flex;

  @media (max-width: 960px) {
    margin-left : 47rem;     
  }

  @media (max-width: 500px) {
    margin-left : 18rem;     
  }

`;

const DetailedDivToggleDesc = styled.div`
  margin-right: 0.55rem;
`;

const DetailedDivPos = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const DetailedDivPosLeft = styled.div`
  flex:1;

   @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`; 

const DetailedDivRight = styled.div`
  margin-left:1.35rem;
  flex:1.25;

   @media (max-width: 500px) {
    margin-left: 0;
  }
`;

const DetailedDivEmpty = styled.div`
    font-size: 1.5rem;
    width: 100%;
    height:40rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export function DetailedCenter({ isOn,setisOn,setting,list,stickerList,updatePodo,setUpdatePodo }: {isOn:boolean,setisOn:Dispatch<SetStateAction<boolean>>,setting:any, list:podoListRecord,stickerList:sticker[],updatePodo:boolean, setUpdatePodo:Dispatch<SetStateAction<boolean>>}) {
  
  
  const [podoDetail, setPodoDetail] = useState("");
  

  return (
    <DetailedOverDiv >
      <DetailedDiv>
        <DetailedDivGoal>
          <h1>세부 목표</h1>
          <DetailedDivToggle>
          <DetailedDivToggleDesc>
            <p>포도알 설정</p>
          </DetailedDivToggleDesc>
          <Toggle setting={setting } isOn={isOn} setisOn={setisOn} />
        </DetailedDivToggle>
        </DetailedDivGoal>
      </DetailedDiv>
      {isOn ? (
        <DetailedDivPos>
          <DetailedDivPosLeft>
            <GrapeBoardList list={list} setPodoDetail={setPodoDetail} />
          </DetailedDivPosLeft>
          <DetailedDivRight>
            <UserMemo podoDetail={podoDetail} />
            <UserComment stickerList={...stickerList} updatePodo={updatePodo} setUpdatePodo={setUpdatePodo} />
          </DetailedDivRight>
        </DetailedDivPos>
      ) : (
        <DetailedDivEmpty>
            <p>포도알을 설정해 목표를 관리해보세요.</p>
        </DetailedDivEmpty>
      )}
    </DetailedOverDiv>
  )
}

