import mandalartLike from '@/pages/api/postMandalartLike';
import styled from '@emotion/styled';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fillHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const LikeBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;

  margin-right: 20%;

  > p {
    margin: 0 0 0 0.5rem;
  }
`;

const Like = (props: {
  id: number;
  isLike: boolean;
  likeCnt: number;
  isProfile: boolean;
}) => {
  const isProfile = props.isProfile;
  const id = props.id;

  const [isLike, setIsLike] = useState(props.isLike);
  const [likeCnt, setLikeCnt] = useState(props.likeCnt);

  const handleLikeClick = async () => {
    const res: any = await mandalartLike(id);
    if (res.statusCode === 200) {
      if (isLike) {
        setLikeCnt(prev => prev - 1);
      } else {
        setLikeCnt(prev => prev + 1);
      }
      setIsLike(prev => !prev);
    }
  };

  return (
    <LikeBox>
      {isLike
        ? !isProfile && (
            <FontAwesomeIcon
              onClick={handleLikeClick}
              icon={fillHeart}
              style={{ color: '#ff0000', cursor: 'pointer' }}
            />
          )
        : !isProfile && (
            <FontAwesomeIcon
              onClick={handleLikeClick}
              icon={faHeart}
              style={{ color: '#ff0000', cursor: 'pointer' }}
            />
          )}
      <p>좋아요 {likeCnt}개</p>
    </LikeBox>
  );
};

export default Like;
