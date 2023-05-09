import { useState } from 'react';
import styled from '@emotion/styled';
import { podoListRecord } from '@/constants/grapeboardList';
import GrapeBoard from '@/components/atoms/GrapeBoard/GrapeBoard';
import Image from 'next/image';
import { useQuery } from 'react-query';
import podoDetail from '@/pages/api/podoDetail';
import { Dispatch,SetStateAction } from "react";

const ArrowButtonUp = styled.div`
  margin-left: 9.25rem;
  margin-bottom: 3.05rem;
`;

const ArrowButtonDown = styled.div`
  margin-left: 9.25rem;
  margin-top: 3.05rem;
`;

const GrapeContainer = styled.div`
  height: 0;
  > .podo-container {
    position: relative;
    top: -26.75rem;
    left: 8.75rem;
    width: fit-content;
  }

  > .podo1 {
  }

  > .podo2 {
    top: -29.5rem;
    left: 11.5rem;
  }

  > .podo3 {
    top: -32.25rem;
    left: 14.25rem;
  }

  > .podo4 {
    top: -32.5rem;
    left: 7.45rem;
  }

  > .podo5 {
    top: -35.25rem;
    left: 10.2rem;
  }

  > .podo6 {
    top: -38rem;
    left: 12.95rem;
  }

  > .podo7 {
    top: -40.75rem;
    left: 15.65rem;
  }

  > .podo8 {
    top: -41.25rem;
    left: 6.05rem;
  }

  > .podo9 {
    top: -43.9rem;
    left: 8.75rem;
  }

  > .podo10 {
    top: -46.7rem;
    left: 11.55rem;
  }

  > .podo11 {
    top: -49.4rem;
    left: 14.25rem;
  }

  > .podo12 {
    top: -52.17rem;
    left: 17rem;
  }

  > .podo13 {
    top: -52.55rem;
    left: 7.45rem;
  }

  > .podo14 {
    top: -55.3rem;
    left: 10.15rem;
  }

  > .podo15 {
    top: -58.05rem;
    left: 12.95rem;
  }

  > .podo16 {
    top: -60.85rem;
    left: 15.7rem;
  }

  > .podo17 {
    top: -61.25rem;
    left: 6.05rem;
  }

  > .podo18 {
    top: -63.95rem;
    left: 8.85rem;
  }

  > .podo19 {
    top: -66.75rem;
    left: 11.55rem;
  }

  > .podo20 {
    top: -69.48rem;
    left: 14.275rem;
  }

  > .podo21 {
    top: -69.95rem;
    left: 7.45rem;
  }

  > .podo22 {
    top: -72.65rem;
    left: 10.2rem;
  }

  > .podo23 {
    top: -75.4rem;
    left: 12.95rem;
  }

  > .podo24 {
    top: -75.85rem;
    left: 8.75rem;
  }

  > .podo25 {
    top: -78.6rem;
    left: 11.6rem;
  }

  > .podo26 {
    top: -79rem;
    left: 10.15rem;
  }
`;

