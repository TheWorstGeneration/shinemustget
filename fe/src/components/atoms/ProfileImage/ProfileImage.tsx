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
  background-color: #4fe44f;
  overflow: hidden;
`;

export const ProfileImage = () => {
  const image = '';

  const handleProfile = () => {
    console.log('Profile');
  };

  return (
    <ProfileButton onClick={handleProfile}>
      <Image src={image} alt="Profile" width={48} height={48} />
    </ProfileButton>
  );
};
