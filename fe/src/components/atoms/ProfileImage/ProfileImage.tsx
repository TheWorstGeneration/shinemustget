import styled from '@emotion/styled';
import Image from 'next/image';
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
  const image = 'assets/images/characters/ohtani.png';

  const handleProfile = () => {
    console.log('Profile');
  };

  return (
    <ProfileButton onClick={handleProfile}>
      <Profile src={image} alt="Profile" width={48} height={48} />
    </ProfileButton>
  );
};
