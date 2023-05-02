import { useAppSelector } from '@/hooks/useRedux';
import { selectProfile } from '@/store/modules/profile';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  background-color: #ffffff;
  overflow: hidden;
`;

const Profile = styled(Image)`
  object-fit: contain;
`;

export const ProfileImage = () => {
  const router = useRouter();

  const { imageUrl } = useAppSelector(selectProfile);

  const handleProfile = () => {
    router.push('/profile');
  };

  return (
    <ProfileButton onClick={handleProfile}>
      <Profile src={imageUrl} alt="Profile" width={48} height={48} />
    </ProfileButton>
  );
};
