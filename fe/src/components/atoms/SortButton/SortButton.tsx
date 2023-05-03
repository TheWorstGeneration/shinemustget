import styled from '@emotion/styled';

const SortButtonDiv = styled.div`
  > span {
    cursor: pointer;
  }
`;

const SortButton = () => {
  const handleChangeSortLike = () => {
    console.log('like');
  };
  const handleChangeSortRecently = () => {
    console.log('recently');
  };
  return (
    <SortButtonDiv>
      <span onClick={handleChangeSortLike}>좋아요</span> |{' '}
      <span onClick={handleChangeSortRecently}>최신순</span>
    </SortButtonDiv>
  );
};

export default SortButton;
