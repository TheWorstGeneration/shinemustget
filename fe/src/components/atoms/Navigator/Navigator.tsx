import styled from '@emotion/styled';
import { faCircle, faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const LinkContainer = styled.div`
  position: fixed;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 3rem;
  height: 9rem;

  background-color: #ffffff;
  border-radius: 1.5rem;
  box-shadow: 0 0 0.5rem 1px rgba(0, 0, 0, 0.25);
  padding: 1rem;

  @media screen and (max-width: 500px) {
    // 90도 회전
    width: 9rem;
    height: 3rem;
    flex-direction: row;

    // 바닥에 위치
    top: auto;
    bottom: 4rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const NavigatorButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;

  color: #4ae524;
  text-decoration: none;
  transition: color 0s ease-in-out !important;
  &:hover {
    color: #359618;
  }
`;

export const Navigator = () => {
  const [curSection, setCurSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setCurSection(window.pageYOffset / (window.innerHeight - 88));
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavigator = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <LinkContainer>
      <NavigatorButton type="button" onClick={() => handleNavigator(0)}>
        <FontAwesomeIcon
          icon={curSection >= 0 && curSection < 1 ? faCircleDot : faCircle}
        />
      </NavigatorButton>
      <NavigatorButton type="button" onClick={() => handleNavigator(1)}>
        <FontAwesomeIcon
          icon={curSection >= 1 && curSection < 2 ? faCircleDot : faCircle}
        />
      </NavigatorButton>
      <NavigatorButton type="button" onClick={() => handleNavigator(2)}>
        <FontAwesomeIcon icon={curSection >= 2 ? faCircleDot : faCircle} />
      </NavigatorButton>
    </LinkContainer>
  );
};
