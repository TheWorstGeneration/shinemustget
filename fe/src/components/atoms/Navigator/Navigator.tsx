import styled from '@emotion/styled';
import { faCircle, faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const LinkContainer = styled.div`
  position: fixed;
  top: 50%;
  left: calc(100vw - 4rem);
  transform: translateY(-50%);
  z-index: 200;

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
    width: 9rem;
    height: 3rem;
    flex-direction: row;

    top: calc(100vh - 10rem);
    left: calc(50vw);
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
      <NavigatorButton
        type="button"
        onClick={() => handleNavigator(0)}
        title="Go to Video Section"
      >
        <FontAwesomeIcon
          icon={curSection >= 0 && curSection < 1 ? faCircleDot : faCircle}
        />
      </NavigatorButton>
      <NavigatorButton
        type="button"
        onClick={() => handleNavigator(1)}
        title="Go to Character Section"
      >
        <FontAwesomeIcon
          icon={curSection >= 1 && curSection < 2 ? faCircleDot : faCircle}
        />
      </NavigatorButton>
      <NavigatorButton
        type="button"
        onClick={() => handleNavigator(2)}
        title="Go to Login Section"
      >
        <FontAwesomeIcon icon={curSection >= 2 ? faCircleDot : faCircle} />
      </NavigatorButton>
    </LinkContainer>
  );
};
