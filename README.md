# Proyek Aplikasi Full-Stack Sederhana

Proyek ini adalah koleksi dua aplikasi web sederhana yang dirancang untuk mendemonstrasikan konsep pengembangan **Full-Stack**, yaitu interaksi antara Frontend, Backend, dan Database.

**Status:** Selesai dan Fungsional

## Struktur Repositori
```
./
├── frontend_weather/            # Aplikasi Frontend Weather (HTML, CSS, JS)
│   ├── index.html
│   └── README.md                # (opsional, detail lebih lanjut untuk aplikasi weather)
├── frontend_profil/             # Aplikasi Frontend Profil (HTML, CSS, JS)
│   ├── index.html
│   └── README.md                # (opsional, detail lebih lanjut untuk aplikasi profil)
└── backend_api/                 # Backend API (Node.js, Express.js, MySQL)
    ├── node_modules/
    ├── app.js
    ├── package.json
    ├── package-lock.json
    └── README.md                # (opsional, detail lebih lanjut untuk backend API)
```
## Gambaran Umum Aplikasi

### 1. Aplikasi Cuaca Sederhana (Frontend Murni)
* **Lokasi:** `frontend_weather/`
* Aplikasi ini adalah tampilan frontend dasar yang dibuat dengan HTML, CSS, dan JavaScript untuk menampilkan informasi cuaca. Ia terhubung langsung ke [OpenWeatherMap API](https://openweathermap.org/) untuk mendapatkan data cuaca *real-time*.
* **Tujuan Belajar:** Memahami konsep Frontend, API Consumption (mengonsumsi API pihak ketiga).

### 2. Aplikasi CRUD Profil (Full-Stack: Backend & Frontend)
* **Lokasi:**
    * **Backend:** `backend_api/`
    * **Frontend:** `frontend_profil/`
* Aplikasi ini mendemonstrasikan operasi **CRUD (Create, Read, Update, Delete)** untuk data profil. Terdiri dari backend API berbasis Node.js/Express.js yang terhubung ke database MySQL, dan frontend HTML/CSS/JavaScript yang mengonsumsi serta mengelola data melalui API tersebut.
* **Tujuan Belajar:** Memahami konsep Backend API, Koneksi Database (MySQL), Operasi CRUD, dan Interaksi Frontend-Backend.

## Teknologi yang Digunakan

### Umum
* **HTML5:** Struktur dasar halaman web.
* **CSS3:** Styling dan tampilan visual aplikasi.
* **JavaScript (ES6+):** Logika frontend dan runtime backend (dengan Node.js).

### Khusus Backend (`backend_api/`)
* **Node.js:** Lingkungan runtime JavaScript.
* **Express.js:** Web framework untuk Node.js.
* **mysql2:** Driver Node.js untuk berinteraksi dengan database MySQL.
* **cors:** Middleware Express.js untuk menangani Cross-Origin Resource Sharing (CORS).

### Khusus Database
* **MySQL:** Sistem manajemen database relasional.

### Khusus API Eksternal (untuk `frontend_weather/`)
* **OpenWeatherMap API:** Sumber data cuaca.

## Prasyarat

Sebelum menjalankan proyek ini, pastikan Anda telah menginstal yang berikut:
* [Node.js](https://nodejs.org/) (termasuk npm)
* [MySQL Server](https://dev.mysql.com/downloads/mysql/)

## Setup dan Cara Menjalankan Proyek

### 1. Persiapan Database (MySQL)

* Buka MySQL Command Line Client atau tool manajemen database Anda.
* Buat database baru:
    ```sql
    CREATE DATABASE db_profil_caelan;
    ```
* Gunakan database tersebut:
    ```sql
    USE db_profil_caelan;
    ```
* Buat tabel `profil`:
    ```sql
    CREATE TABLE profil (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(255) NOT NULL,
        kampus VARCHAR(255),
        jurusan VARCHAR(255),
        semester VARCHAR(50)
    );
    ```
* (Opsional) Masukkan beberapa data awal untuk pengujian:
    ```sql
    INSERT INTO profil (nama, kampus, jurusan, semester) VALUES ('Caelan Zhou', 'Institut Teknologi Sumatera', 'Sains Data', '4');
    INSERT INTO profil (nama, kampus, jurusan, semester) VALUES ('Akira', 'Institut Teknologi Sumatera', 'Teknik Informatika', '4');
    INSERT INTO profil (nama, kampus, jurusan, semester) VALUES ('Lisa Manoban', 'YG Entertainment', 'Tari', '8');
    ```

### 2. Setup dan Jalankan Backend API (`backend_api/`)

1.  **Navigasi ke Folder Backend:**
    ```bash
    cd [nama_folder_repositori]/backend_api
    ```
2.  **Inisialisasi Proyek Node.js dan Instal Dependensi:**
    ```bash
    npm init -y
    npm install express mysql2 cors
    ```
3.  **Konfigurasi Koneksi Database:**
    * Buka file `app.js` di editor teks Anda.
    * Cari baris `password: 'your_mysql_password'` di objek `dbConfig`.
    * Ganti `'your_mysql_password'` dengan password MySQL `root` Anda.
4.  **Jalankan Backend Server:**
    ```bash
    node app.js
    ```
    *Biarkan CMD/Terminal ini tetap terbuka saat Anda menggunakan frontend.*

### 3. Setup dan Jalankan Aplikasi Frontend Profil (`frontend_profil/`)

1.  **Navigasi ke Folder Frontend Profil:**
    ```bash
    cd [nama_folder_repositori]/frontend_profil
    ```
2.  **Buka Aplikasi Frontend:**
    * Buka file `index.html` langsung di browser web Anda (klik dua kali pada file tersebut).
    * *(Alternatif, jika Anda mengalami masalah CORS karena protokol `file:///`)*:
        * Instal `http-server` secara global (jika belum): `npm install -g http-server`
        * Jalankan server HTTP statis dari folder `frontend_profil`: `http-server -p 8080`
        * Akses di browser: `http://localhost:8080/index.html`

### 4. Setup dan Jalankan Aplikasi Frontend Cuaca (`frontend_weather/`)

1.  **Dapatkan API Key OpenWeatherMap:**
    * Kunjungi [OpenWeatherMap](https://openweathermap.org/) dan daftar/login untuk mendapatkan API Key gratis.
    * Setelah login, navigasi ke bagian "API keys" di akun Anda dan salin API Key Anda.

2.  **Navigasi ke Folder Frontend Weather:**
    ```bash
    cd [nama_folder_repositori]/frontend_weather
    ```

3.  **Konfigurasi API Key:**
    * Buka file `index.html` di editor teks Anda.
    * Cari baris JavaScript: `const apiKey = 'YOUR_API_KEY_HERE';`
    * Ganti `'YOUR_API_KEY_HERE'` dengan API Key OpenWeatherMap Anda yang sebenarnya.

4.  **Buka Aplikasi Frontend Cuaca:**
    * Simpan perubahan pada `index.html`.
    * Buka file `index.html` langsung di browser web Anda (klik dua kali pada file tersebut).

## Lisensi

Proyek ini bersifat open-source dan tersedia di bawah Lisensi MIT.