export function GrapeBoardList({ list, setPodoDetail }: {list:podoListRecord,setPodoDetail:Dispatch<SetStateAction<string>>}) {

  const idx = list.pageCnt - 1;
  const [listIdx, setListIdx] = useState(idx);

  const handleUpClick = () => {
    if (listIdx > 0) setListIdx(listIdx - 1);
  };
  const handleDownClick = () => {
    if (listIdx < idx) setListIdx(listIdx + 1);
  };

  const podosList = list?.podosList[listIdx]?.podoDtoList;
  
  const handleOnclick = (props:number) => { 
    const detail:any = podoDetail(props).then((response) => { setPodoDetail(response)});
    
  };

  return (
    <>
      <ArrowButtonUp>
        <Image
          src="/assets/images/navigation/navigate_before.png"
          onClick={handleUpClick}
          width={55}
          height={60}
          alt="image"
        ></Image>
      </ArrowButtonUp>
      <GrapeBoard />
      <ArrowButtonDown>
        <Image
          src="/assets/images/navigation/navigate_after.png"
          onClick={handleDownClick}
          width={55}
          height={60}
          alt="image"
        ></Image>
      </ArrowButtonDown>
      <GrapeContainer>
        <div className={`podo-container ${podosList[0] !== null ? 'podo1' : null}`}>
          {podosList[0] == null ? (
            ''
          ) : (
            <Image
              src={podosList[0].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[0].id) }}  
            ></Image>
          )}
        </div>
        <div className={`podo-container ${podosList[1] !== null ? 'podo2' : null}`}>
          {podosList[1] == null ? (
            ''
          ) : (
            <Image
              src={podosList[1].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[1].id) }}  
            ></Image>
          )}
        </div>
        <div className={`podo-container ${podosList[2] !== null ? 'podo3' : null}`}>
          {podosList[2] == null ? (
            ''
          ) : (
            <Image
              src={podosList[2].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[2].id) }}  
            ></Image>
          )}
        </div>
        <div className={`podo-container ${podosList[3] !== null ? 'podo4' : null}`}>
          {podosList[3] == null ? (
            ''
          ) : (
            <Image
              src={podosList[3].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[3].id) }}  
            ></Image>
          )}
        </div>
        <div className={`podo-container ${podosList[4] !== null ? 'podo5' : null}`}>
          {podosList[4] == null ? (
            ''
          ) : (
            <Image
              src={podosList[4].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[4].id) }}  
            ></Image>
          )}
        </div>
        <div className={`podo-container ${podosList[5] !== null ? 'podo6' : null}`}>
          {podosList[5] == null ? (
            ''
          ) : (
            <Image
              src={podosList[5].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[5].id) }}  
            ></Image>
          )}
        </div>
        <div className={`podo-container ${podosList[6] !== null ? 'podo7' : null}`}>
          {podosList[6] == null ? (
            ''
          ) : (
            <Image
              src={podosList[6].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[6].id) }}  
            ></Image>
          )}
        </div>
        <div className={`podo-container ${podosList[7] !== null ? 'podo8' : null}`}>
          {podosList[7] == null ? (
            ''
          ) : (
            <Image
              src={podosList[7].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[7].id) }}  
            ></Image>
          )}
        </div>
        <div className={`podo-container ${podosList[8] !== null ? 'podo9' : null}`}>
          {podosList[8] == null ? (
            ''
          ) : (
            <Image
              src={podosList[8].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[8].id) }}  
            ></Image>
          )}
        </div>
        <div className={`podo-container ${podosList[9] !== null ? 'podo10' : null}`}>
          {podosList[9] == null ? (
            ''
          ) : (
            <Image
              src={podosList[9].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[9].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[10] !== null ? 'podo11' : null}`}
        >
          {podosList[10] == null ? (
            ''
          ) : (
            <Image
              src={podosList[10].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[10].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[11] !== null ? 'podo12' : null}`}
        >
          {podosList[11] == null ? (
            ''
          ) : (
            <Image
              src={podosList[11].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[11].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[12] !== null ? 'podo13' : null}`}
        >
          {podosList[12] == null ? (
            ''
          ) : (
            <Image
              src={podosList[12].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[12].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[13] !== null ? 'podo14' : null}`}
        >
          {podosList[13] == null ? (
            ''
          ) : (
            <Image
              src={podosList[13].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[13].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[14] !== null ? 'podo15' : null}`}
        >
          {podosList[14] == null ? (
            ''
          ) : (
            <Image
              src={podosList[14].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[14].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[15] !== null ? 'podo16' : null}`}
        >
          {podosList[15] == null ? (
            ''
          ) : (
            <Image
              src={podosList[15].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[15].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[16] !== null ? 'podo17' : null}`}
        >
          {podosList[16] == null ? (
            ''
          ) : (
            <Image
              src={podosList[16].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[16].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[17] !== null ? 'podo18' : null}`}
        >
          {podosList[17] == null ? (
            ''
          ) : (
            <Image
              src={podosList[17].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[17].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[18] !== null ? 'podo19' : null}`}
        >
          {podosList[18] == null ? (
            ''
          ) : (
            <Image
              src={podosList[18].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[18].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[19] !== null ? 'podo20' : null}`}
        >
          {podosList[19] == null ? (
            ''
          ) : (
            <Image
              src={podosList[19].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[19].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[20] !== null ? 'podo21' : null}`}
        >
          {podosList[20] == null ? (
            ''
          ) : (
            <Image
              src={podosList[20].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[20].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[21] !== null ? 'podo22' : null}`}
        >
          {podosList[21] == null ? (
            ''
          ) : (
            <Image
              src={podosList[21].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[21].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[22] !== null ? 'podo23' : null}`}
        >
          {podosList[22] == null ? (
            ''
          ) : (
            <Image
              src={podosList[22].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[22].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[23] !== null ? 'podo24' : null}`}
        >
          {podosList[23] == null ? (
            ''
          ) : (
            <Image
              src={podosList[23].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[23].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[24] !== null ? 'podo25' : null}`}
        >
          {podosList[24] == null ? (
            ''
          ) : (
            <Image
              src={podosList[24].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[24].id) }}  
            ></Image>
          )}
        </div>
        <div
          className={`podo-container ${podosList[25] !== null ? 'podo26' : null}`}
        >
          {podosList[25] == null ? (
            ''
          ) : (
            <Image
              src={podosList[25].imageUrl}
              width={40}
              height={40}
              alt="Image"
              onClick={() => { handleOnclick(podosList[25].id) }}  
            ></Image>
          )}
        </div>
      </GrapeContainer>
    </>
  );
}