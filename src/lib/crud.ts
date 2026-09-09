import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Band, Album, Song } from '@/types';

const slugify=(s:string)=>s.toLowerCase().trim().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
export { slugify };
export async function listCollection<T>(name:string){const snap=await getDocs(query(collection(db,name),orderBy('updatedAt','desc'))).catch(()=>getDocs(collection(db,name))); return snap.docs.map(d=>({id:d.id,...d.data()})) as T[];}
export async function saveEntity(name:string,id:string|undefined,data:any){ if(id) await updateDoc(doc(db,name,id),{...data,updatedAt:serverTimestamp()}); else await addDoc(collection(db,name),{...data,createdAt:serverTimestamp(),updatedAt:serverTimestamp()}); }
export async function removeEntity(name:string,id:string){await deleteDoc(doc(db,name,id));}
export async function getEntity<T>(name:string,id:string){const s=await getDoc(doc(db,name,id)); return s.exists()?({id:s.id,...s.data()} as T):null;}
export async function getBands(){return listCollection<Band>('bands');}
export async function getAlbums(){return listCollection<Album>('albums');}
export async function getSongs(){return listCollection<Song>('songs');}
