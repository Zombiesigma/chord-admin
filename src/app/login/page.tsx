'use client';

import { Suspense } from 'react';
import LoginForm from './LoginForm';

function LoginFallback() {
  return (
    <main className="login-page">
      <div className="login-card">
        <div className="eyebrow">Chord Admin</div>
        <h1 className="title">Masuk</h1>
        <p className="muted">Memuat halaman login...</p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginForm />
    </Suspense>
  );
}
