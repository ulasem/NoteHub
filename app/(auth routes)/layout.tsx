'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthRoutesLayoutProps {
  children: React.ReactNode;
}

function AuthRoutesLayout({ children }: AuthRoutesLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return <>{children}</>;
}

export default AuthRoutesLayout;
