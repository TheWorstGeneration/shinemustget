import { ProfileLog } from '@/components/organisms/ProfileLog/ProfileLog';
import { ProfileProgress } from '@/components/molecules/ProfileProgress/ProfileProgress';
import styled from '@emotion/styled';
import { MailContainer } from '@/components/molecules/MailContainer/MailContrainer';
import { useInnerWidth } from '@/hooks/useInnerWidth';
import Head from 'next/head';

const Temp = styled.section`
  display: flex;
  justify-content: center;
  margin: 6.5rem 0 0;
`;

const ProfileSection = styled.section<{ isMaxWidth: boolean }>`
  display: flex;
  flex-direction: column;

  width: ${({ isMaxWidth }) => (isMaxWidth ? '50vw' : '100vw')};
  padding: ${({ isMaxWidth }) => (isMaxWidth ? '0' : '0 10rem')};
  height: 91vh;

  background-color: #ffffff;

  @media (max-width: 960px) {
    padding: 0;
  }

  @media (max-width: 500px) {
    height: 130vh;
  }
`;

const Mail = styled.section`
  margin-left: 0.5rem;
`;

export const Profile = () => {
  const isMaxWidth = useInnerWidth() >= 1440;

  return (
    <>
      <Head>
        <title>Shine Must Get | 개인 프로필 관리</title>
        <meta
          name="description"
          content="프로필 페이지에서 현재 만다라트 진척도를 확인하고, 지난 만다라트를 확인할 수 있습니다."
        />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Shine Must Get" />
        <meta property="og:title" content="Shine Must Get | 개인 프로필 관리" />
        <meta
          property="og:description"
          content="프로필 페이지에서 현재 만다라트 진척도를 확인하고, 지난 만다라트를 확인할 수 있습니다."
        />
        <meta
          property="og:image"
          content="assets/images/common/front-image.png"
        />
        <meta property="og:url" content="https://shinemustget.com" />
      </Head>
      <Temp>
        <ProfileSection isMaxWidth={isMaxWidth}>
          <ProfileProgress />
          <ProfileLog />
        </ProfileSection>
        <Mail>
          <MailContainer />
        </Mail>
      </Temp>
    </>
  );
};

export default Profile;
