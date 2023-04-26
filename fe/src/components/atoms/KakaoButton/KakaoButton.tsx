import styled from '@emotion/styled';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface ButtonProps {
  size: 'sm' | 'lg';
}

const LargeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 9rem;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: #f7e600;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: #f7e600;
    opacity: 0.8;
  }
`;

const SmallButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  background-color: #f7e600;
  padding: 1rem;

  &:hover {
    background-color: #f7e600;
    opacity: 0.8;
  }
`;

export const KakaoButton = ({ size }: ButtonProps) => {
  const handleLogin = () => {
    window.Kakao.Auth.authorize({
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECTURI,
    });
    window.location.href = process.env.NEXT_PUBLIC_LOGIN_REDIRECTURI
      ? process.env.NEXT_PUBLIC_LOGIN_REDIRECTURI
      : '/';
  };

  return size === 'lg' ? (
    <LargeButton type="button" onClick={handleLogin}>
      <FontAwesomeIcon icon={faComment} />
      <h4>카카오 로그인</h4>
    </LargeButton>
  ) : (
    <SmallButton type="button" onClick={handleLogin}>
      <FontAwesomeIcon icon={faComment} />
    </SmallButton>
  );
};
