import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { ComposeButton } from '@/components/atoms/ComposeButton/ComposeButton';
import { sticker } from '@/constants/stickerList';
import { useAppSelector } from '@/hooks/useRedux';
import { selectIdx } from '@/store/modules/detailIdx';

const UserCommentDiv = styled.div`
  box-shadow: 0 0 0.5rem 1px #22222225;
  border-radius: 0.55rem;
  padding: 1rem;
  margin-top: 1.25em;
  height: 22.5rem;
`;

const UserCommentContentDiv = styled.div`
  padding-top: 2.25rem;
`;

const UserCommentImageDiv = styled.div`
  position: relative;
  z-index: 9999;
  padding-top: 1.25rem;
`;

const UserCommentTextDiv = styled.textarea`
  position: relative;
  z-index: 9999;
  height: 7rem;
  width: 100%;
  border: none;
  word-wrap: break-word;
  resize: none;
  font-size: 0.75rem;
  outline: none;
  line-height: 1.5;
`;

const UserCommentDateDiv = styled.div`
  font-weight: 300;
  padding-top: 0.5rem;
  text-align: right;
`;

const UserCommentCompleteDiv = styled.div`
  display: flex;
  padding-top: 1rem;
`;

const UserCommentCompleteImageDiv = styled.div`
  padding: 0.5rem;
  flex: 1;
`;

const UserCommentCompleteButtonDiv = styled.div`
  width: 12.5rem;
  flex: 2.75;
`;

export function UserComment({ stickerList }: { stickerList: sticker[] }) {
  const { isToday } = useAppSelector(selectIdx);
  const [countLetter, setCountLetter] = useState(0);
  const [oneline, setOneLine] = useState('');
  const [imageUrl, setImageUrl] = useState(
    'https://www.shinemustget.com/images/stickers/default.png',
  );
  const handleOnChange = (e: any) => {
    setCountLetter(e.target.value.length);
    setOneLine(e.target.value);
  };

  const StickerList: sticker[] = [];
  if (stickerList != null)
    for (let i = 0; i < 6; i++) {
      StickerList.push({
        id: stickerList[i].id,
        imageUrl: stickerList[i].imageUrl,
      });
    }

  useEffect(() => {
    setOneLine('');
  }, [isToday]);

  return (
    <UserCommentDiv>
      <UserCommentImageDiv>
        {StickerList.map(key => (
          <Image
            src={key.imageUrl}
            onClick={() => {
              setImageUrl(key.imageUrl);
            }}
            width={32.5}
            height={32.5}
            alt="image"
            style={{ marginLeft: '0.75rem', cursor: 'pointer' }}
          />
        ))}
      </UserCommentImageDiv>
      <UserCommentContentDiv>
        <UserCommentTextDiv
          placeholder={
            isToday ? '이미 스티커를 작성했어요!' : '메모를 작성해주세요!'
          }
          onChange={handleOnChange}
          maxLength={100}
          readOnly={isToday}
        />
      </UserCommentContentDiv>
      <UserCommentDateDiv>
        <p>{countLetter}/100</p>
      </UserCommentDateDiv>
      <UserCommentCompleteDiv>
        <UserCommentCompleteImageDiv>
          <Image src={imageUrl} width={32.5} height={32.5} alt="Image"></Image>
        </UserCommentCompleteImageDiv>
        <UserCommentCompleteButtonDiv>
          <ComposeButton imageUrl={imageUrl} oneline={oneline} />
        </UserCommentCompleteButtonDiv>
      </UserCommentCompleteDiv>
    </UserCommentDiv>
  );
}
