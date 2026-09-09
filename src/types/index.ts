export type ReleaseType = 'album' | 'single';
export interface Band { id?:string; name:string; slug:string; bio?:string; photoUrl?:string; logoUrl?:string; genre?:string; country?:string; formedYear?:number; website?:string; instagram?:string; createdAt?:any; updatedAt?:any; }
export interface Album { id?:string; title:string; slug:string; bandId:string; coverUrl?:string; releaseDate?:string; description?:string; createdAt?:any; updatedAt?:any; }
export interface Song { id?:string; title:string; slug:string; bandId:string; albumId?:string|null; releaseType:ReleaseType; coverUrl?:string; lyrics?:string; chords?:string; isPublished:boolean; trackNumber?:number; createdAt?:any; updatedAt?:any; }
