import styled from '@emotion/styled';

const SortButtonDiv = styled.div<{ sortIndex: string }>`
  width: 100%;
  text-align: end;

  > span {
    cursor: pointer;
  }

  > span:nth-of-type(1) {
    font-weight: ${({ sortIndex }) =>
      sortIndex === 'accuracy' ? 'bold' : 'normal '};
  }

  > span:nth-of-type(2) {
    font-weight: ${({ sortIndex }) =>
      sortIndex === 'like' ? 'bold' : 'normal'};
  }
`;

const SortButton = (props: any) => {
  const handleChangeSortLike = () => {
    props.onClick('like');
  };
  const handleChangeSortAccuracy = () => {
    props.onClick('accuracy');
  };

  return (
    <SortButtonDiv sortIndex={props.sortIndex}>
      <span onClick={handleChangeSortAccuracy}>정확도</span> |{' '}
      <span onClick={handleChangeSortLike}>좋아요</span>
    </SortButtonDiv>
  );
};

export default SortButton;
