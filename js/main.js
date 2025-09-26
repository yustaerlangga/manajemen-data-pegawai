// js/main.js
import { renderDataToTable, tambahData, hapusData } from './controller.js';

// --- INISIALISASI ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Render data awal saat halaman dimuat
    renderDataToTable();

    // 2. Setup Event Listeners
    setupAddForm();
    setupDeleteByNameForm();
    setupDeleteButtonListeners();
});

// --- FUNGSI UTAMA UNTUK UPDATE TAMPILAN ---
// Fungsi ini dipanggil setelah setiap perubahan data
const refreshDisplay = () => {
    renderDataToTable();
    setupDeleteButtonListeners(); // Pasang ulang listener untuk tombol baru
};

// --- LOGIKA TAMBAH DATA (Formulir) ---
const setupAddForm = () => {
    document.getElementById('submitDataBtn').addEventListener('click', () => {
        const nama = document.getElementById('inputNama').value;
        const umur = parseInt(document.getElementById('inputUmur').value);
        const alamat = document.getElementById('inputAlamat').value;
        const email = document.getElementById('inputEmail').value;

        // Validasi sederhana
        if (!nama || !umur || !alamat || !email) {
            alert("Semua kolom harus diisi!");
            return;
        }

        // Tambahkan data
        tambahData({ nama, umur, alamat, email });

        // Update tampilan dan bersihkan formulir
        refreshDisplay();
        document.getElementById('addDataForm').reset(); // Reset form setelah submit
    });
};

// --- LOGIKA HAPUS DATA BERDASARKAN NAMA (Formulir) ---
const setupDeleteByNameForm = () => {
    document.getElementById('deleteDataByNameBtn').addEventListener('click', () => {
        const namaHapus = document.getElementById('inputNamaHapus').value;
        
        if (!namaHapus) {
            alert("Masukkan nama yang ingin dihapus!");
            return;
        }

        // Hapus data
        if (hapusData(namaHapus)) {
            // Jika berhasil dihapus, update tampilan
            refreshDisplay();
            document.getElementById('inputNamaHapus').value = '';
        } else {
            alert(`Gagal: Data dengan nama "${namaHapus}" tidak ditemukan.`);
        }
    });
};

// --- LOGIKA HAPUS DATA DARI TOMBOL DI TABEL ---
const setupDeleteButtonListeners = () => {
    // Gunakan event delegation pada tabel untuk tombol yang dibuat dinamis
    document.querySelector('#dataTable tbody').addEventListener('click', (event) => {
        // Cek apakah yang diklik adalah tombol Hapus
        if (event.target.classList.contains('delete-btn')) {
            const namaToDelete = event.target.dataset.nama;
            
            if (confirm(`Yakin ingin menghapus data atas nama ${namaToDelete}?`)) {
                hapusData(namaToDelete);
                refreshDisplay();
            }
        }
    });
};