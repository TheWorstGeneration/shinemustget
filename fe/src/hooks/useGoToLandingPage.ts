import { selectProfile } from '@/store/modules/profile';
import { useAppSelector } from './useRedux';
import { useRouter } from 'next/router';

export const useGoToLandingPage = () => {
  const { isLogin } = useAppSelector(selectProfile);
  const router = useRouter();

  if (!isLogin) {
    router.push('/');
  }
};
