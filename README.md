# Chord Admin

Admin dashboard untuk mengelola katalog Chord menggunakan Firebase Authentication + Firestore. Cover disimpan di GitHub melalui server route agar GitHub token tidak pernah masuk ke browser.

## Fitur
- Login Firebase Email/Password.
- Proteksi admin berdasarkan dokumen `admins/{uid}`.
- Dashboard statistik.
- CRUD Band, Album, Lagu.
- Relasi Song -> Band -> Album.
- Lagu album tidak menyimpan cover sendiri; cover diambil dari Album.
- Single mempunyai cover sendiri.
- Upload gambar ke GitHub via `/api/github/upload`.
- Draft / Published untuk lagu.
- Responsive dark admin UI.

## Menjalankan

1. Salin `.env.local.example` menjadi `.env.local`.
2. Isi variabel GitHub:
   - `GITHUB_TOKEN`
   - `GITHUB_OWNER`
   - `GITHUB_REPO`
   - `GITHUB_BRANCH`
   - `GITHUB_COVERS_PATH`
3. Pastikan Firebase Authentication Email/Password aktif.
4. Buat user admin di Firebase Authentication.
5. Ambil UID user tersebut dan buat dokumen Firestore:
   `admins/{UID}`
   Isi minimal: `{ "role": "admin" }`.
6. Deploy `firestore.rules`.
7. `npm install`
8. `npm run dev`

## Struktur data

### bands/{bandId}
`name, slug, bio, photoUrl, logoUrl, genre, country, formedYear, website, instagram`

### albums/{albumId}
`title, slug, bandId, coverUrl, releaseDate, description`

### songs/{songId}
`title, slug, bandId, albumId, releaseType, coverUrl, lyrics, chords, isPublished, trackNumber`

Untuk `releaseType = album`, `coverUrl` sengaja dibuat null. Frontend publik harus resolve cover melalui `albumId -> albums.coverUrl`.

Untuk `releaseType = single`, `albumId` null dan `coverUrl` berisi URL GitHub.

## GitHub storage

Browser mengirim file ke Next.js API route. Server kemudian memakai `GITHUB_TOKEN` untuk membuat file melalui GitHub Contents API. Token tidak diletakkan pada `NEXT_PUBLIC_*`.

GitHub raw URL yang disimpan ke Firestore berbentuk:
`https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{path}`

## Catatan keamanan
Firebase Web API key memang dapat terlihat pada aplikasi web; keamanan utama tetap berasal dari Firebase Auth dan Firestore Rules. GitHub PAT adalah rahasia dan hanya boleh berada di environment server.
