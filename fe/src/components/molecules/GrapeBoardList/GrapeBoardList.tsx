import styled from "@emotion/styled"
import Image from "next/image"
import GrapeBoard from "@/components/atoms/GrapeBoard/GrapeBoard"

const ArrowButtonUp = styled.div`
  margin-left:9.25rem;
  margin-bottom: 3.05rem;
`;

const ArrowButtonDown = styled.div`
  margin-left:9.25rem;
  margin-top: 3.05rem;
`;

export function GrapeBoardList() {
  return (
    <>
      <ArrowButtonUp>
        <Image src="/assets/images/navigation/navigate_before.png" width={55} height={60} alt="image"></Image>
      </ArrowButtonUp>
      <GrapeBoard />
      <ArrowButtonDown>
        <Image src="/assets/images/navigation/navigate_after.png" width={55} height={60} alt="image"></Image>
      </ArrowButtonDown>
    </>
  )
 }