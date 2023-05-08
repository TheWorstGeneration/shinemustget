import styled from '@emotion/styled';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fillHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  isLike: boolean;
  likeCnt: number;
  isProfile: boolean;
}) => {
  const isLike = props.isLike;
  const likeCnt = props.likeCnt;
  const isProfile = props.isProfile;

  const handleLikeClick = () => {
    console.log('likeClick');
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
