import { useState } from 'react';
import styled from '@emotion/styled';
import GrapeBoard from '@/components/atoms/GrapeBoard/GrapeBoard';
import Image from 'next/image';
import podoDetail from '@/pages/api/podoDetail';
import { Dispatch, SetStateAction } from 'react';
import { useAppSelector } from '@/hooks/useRedux';
import { selectIdx } from '@/store/modules/detailIdx';

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

const Sticker = styled(Image)`
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 0.5rem #22222250);
  }
`;

export function GrapeBoardList({
  setPodoDetail,
}: {
  setPodoDetail: Dispatch<SetStateAction<string>>;
}) {
  const { pageCnt, podosList } = useAppSelector(selectIdx).result;

  const [listIdx, setListIdx] = useState(pageCnt === 0 ? 0 : pageCnt - 1);

  const handleUpClick = () => {
    if (listIdx > 0) setListIdx(listIdx - 1);
  };
  const handleDownClick = () => {
    if (listIdx < pageCnt - 1) setListIdx(listIdx + 1);
  };

  const handleOnclick = (props: number) => {
    podoDetail(props).then(response => {
      setPodoDetail(response);
    });
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
      {podosList.length === 0 ? (
        <></>
      ) : (
        <GrapeContainer>
          {podosList[listIdx].podoDtoList.map((podo, index) => (
            <div
              className={`podo-container ${
                podo !== null ? `podo${index + 1}` : null
              }`}
            >
              {podo == null ? (
                ''
              ) : (
                <Sticker
                  src={podo.imageUrl}
                  width={40}
                  height={40}
                  alt="Image"
                  onClick={() => {
                    handleOnclick(podo.id);
                  }}
                />
              )}
            </div>
          ))}
        </GrapeContainer>
      )}
    </>
  );
}
