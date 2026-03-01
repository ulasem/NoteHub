'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUserAuthStore } from '@/lib/store/authStore';
import { LoginRequest, register } from '@/lib/api/clientApi';
import { ApiError } from '@/app/api/api';

import css from './SignUpPage.module.css';

function SignUpPage() {
  const [error, setError] = useState('');
  const router = useRouter();
  const setAuthUser = useUserAuthStore(state => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const values: LoginRequest = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      };

      const user = await register(values);

      if (user) {
        setAuthUser(user);
        router.push('/profile');
      } else {
        setError('Invalid email or password.');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error',
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form action={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign up</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" className={css.input} required />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            minLength={5}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

export default SignUpPage;
