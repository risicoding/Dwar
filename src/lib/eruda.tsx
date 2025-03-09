'use client';

import { useEffect } from 'react';

const ErudaProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      import('eruda')
        .then((eruda) => eruda.default.init())
        .catch(() => console.log('Erro loading eruda'));
    }
  }, []);
  return <>{children}</>;
};

export default ErudaProvider;
