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
`;

const DetailedDivPosLeft = styled.div`
  flex:1;
`; 

const DetailedDivRight = styled.div`
  margin-left:1.35rem;
  flex:1.25;
`;

export function DetailedCenter() {
  return (
  <div>
      <DetailedDiv>
        <h1>세부 목표</h1>
        <Toggle/>
      </DetailedDiv>
      <DetailedDivPos>
        <DetailedDivPosLeft>
          <GrapeBoardList />
        </DetailedDivPosLeft>
        <DetailedDivRight>
          <UserMemo />
          <UserComment />
        </DetailedDivRight>
      </DetailedDivPos>
    </div>
  )
}

