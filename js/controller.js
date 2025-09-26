// js/controller.js
import data from './data.js';

// Fungsi untuk menghapus data berdasarkan nama (tanpa memanggil renderDataToTable di sini)
export const hapusData = (nama) => {
    const initialLength = data.length;
    const indexToDelete = data.findIndex(item => item.nama === nama);

    if (indexToDelete !== -1) {
        data.splice(indexToDelete, 1);
        console.log(`Data dengan nama ${nama} berhasil dihapus.`);
        return true; // Berhasil dihapus
    } else {
        console.log(`Data dengan nama ${nama} tidak ditemukan.`);
        return false; // Gagal dihapus
    }
};

// **Fungsi untuk MERENDER data ke tabel HTML**
export const renderDataToTable = () => {
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; 

    data.map((item, index) => {
        const row = tableBody.insertRow();
        
        row.insertCell().textContent = index + 1; 
        row.insertCell().textContent = item.nama;
        row.insertCell().textContent = item.umur;
        row.insertCell().textContent = item.alamat;
        row.insertCell().textContent = item.email;

        // Tambahkan tombol HAPUS di kolom Aksi
        const actionCell = row.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        deleteButton.classList.add('delete-btn');
        // Set ID data yang akan dihapus ke tombol
        deleteButton.dataset.nama = item.nama; 
        actionCell.appendChild(deleteButton);
    });

    console.log(`Tabel berhasil diperbarui. Total data: ${data.length}`);
};

// Fungsi untuk menambah data (Hanya push data)
export const tambahData = (newData) => {
    data.push(newData);
    console.log(`Data baru berhasil ditambahkan: ${newData.nama}`);
};