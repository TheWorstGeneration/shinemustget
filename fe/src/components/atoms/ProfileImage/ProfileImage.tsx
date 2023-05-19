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
  const { pathname } = router;
  const { imageUrl } = useAppSelector(selectProfile);

  const handleProfile = () => {
    if (pathname === '/create') {
      alert(' 먼저 만다라트를 제작해주세요!');
    } else {
      router.push('/profile');
    }
  };

  return (
    <ProfileButton onClick={handleProfile}>
      <Profile
        src={
          imageUrl
            ? imageUrl
            : 'https://search.pstatic.net/common?type=b&size=216&expire=1&refresh=true&quality=100&direct=true&src=http%3A%2F%2Fsstatic.naver.net%2Fpeople%2F108%2F202205231938126841.png'
        }
        alt="Profile"
        width={48}
        height={48}
      />
    </ProfileButton>
  );
};
