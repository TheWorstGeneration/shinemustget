import { CopyRight } from '../../atoms/CopyRight/CopyRight';
import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { useInnerWidth } from '@/hooks/useInnerWidth';

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

export const Footer = () => {
  const size = useInnerWidth() > 500 ? 'lg' : 'sm';
  const handleGithub = () => {
    window.open('https://github.com/LimSB-dev');
  };

  return (
    <FooterContainer>
      <CopyRight size={size} />
      <GithubButton type="button" onClick={handleGithub} title="Go to Github">
        <FontAwesomeIcon icon={faGithub} size={'2x'} />
      </GithubButton>
    </FooterContainer>
  );
};