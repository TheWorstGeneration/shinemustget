import { useState,useEffect } from "react"
import styled from "@emotion/styled"
import { Toggle } from "@/components/atoms/Toggle/Toggle"
import { GrapeBoardList } from "../GrapeBoardList/GrapeBoardList"
import { UserComment } from "../UserComment/UserComment"
import { UserMemo } from "../UserMemo/UserMemo"
import { useAppSelector } from "@/hooks/useRedux"
import podoSetting from "@/pages/api/podoSetting"
import { selectIdx } from "@/store/modules/detailIdx";
import { podoListRecord } from "@/constants/grapeboardList"
import { sticker } from "@/constants/stickerList"
import { Dispatch, SetStateAction } from "react";
import { setPodo } from "@/store/modules/detailIdx"

const DetailedDiv = styled.div`
  display: flex;
  margin-bottom:2.05rem;
`;

const DetailedDivGoal = styled.div`
`;

const DetailedDivToggle = styled.div`
  position: absolute;
  margin-left : 32.25rem;
  display: flex;
`;

const DetailedDivToggleDesc = styled.div`
  margin-right: 0.55rem;
`;

const DetailedDivPos = styled.div`
  display: flex;
`;

const DetailedDivPosLeft = styled.div`
  flex:1;
`; 

const DetailedDivRight = styled.div`
  margin-left:1.35rem;
  flex:1.25;
`;

const DetailedDivEmpty = styled.div`
    font-size: 1.5rem;
    padding-top: 10rem;
    text-align: center;
`;

export function DetailedCenter({ isOn,setisOn,setting,list,stickerList,updatePodo,setUpdatePodo }: {isOn:boolean,setisOn:Dispatch<SetStateAction<boolean>>,setting:any, list:podoListRecord,stickerList:sticker[],updatePodo:boolean, setUpdatePodo:Dispatch<SetStateAction<boolean>>}) {
  
  
  const [podoDetail, setPodoDetail] = useState("");
  

  return (
  <div>
      <DetailedDiv>
        <DetailedDivGoal>
          <h1>세부 목표</h1>
        </DetailedDivGoal>
        <DetailedDivToggle>
          <DetailedDivToggleDesc>
            <p>포도알 설정</p>
          </DetailedDivToggleDesc>
          <Toggle setting={setting } isOn={isOn} setisOn={setisOn} />
        </DetailedDivToggle>
      </DetailedDiv>
      { isOn?(<DetailedDivPos>
        <DetailedDivPosLeft>
          <GrapeBoardList list={list} setPodoDetail={setPodoDetail} />
        </DetailedDivPosLeft>
        <DetailedDivRight>
          <UserMemo podoDetail={podoDetail} />
          <UserComment stickerList={...stickerList} updatePodo={updatePodo} setUpdatePodo={setUpdatePodo} />
        </DetailedDivRight>
      </DetailedDivPos>) : (
          <DetailedDivEmpty>
            <p>포도알을 설정해 목표를 관리해보세요.</p>
          </DetailedDivEmpty>
      )}
    </div>
  )
}

