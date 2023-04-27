import { CopyRight } from '../../atoms/CopyRight/CopyRight';
import styled from '@emotion/styled';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

interface FooterProps {
  size: string;
}

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: relative;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 100;
  width: 100%;
  height: 5.5rem;
  padding: 0 10rem;

  background-color: #ffffff;

  @media (max-width: 960px) {
    padding: 0 1rem;
  }
`;

const GithubButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Footer = ({ size }: FooterProps) => {
  const handleGithub = () => {
    window.open('https://lab.ssafy.com/s08-final/S08P31B109');
  };

  return (
    <FooterContainer>
      <CopyRight size={size} />
      <GithubButton type="button" onClick={handleGithub}>
        <FontAwesomeIcon icon={faGithub} size={'2x'} />
      </GithubButton>
    </FooterContainer>
  );
};
