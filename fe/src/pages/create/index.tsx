import { InputBox } from '@/components/atoms/InputBox/InputBox';
import { BigGoalListContainer } from '@/components/molecules/BigGoalListContainer/BigGoalListContainer';
import { Mandalart } from '@/components/organisms/Mandalart/Mandalart';
import { MANDALART_READ_MAIN, MEMBER_INFO } from '@/constants/queryKey';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { selectGoal } from '@/store/modules/goal';
import styled from '@emotion/styled';
import Head from 'next/head';
import { QueryClient, dehydrate, useQuery } from 'react-query';
import getMemberInfo from '../api/getMemberInfo';
import { getReadMain } from '../api/getReadMain';
import { GetServerSideProps } from 'next';
import { setLogin, setLogout } from '@/store/modules/profile';
import { CreateButton } from '@/components/atoms/CreateButton/CreateButton';
import { useGoToLandingPage } from '@/hooks/useGoToLandingPage';
import { useRouter } from 'next/router';

const CreateSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background-color: #ffffff;

  overflow: hidden;

  padding-top: 6rem;
`;

const FinalCreateStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  position: relative;
  width: 100vw;
  height: calc(100vh + 3rem);
  background-color: #ffffff;
`;

export default function Create() {
  useGoToLandingPage();
  const dispatch = useAppDispatch();
  const { smallGoalLists } = useAppSelector(selectGoal);
  const router = useRouter();
  const { data, isSuccess, isError } = useQuery(MEMBER_INFO, getMemberInfo);

  dispatch(setLogin({ imageUrl: data?.imageUrl, nickname: data?.nickname }));
  console.log(data, isSuccess, isError);

  // if (isSuccess) {
  //   dispatch(setLogin({ imageUrl: data?.imageUrl, nickname: data?.nickname }));
  // } else if (isError) {
  //   dispatch(setLogout());
  //   console.log(data, isSuccess, isError);
  //   router.push('/');
  // }

  return (
    <>
      <Head>
        <title>Shine must get | 만다라트 생성</title>
        <meta
          name="description"
          content="최종 목표를 작성하고 당신만의 만다라트를 생성해 보세요."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shine Must Get" />
        <meta property="og:title" content="Shine Must Get | 만다라드 생성 " />
        <meta property="og:description" />
        <meta
          property="og:image"
          content="assets/images/common/front-image.png"
        />
        <meta property="og:url" content="https://shinemustget.com" />
      </Head>
      <CreateSection>
        {smallGoalLists[0][0] === '' ? (
          <BigGoalListContainer />
        ) : (
          <FinalCreateStep>
            <Mandalart />
            <CreateButton />
          </FinalCreateStep>
        )}
        <InputBox />
      </CreateSection>
    </>
  );
}

export const getServersideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(MEMBER_INFO, getMemberInfo);
  await queryClient.prefetchQuery(MANDALART_READ_MAIN, getReadMain);

  return {
    props: dehydrate(queryClient),
  };
};
