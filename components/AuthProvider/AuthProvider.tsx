'use client';

import { useEffect } from 'react';
import { checkSession, getMe } from '@/lib/api/clientApi';
import { useUserAuthStore } from '@/lib/store/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const setUser = useUserAuthStore(state => state.setUser);
  const clearIsAuthenticated = useUserAuthStore(state => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
}

export default AuthProvider;
