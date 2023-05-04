import { useState } from "react";
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
   
   >.podo-container {
    position: absolute;
    top: 23.45rem;
    left:34.45rem;
  }

  > .podo1 {
  }

  > .podo2 {
    top: 23.45rem;
    left:37.15rem;
  }

   > .podo3 {
    top: 23.45rem;
    left:39.9rem;
  }

  > .podo4 {
    top: 25.85rem;
    left:33.25rem;
  }

   > .podo5 {
    top: 25.85rem;
    left:35.95rem;
  }

  > .podo6 {
    top: 25.85rem;
    left:38.65rem;
  }

  > .podo7 {
    top: 25.85rem;
    left:41.275rem;
  }

  > .podo8 {
    top: 28.2rem;
    left:31.85rem;
  }

  > .podo9 {
    top: 28.2rem;
    left:34.55rem;
  }

  > .podo10 {
    top: 28.2rem;
    left:37.25rem;
  }

  > .podo11 {
    top: 28.2rem;
    left:40rem;
  }

   > .podo12{
    top: 28.2rem;
    left:42.75rem;
  }

  > .podo13{
    top: 30.55rem;
    left:33.15rem;
  }

  > .podo14{
    top: 30.55rem;
    left:35.95rem;
  }

   > .podo15{
    top: 30.55rem;
    left:38.65rem;
  }

  > .podo16{
    top: 30.55rem;
    left:41.45rem;
  }

  > .podo17{
    top: 32.9rem;
    left:31.85rem;
  }

  > .podo18{
    top: 32.9rem;
    left:34.55rem;
  }

  > .podo19{
    top: 32.9rem;
    left:37.35rem;
  }

   > .podo20{
    top: 32.9rem;
    left:40rem;
  }

   > .podo21{
    top: 35.2rem;
    left:33.25rem;
  }

  > .podo22{
    top: 35.2rem;
    left:35.95rem;
  }

  > .podo23{
    top: 35.2rem;
    left:38.65rem;
  }

  > .podo24{
    top: 37.55rem;
    left:34.55rem;
  }

  > .podo25{
    top: 37.55rem;
    left:37.25rem;
  }

  > .podo26{
    top: 39.9rem;
    left:35.85rem;
  }
`;

export function GrapeBoardList() {
  const idx = podoLists.pageCnt-1;
  const [listIdx, setListIdx] = useState(idx);

  const handleUpClick = () => {
    if(listIdx>0) setListIdx(listIdx-1);
  };
  const handleDownClick = () => { 
    if(listIdx<idx) setListIdx(listIdx+1);
  };

  const list = podoLists.podosList[listIdx].podoDtoList;
  return (
    <>
      <ArrowButtonUp>
        <Image src="/assets/images/navigation/navigate_before.png" onClick={handleUpClick } width={55} height={60} alt="image"></Image>
      </ArrowButtonUp>
      <GrapeBoard />
      <ArrowButtonDown>
        <Image src="/assets/images/navigation/navigate_after.png" onClick={ handleDownClick} width={55} height={60} alt="image"></Image>
      </ArrowButtonDown>
      <GrapeContainer>
        <div className={`podo-container ${list[0] !== null ? "podo1" : null}`}>
          { list[0] == null?(""):(<Image src={list[0].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[1] !== null ? "podo2" : null}`}>
          { list[1] == null?(""):(<Image src={list[1].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[2] !== null ? "podo3" : null}`}>
          { list[2] == null?(""):(<Image src={list[2].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[3] !== null ? "podo4" : null}`}>
          { list[3] == null?(""):(<Image src={list[3].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[4] !== null ? "podo5" : null}`}>
          { list[4] == null?(""):(<Image src={list[4].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[5] !== null ? "podo6" : null}`}>
          { list[5] == null?(""):(<Image src={list[5].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[6] !== null ? "podo7" : null}`}>
          { list[6] == null?(""):(<Image src={list[6].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[7] !== null ? "podo8" : null}`}>
          { list[7] == null?(""):(<Image src={list[7].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[8] !== null ? "podo9" : null}`}>
          { list[8] == null?(""):(<Image src={list[8].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[9] !== null ? "podo10" : null}`}>
          { list[9] == null?(""):(<Image src={list[9].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[10] !== null ? "podo11" : null}`}>
          { list[10] == null?(""):(<Image src={list[10].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[11] !== null ? "podo12" : null}`}>
          { list[11] == null?(""):(<Image src={list[11].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[12] !== null ? "podo13" : null}`}>
          { list[12] == null?(""):(<Image src={list[12].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[13] !== null ? "podo14" : null}`}>
          { list[13] == null?(""):(<Image src={list[13].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[14] !== null ? "podo15" : null}`}>
          { list[14] == null?(""):(<Image src={list[14].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[15] !== null ? "podo16" : null}`}>
          { list[15] == null?(""):(<Image src={list[15].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[16] !== null ? "podo17" : null}`}>
          { list[16] == null?(""):(<Image src={list[16].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[17] !== null ? "podo18" : null}`}>
         { list[17] == null?(""):(<Image src={list[17].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[18] !== null ? "podo19" : null}`}>
          { list[18] == null?(""):(<Image src={list[18].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[19] !== null ? "podo20" : null}`}>
          { list[19] == null?(""):(<Image src={list[19].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[20] !== null ? "podo21" : null}`}>
          { list[20] == null?(""):(<Image src={list[20].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[21] !== null ? "podo22" : null}`}>
          { list[21] == null?(""):(<Image src={list[21].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[22] !== null ? "podo23" : null}`}>
           { list[22] == null?(""):(<Image src={list[22].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[23] !== null ? "podo24" : null}`}>
          { list[23] == null?(""):(<Image src={list[23].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[24] !== null ? "podo25" : null}`}>
          { list[24] == null?(""):(<Image src={list[24].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
        <div className={`podo-container ${list[25] !== null ? "podo26" : null}`}>
          { list[25] == null?(""):(<Image src={list[25].imageUrl} width={40} height={40} alt="Image"></Image>) }
        </div>
      </GrapeContainer>
    </>
  )
 }