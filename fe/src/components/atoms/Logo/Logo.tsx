import { useAppSelector } from '@/hooks/useRedux';
import { selectProfile } from '@/store/modules/profile';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from '../../../../public/assets/images/common/logo.png';

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  font-size: 1.5rem;
  font-weight: 600;

  & > svg {
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
  const router = useRouter();
  const { pathname } = router;
  const isCreatePage = pathname === '/create';

  return (
    <LogoLink
      href={isCreatePage ? '/create' : url}
      passHref={true}
      aria-label={'redirect to landing page'}
      title={'landing page'}
    >
      {/* <FontAwesomeIcon
        icon={faBuromobelexperte}
        size="2xl"
        rotation={90}
        color="#238835"
      /> */}
      <Image src={logo} alt="logo" width={50} height={50} />
    </LogoLink>
  );
};
