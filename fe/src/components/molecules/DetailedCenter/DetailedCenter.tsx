import { useState } from "react"
import styled from "@emotion/styled"
import { Toggle } from "@/components/atoms/Toggle/Toggle"
import { GrapeBoardList } from "../GrapeBoardList/GrapeBoardList"
import { UserComment } from "../UserComment/UserComment"
import { UserMemo } from "../UserMemo/UserMemo"

const DetailedDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom:2.05rem;
  `;

const DetailedDivPos = styled.div`
  display: flex;
  /* height: 100vh; */
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

export function DetailedCenter() {
  const [isOn, setisOn] = useState(false);

  return (
  <div>
      <DetailedDiv>
        <h1>세부 목표</h1>
        <Toggle isOn={isOn} setisOn={setisOn}/>
      </DetailedDiv>
      { isOn?(<DetailedDivPos>
        <DetailedDivPosLeft>
          <GrapeBoardList />
        </DetailedDivPosLeft>
        <DetailedDivRight>
          <UserMemo />
          <UserComment/>
        </DetailedDivRight>
      </DetailedDivPos>) : (
          <DetailedDivEmpty>
            <p>포도알을 설정해 목표를 관리해보세요.</p>
          </DetailedDivEmpty>
      )}
    </div>
  )
}

