import { useEffect, useState } from 'react';

export const usePageYOffset = () => {
  const [pageYOffset, setPageYOffset] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setPageYOffset(window.pageYOffset);
    });

    return () => {
      window.removeEventListener('scroll', () => {
        setPageYOffset(window.pageYOffset);
      });
    };
  }, [pageYOffset]);

  return pageYOffset;
};
