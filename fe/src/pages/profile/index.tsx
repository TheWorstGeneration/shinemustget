import { ProfileLog } from '@/components/organisms/ProfileLog/ProfileLog';
import { ProfileProgress } from '@/components/molecules/ProfileProgress/ProfileProgress';
import styled from '@emotion/styled';
import { MailContainer } from '@/components/molecules/MailContainer/MailContrainer';
import { useInnerWidth } from '@/hooks/useInnerWidth';

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
    <Temp>
      <ProfileSection isMaxWidth={isMaxWidth}>
        <ProfileProgress />
        <ProfileLog />
      </ProfileSection>
      <Mail>
        <MailContainer />
      </Mail>
    </Temp>
  );
};

export default Profile;
