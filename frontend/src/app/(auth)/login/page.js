import { Suspense } from 'react';
import LoginClient from './LoginClient';

export const metadata = {
  title: 'Login – Guidevera',
  description: 'Log in to your Guidevera account to access your career roadmap, counseling sessions, and personalised recommendations.',
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b]" />}>
      <LoginClient />
    </Suspense>
  );
}