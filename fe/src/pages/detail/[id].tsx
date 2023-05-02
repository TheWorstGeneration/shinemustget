import styled from "@emotion/styled";
import { DetailedCenter } from "@/components/molecules/DetailedCenter/DetailedCenter";
import { DetailedLeft } from "@/components/molecules/DetailedLeft/DetailedLeft";
import { DetailedRight } from "@/components/molecules/DetailedRight/DetailedRight";

const DetailedDiv = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 6rem 10rem;
  `;

const DetailedDivLeft = styled.div`
  flex:0.85;
`;

const DetailedDivCenter = styled.div`
  flex:2.25;
`;

const DetailedDivRight = styled.div`
  flex:1;
`;

export default function Detail() {

  return (
      <DetailedDiv>
      <DetailedDivLeft>
        <DetailedLeft/>
      </DetailedDivLeft>
      <DetailedDivCenter>
        <DetailedCenter />
      </DetailedDivCenter>
      <DetailedDivRight>
        <DetailedRight/>
      </DetailedDivRight>
      </DetailedDiv>
    );
};
 

