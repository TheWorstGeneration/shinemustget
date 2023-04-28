import styled from "@emotion/styled"
import Image from "next/image"
import GrapeBoard from "@/components/atoms/GrapeBoard/GrapeBoard"
import { podoLists } from "@/constants/grapeboardList";

const ArrowButtonUp = styled.div`
  margin-left:9.25rem;
  margin-bottom: 3.05rem;
`;

const ArrowButtonDown = styled.div`
  margin-left:9.25rem;
  margin-top: 3.05rem;
`;

const GrapeContainer = styled.div`
  position: relative;
  top: -26.75rem;
  left:8.75rem;
`;

export function GrapeBoardList() {
  const list = podoLists.podosList[0].podoDtoList;
  return (
    <>
      <ArrowButtonUp>
        <Image src="/assets/images/navigation/navigate_before.png" width={55} height={60} alt="image"></Image>
      </ArrowButtonUp>
      <GrapeBoard />
      <ArrowButtonDown>
        <Image src="/assets/images/navigation/navigate_after.png" width={55} height={60} alt="image"></Image>
      </ArrowButtonDown>
      <GrapeContainer><Image src={list[0].imageUrl} width={40} height={40 } alt="Image"></Image></GrapeContainer>
    </>
  )
 }