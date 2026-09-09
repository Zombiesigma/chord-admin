'use client';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
export default function Home(){const r=useRouter();useEffect(()=>onAuthStateChanged(auth,u=>r.replace(u?'/dashboard':'/login')),[r]);return null}
