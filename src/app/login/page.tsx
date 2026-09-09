'use client';

import { Suspense, useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (searchParams.get('error') === 'not-admin') {
      setErr(
        'Akun berhasil login, tetapi belum terdaftar sebagai admin. Buat dokumen admins/{UID} di Firestore.'
      );
    }
  }, [searchParams]);

  return (
    <div className="login">
      <div className="loginbox">
        <div className="eyebrow">
          Chord Management
        </div>

        <h1 className="title">
          Admin Login
        </h1>

        <p className="muted">
          Kelola lagu, band, album, dan cover
          dari satu tempat.
        </p>

        {err && (
          <div className="error">
            {err}
          </div>
        )}

        <div style={{ height: 14 }} />

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setErr('');

            try {
              await signInWithEmailAndPassword(
                auth,
                email,
                pass
              );

              router.replace('/dashboard');
            } catch (error: any) {
              setErr(
                error?.message?.replace(
                  'Firebase: ',
                  ''
                ) || 'Login gagal'
              );
            }
          }}
          className="formgrid"
        >
          <div className="field full">
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="field full">
            <label>Password</label>

            <input
              type="password"
              value={pass}
              onChange={(e) =>
                setPass(e.target.value)
              }
              required
            />
          </div>

          <div className="field full">
            <button
              className="btn primary"
              type="submit"
            >
              Masuk ke Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function LoginFallback() {
  return (
    <div className="login">
      <div className="loginbox">
        <div className="eyebrow">
          Chord Management
        </div>

        <h1 className="title">
          Admin Login
        </h1>

        <p className="muted">
          Memuat halaman login...
        </p>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <LoginContent />
    </Suspense>
  );
}
