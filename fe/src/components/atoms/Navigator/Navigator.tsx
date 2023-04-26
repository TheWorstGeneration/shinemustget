import styled from '@emotion/styled';
import { faCircle, faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

const LinkContainer = styled.button`
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
  box-shadow: 0 0 0.5rem 1px #22222225;
  padding: 1rem;
`;

const NavigatorLink = styled.div`
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
      <NavigatorLink onClick={() => handleNavigator(0)}>
        <FontAwesomeIcon
          icon={curSection >= 0 && curSection < 1 ? faCircleDot : faCircle}
        />
      </NavigatorLink>
      <NavigatorLink onClick={() => handleNavigator(1)}>
        <FontAwesomeIcon
          icon={curSection >= 1 && curSection < 2 ? faCircleDot : faCircle}
        />
      </NavigatorLink>
      <NavigatorLink onClick={() => handleNavigator(2)}>
        <FontAwesomeIcon icon={curSection >= 2 ? faCircleDot : faCircle} />
      </NavigatorLink>
    </LinkContainer>
  );
};
