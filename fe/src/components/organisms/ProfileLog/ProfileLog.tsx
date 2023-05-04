import { ProfileCompleted } from '@/components/molecules/ProfileCompleted/ProfileCompleted';
import { ProfileMandalart } from '@/components/molecules/ProfileMandalart/ProfileMandalart';
import styled from '@emotion/styled';

const ProfileLogContainer = styled.div`
  display: flex;
  justify-content: center;

  height: 50%;

  @media (max-width: 500px) {
    flex-direction: column;
    height: 70%;

    margin: 0 0.5rem 0 0;
  }
`;

export const ProfileLog = () => {
  return (
    <ProfileLogContainer>
      <ProfileCompleted />
      <ProfileMandalart />
    </ProfileLogContainer>
  );
};
