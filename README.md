# Database GBI Apostolic Center Doyo Baru

Sistem informasi manajemen gereja berbasis web untuk GBI Apostolic Center Doyo Baru.

## Online Demo

https://nokensoft.github.io/057-database-gbi-apostolic-center-doyo-baru/

## Tech Stack

- HTML5 + Tailwind CSS (CDN)
- Alpine.js 3.x (SPA routing)
- Chart.js (grafik & chart)
- Font Awesome 6.4
- Struktur folder mengikuti Laravel `resources/views`

---

## Daftar Fitur per Role

### Manager

**1. Dashboard Eksekutif**
- Statistik: total anggota, kehadiran minggu ini, pertumbuhan, saldo kas
- Grafik kehadiran (mingguan/bulanan)
- Chart pertumbuhan anggota (doughnut: dewasa, pemuda, remaja, anak)
- Ringkasan keuangan bulan ini
- Daftar item menunggu persetujuan

**2. Laporan Keuangan**
- Filter periode & kategori
- Ringkasan pemasukan, pengeluaran, saldo
- Tabel transaksi keuangan (debit/kredit/saldo)
- Export laporan

**3. Inventaris Aset**
- CRUD data aset gereja
- Filter kategori (Elektronik, Furniture, Kendaraan, Properti)
- Tracking kondisi aset (Baik/Rusak Ringan/Rusak Berat)

**4. Approval / Penyetujuan**
- Tab: Menunggu, Disetujui, Ditolak
- Setujui/tolak pengajuan dari operator (mutasi, dana, perubahan data)
- Badge notifikasi jumlah pending

**5. Program & Jadwal**
- CRUD program gereja (retreat, bakti sosial, rapat, dll)
- Kalender program dengan kartu tanggal, status, PJ, peserta

**6. Jadwal Ibadah (CRUD)**
- CRUD jadwal ibadah (tambah/edit/hapus)
- Pengulangan: Mingguan, Bulanan, Tahunan, Sekali
- Overview kartu per hari (Minggu, Rabu, Kamis, Jumat, Sabtu)
- Filter: pencarian, hari, kategori, pengulangan
- Kategori: Ibadah Umum, Pemuda, Anak, Komsel

**7. Manajemen Operator (CRUD)**
- CRUD data operator (tambah/edit/hapus)
- Role otomatis: Operator
- Filter pencarian & status (Aktif/Nonaktif)
- Info: nama, email, no. HP, username, terakhir login

**8. User Logs**
- Statistik: operator aktif, total login, login gagal
- Riwayat aktivitas operator (login/logout/gagal)
- Filter pencarian, jenis aktivitas, tanggal
- Export data

---

### Operator

**1. Dashboard**
- Statistik: total anggota, anggota baru, kehadiran, surat diproses
- Aksi cepat: Input Anggota, Kehadiran Jemaat, Cetak Surat
- Daftar input data terkini

**2. Kartu Keluarga (CRUD)**
- CRUD data keluarga (No. KK, kepala keluarga, alamat)
- Statistik: total keluarga, anggota terhubung, belum terhubung
- Detail anggota per keluarga (expand table)
- Export Excel

**3. Data Anggota (CRUD)**
- CRUD data anggota lengkap (nama, NIK, TTL, JK, status nikah, alamat)
- Relasi ke keluarga (keluargaId, hubungan)
- Kelompok layanan: Sekolah Minggu, Pemuda, Dewasa
- Keanggotaan komsel
- Filter: pencarian, status, kelompok, komsel
- Export Excel, pagination

**4. Mutasi Anggota**
- Form pengajuan mutasi (masuk/keluar/meninggal)
- Input gereja asal/tujuan, tanggal, keterangan
- Riwayat mutasi dengan status persetujuan

**5. Manajemen Komsel (CRUD)**
- CRUD data komsel (nama, pemimpin, wilayah, hari, telepon)
- Kartu ringkasan per komsel
- Tabel daftar komsel
- Export Excel

**6. Kehadiran Jemaat**
- Input kehadiran: jenis ibadah, tanggal, jumlah L/P
- Ringkasan kartu: laki-laki, perempuan, total
- Riwayat kehadiran (tabel + edit/hapus)
- Grafik rekap kehadiran (stacked bar chart, 5 minggu terakhir)
- Export Excel

**7. Pelayanan** (3 tab)
- **Jadwal Ibadah** — read-only, dikelola oleh Manager
  - Overview kartu per hari + tabel lengkap
  - Kolom: nama, hari, waktu, tempat, kategori, pengulangan, keterangan
- **Data Aktivis** — CRUD data pelayan gereja
  - Bidang: Worship Team, Multimedia, Usher, Doa, Anak/SM
- **Jadwal Tugas** — CRUD jadwal pelayanan mingguan
  - Mapping: WL, singer, musik, sound, usher per ibadah

**8. Surat Menyurat** (4 tab)
- Surat Baptis — form + cetak
- Surat Penyerahan Anak — form + cetak
- Surat Keterangan Keanggotaan — form + cetak
- Surat Pindah — form + cetak
- Riwayat surat terbit + preview & print
- No. surat auto-generate

---

## Struktur Folder

```
resources/
├── css/app.css          # Global styles
├── js/app.js            # Shared utilities (chart helpers, formatRupiah)
└── views/
    ├── auth/login.html   # Halaman login
    ├── admin-master/     # Panel Admin Master
    ├── manager/          # Panel Manager
    └── operator/         # Panel Operator
```

## Developed by

[Nokensoft.com](https://nokensoft.com) — 2026
