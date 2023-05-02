import { ProfileCompleted } from '@/components/molecules/ProfileCompleted/ProfileCompleted';
import { ProfileMandalart } from '@/components/molecules/ProfileMandalart/ProfileMandalart';
import styled from '@emotion/styled';

const ProfileLogContainer = styled.div`
  display: flex;
  justify-content: center;

  height: 50vh;
`;

export function ProfileLog() {
  return (
    <ProfileLogContainer>
      <ProfileCompleted />
      <ProfileMandalart />
    </ProfileLogContainer>
  );
}
