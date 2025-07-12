// 1. Memanggil library Express dan CORS yang sudah kita install
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise'); // Panggil library mysql2

// 2. Membuat aplikasi Express baru
const app = express();
app.use(cors());
app.use(express.json()); // BARIS BARU INI UNTUK MEMBACA DATA JSON DARI REQUEST


// 3. Menentukan port di mana server akan berjalan
const port = 3000;

// 4. Konfigurasi koneksi ke database MySQL
const dbConfig = {
  host: 'localhost', // Alamat server database kamu
  user: 'root',      // Username MySQL kamu (biasanya 'root')
  password: '9174@jfai!900nnasYU', // GANTI DENGAN PASSWORD MySQL kamu
  database: 'db_profil_caelan' // Nama database yang tadi kita buat
};

// 5. Membuat "jalur" atau "endpoint" API pertama kita (tetap sama)
app.get('/', (req, res) => {
  res.send('Server backend sederhana sudah berjalan dan siap terhubung ke database!');
});

// 6. Membuat jalur API untuk data profil, sekarang ambil dari database
app.get('/profil', async (req, res) => {
  let connection; // Deklarasikan variabel connection di luar try
  try {
    // Membuat koneksi ke database
    connection = await mysql.createConnection(dbConfig);

    // Menjalankan query untuk mengambil data dari tabel profil
    const [rows] = await connection.execute('SELECT id, nama, kampus, jurusan, semester FROM profil');
    // Kita ambil data dengan id = 1 karena kita hanya memasukkan satu baris data

    // Cek apakah ada data yang ditemukan
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).json({ message: 'Data profil tidak ditemukan.' });
    }

  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data dari database:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server saat mengambil data profil.' });
  } finally {
    // Pastikan koneksi ditutup setelah selesai, baik berhasil maupun gagal
    if (connection) {
      await connection.end();
    }
  }
});

// 7. Membuat jalur API untuk menambahkan data profil baru (operasi CREATE)
// Ketika ada permintaan POST ke alamat '/profil'
app.post('/profil', async (req, res) => {
  let connection;
  try {
    // Data yang dikirim dari frontend akan ada di req.body
    // Untuk bisa membaca req.body, kita perlu middleware di atas (express.json())
    const { nama, kampus, jurusan, semester } = req.body;

    // Validasi sederhana (pastikan nama tidak kosong)
    if (!nama) {
      return res.status(400).json({ message: 'Nama tidak boleh kosong.' });
    }

    connection = await mysql.createConnection(dbConfig);

    // Menjalankan query untuk memasukkan data baru
    const [result] = await connection.execute(
      'INSERT INTO profil (nama, kampus, jurusan, semester) VALUES (?, ?, ?, ?)',
      [nama, kampus, jurusan, semester]
    );

    // Mengirimkan respons sukses
    res.status(201).json({
      message: 'Data profil berhasil ditambahkan!',
      id: result.insertId, // ID data yang baru ditambahkan
      data: { nama, kampus, jurusan, semester }
    });

  } catch (error) {
    console.error('Terjadi kesalahan saat menambahkan data ke database:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server saat menambahkan data profil.' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

// 8. Membuat jalur API untuk memperbarui data profil (operasi UPDATE)
// Ketika ada permintaan PUT ke alamat '/profil/:id'
// ':id' artinya ID akan diambil dari URL, misalnya /profil/1 atau /profil/3
app.put('/profil/:id', async (req, res) => {
  let connection;
  try {
    const profileId = req.params.id; // Mengambil ID dari URL
    const { nama, kampus, jurusan, semester } = req.body; // Mengambil data dari body request

    // Validasi sederhana: pastikan ID dan setidaknya satu field ada
    if (!profileId) {
      return res.status(400).json({ message: 'ID profil diperlukan untuk pembaruan.' });
    }
    if (!nama && !kampus && !jurusan && !semester) {
        return res.status(400).json({ message: 'Setidaknya satu kolom (nama, kampus, jurusan, atau semester) harus disediakan untuk pembaruan.' });
    }

    connection = await mysql.createConnection(dbConfig);

    // Membangun query UPDATE secara dinamis
    const fieldsToUpdate = [];
    const values = [];

    if (nama) {
        fieldsToUpdate.push('nama = ?');
        values.push(nama);
    }
    if (kampus) {
        fieldsToUpdate.push('kampus = ?');
        values.push(kampus);
    }
    if (jurusan) {
        fieldsToUpdate.push('jurusan = ?');
        values.push(jurusan);
    }
    if (semester) {
        fieldsToUpdate.push('semester = ?');
        values.push(semester);
    }

    // Tambahkan ID ke array values paling akhir untuk klausa WHERE
    values.push(profileId);

    const sql = `UPDATE profil SET ${fieldsToUpdate.join(', ')} WHERE id = ?`;

    const [result] = await connection.execute(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Profil dengan ID tersebut tidak ditemukan.' });
    }

    // Mengirimkan respons sukses
    res.json({ message: 'Data profil berhasil diperbarui!', id: profileId });

  } catch (error) {
    console.error('Terjadi kesalahan saat memperbarui data di database:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server saat memperbarui data profil.' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

// 9. Membuat jalur API untuk menghapus data profil (operasi DELETE)
// Ketika ada permintaan DELETE ke alamat '/profil/:id'
app.delete('/profil/:id', async (req, res) => {
  let connection;
  try {
    const profileId = req.params.id; // Mengambil ID dari URL

    // Validasi sederhana: pastikan ID ada
    if (!profileId) {
      return res.status(400).json({ message: 'ID profil diperlukan untuk penghapusan.' });
    }

    connection = await mysql.createConnection(dbConfig);

    // Menjalankan query untuk menghapus data
    const [result] = await connection.execute(
      'DELETE FROM profil WHERE id = ?',
      [profileId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Profil dengan ID tersebut tidak ditemukan.' });
    }

    // Mengirimkan respons sukses
    res.json({ message: 'Data profil berhasil dihapus!', id: profileId });

  } catch (error) {
    console.error('Terjadi kesalahan saat menghapus data dari database:', error);
    res.status(500).json({ message: 'Terjadi kesalahan server saat menghapus data profil.' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

// 7. Membuat server mulai "mendengarkan" permintaan
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
  console.log(`Coba akses: http://localhost:${port}/`);
  console.log(`Coba akses data profil (dari database): http://localhost:${port}/profil`);
});