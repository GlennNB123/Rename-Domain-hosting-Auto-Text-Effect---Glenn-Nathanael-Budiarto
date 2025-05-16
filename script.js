// Mengambil elemen DOM tempat teks akan diketik dan input kecepatan
const textEl = document.getElementById('Autotext');
const speedEl = document.getElementById('speedlevel');

// Teks yang akan diketik secara otomatis
const text = 'Hidup itu cuma sekali dan harus dijalani dengan berpikir, tapi kalau kelamaan berpikir entar malah kepikiran';
let idx = 1; // Indeks karakter saat ini
let speed = 300 / speedEl.value; // Kecepatan mengetik (semakin besar nilai input, semakin cepat)
let typingInterval; // Variabel untuk menyimpan timeout

// Fungsi untuk menampilkan teks satu per satu (efek mengetik)
function writeText() {
  // Potong teks sampai karakter ke-idx dan tambahkan kursor kedip
  textEl.innerHTML = text.slice(0, idx) + '<span class="blink">|</span>';
  idx++; // Naikkan indeks karakter
  // Jika masih ada karakter tersisa, lanjutkan mengetik
  if (idx <= text.length) {
    typingInterval = setTimeout(writeText, speed); // Jalankan fungsi ini lagi setelah jeda
  }
}

// Saat seluruh halaman selesai dimuat
window.addEventListener('load', () => {
  // Tampilkan popup selamat datang menggunakan SweetAlert2
  Swal.fire({
    html: `
      <img src="https://www.santa-laurensia.com/sutera/wp-content/uploads/2024/10/logo-las-286x300-1.png" alt="Logo Sekolah" style="width: 120px;">
      <h1>👋 Selamat Datang!</h1>
      <br>
      <div class="sweet-wrapper">
        <img src="gambar.jpg" alt="Foto Siswa" class="sweet-photo">
        <h2><u>Glenn Nathanael Budiarto</u></h2>
        <p>Kelas 11 / Absen 16</p>
        <br>
        <h2><u>Quotes</u></h2>
        <p style="font-size:20px">"<b><i>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</i></b>"
        <br><br>Demikian pula, tidak adakah orang yang mencintai atau mengejar atau ingin mengalami penderitaan, bukan semata mata karena penderitaan itu sendiri</p>
        <br><h3><u>Masukan terakhir untuk ICT</u></h3>
        <p>Ga ada masukan karena sir Nuel guru ICT ter-debest</p>
      </div>
    `,
    confirmButtonText: '<b>Lanjut!</b>', // Tombol konfirmasi
    confirmButtonColor: '#000080', // Warna tombol
    allowOutsideClick: false, // Tidak bisa klik di luar popup
    allowEscapeKey: false, // Tidak bisa keluar dengan tombol Esc
    allowEnterKey: false, // Tidak bisa lanjut dengan Enter
    timerProgressBar: true, // Tampilkan progress bar timer
    timer: 20000, // Durasi popup 20 detik
    backdrop: `
      rgba(0, 0, 0, 0.3)
      url("https://media.tenor.com/0BYumjrfJGUAAAAj/one-piece-pixel.gif")
      left bottom
      no-repeat
    ` // Background gif dan warna gelap transparan
  }).then(() => {
    // Setelah popup ditutup (otomatis atau klik tombol)
    // Tampilkan teks dan input yang sebelumnya disembunyikan
    document.querySelector('.tempat-nulis').classList.remove('hidden');
    document.querySelector('.kecepatan').classList.remove('hidden');
    writeText(); // Mulai mengetik
  });
});

// Event listener saat user mengubah nilai speed input
speedEl.addEventListener('input', (e) => {
  speed = 300 / e.target.value; // Update kecepatan berdasarkan input
  clearTimeout(typingInterval); // Hentikan ketikan sebelumnya
  idx = 1; // Reset indeks karakter
  writeText(); // Mulai ulang pengetikan dari awal
});
