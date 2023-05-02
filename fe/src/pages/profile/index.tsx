import { DetailedRight } from '@/components/molecules/DetailedRight/DetailedRight';
import { ProfileLog } from '@/components/organisms/ProfileLog/ProfileLog';
import { ProfileGoals } from '@/components/molecules/ProfileProgress/ProfileProgress';
import styled from '@emotion/styled';

const Temp = styled.section`
  display: flex;
  justify-content: center;
  margin: 6rem 0 0;
`;
const Left = styled.section`
  width: 15vw;
  height: 90vh;

  border: 1px solid red;
`;

const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;

  width: 50vw;
  height: 91vh;

  background-color: #ffffff;
`;

export default function profile() {
  return (
    <Temp>
      <Left />
      <ProfileSection>
        <ProfileGoals />
        <ProfileLog />
      </ProfileSection>
      <DetailedRight />
    </Temp>
  );
}
