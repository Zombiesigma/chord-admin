'use client';
import { useEffect,useState } from 'react';
import { onAuthStateChanged,User } from 'firebase/auth';
import { auth,db } from '@/lib/firebase';
import { doc,getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
export default function AuthGate({children}:{children:React.ReactNode}){const [user,setUser]=useState<User|null>(null);const [checking,setChecking]=useState(true);const r=useRouter();useEffect(()=>onAuthStateChanged(auth,async u=>{if(!u){r.replace('/login');return} const a=await getDoc(doc(db,'admins',u.uid)); if(!a.exists()){await auth.signOut();r.replace('/login?error=not-admin');return} setUser(u);setChecking(false)}),[r]); if(checking||!user)return <div className="login"><div className="muted">Memeriksa akses admin…</div></div>; return <>{children}</>}
