import { useAppSelector } from '@/hooks/useRedux';
import { selectProfile } from '@/store/modules/profile';
import styled from '@emotion/styled';
import { faBuromobelexperte } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  font-size: 1.5rem;
  font-weight: 600;

  & > svg {
    // 그림자
    filter: drop-shadow(0 0 5px #d1ffc6);
  }

  &:hover {
    scale: 1.1;
    opacity: 0.8;
  }
`;

export const Logo = () => {
  const { isLogin } = useAppSelector(selectProfile);
  const url = isLogin ? '/home' : '/';

  return (
    <LogoLink
      href={url}
      passHref={true}
      aria-label={'redirect to landing page'}
      title={'landing page'}
    >
      <FontAwesomeIcon
        icon={faBuromobelexperte}
        size="2xl"
        rotation={90}
        color="#238835"
      />
    </LogoLink>
  );
};
