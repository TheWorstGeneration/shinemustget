import styled from '@emotion/styled';

const SortButtonDiv = styled.div`
  width: 100%;
  text-align: end;

  > span {
    cursor: pointer;
  }
`;

const SortButton = (props: any) => {
  const handleChangeSortLike = () => {
    props.onClick('like');
  };
  const handleChangeSortRecently = () => {
    props.onClick('recently');
  };

  return (
    <SortButtonDiv>
      <span onClick={handleChangeSortLike}>좋아요</span> |{' '}
      <span onClick={handleChangeSortRecently}>최신순</span>
    </SortButtonDiv>
  );
};

export default SortButton;
