/**
 * ========================================================
 * FLORASTORY - JAVASCRIPT LOGIC
 * Sederhana, Interaktif, dan Mudah Dipahami
 * ========================================================
 */

// 1. TANGKAP SEMUA ELEMEN HTML YANG DIBUTUHKAN
// Tombol Mini Game
const btnWater = document.getElementById('btn-water');
const btnPluck = document.getElementById('btn-pluck');
const btnSun = document.getElementById('btn-sun');
const btnReset = document.getElementById('btn-reset-filter');

// Kartu Game untuk highlight aktif
const cardWater = document.getElementById('game-card-water');
const cardPluck = document.getElementById('game-card-pluck');
const cardSun = document.getElementById('game-card-sun');

// Ikon di dalam Game
const flowerIconWater = document.getElementById('flower-icon-water');
const flowerIconPluck = document.getElementById('flower-icon-pluck');
const flowerIconSun = document.getElementById('flower-icon-sun');

// Wadah stage untuk trigger animasi CSS
const stageWater = cardWater.querySelector('.game-stage');
const stagePluck = cardPluck.querySelector('.game-stage');
const stageSun = cardSun.querySelector('.game-stage');

// Elemen Teks Status & Produk
const activeFilterText = document.getElementById('active-filter-text');
const flowerItems = document.querySelectorAll('.flower-item');
const noProductAlert = document.getElementById('no-product-alert');

// Modal Pemesanan & Form WhatsApp
const orderModalElement = document.getElementById('orderModal');
const orderModal = new bootstrap.Modal(orderModalElement);
const modalFlowerName = document.getElementById('modal-flower-name');
const modalFlowerPrice = document.getElementById('modal-flower-price');
const buyerNameInput = document.getElementById('buyer-name');
const buyerNoteInput = document.getElementById('buyer-note');
const btnSubmitOrder = document.getElementById('btn-submit-order');

// Variabel data pesanan yang dipilih
let selectedFlower = {
  name: '',
  price: ''
};

// ========================================================
// 2. FUNGSI FILTER PRODUK KATALOG
// ========================================================
/**
 * Menyaring produk bunga berdasarkan kategori yang dipilih
 * @param {string} category - 'pot', 'buket', 'tropis', atau 'semua'
 */
function filterFlowers(category) {
  let countVisible = 0;

  flowerItems.forEach(item => {
    const itemCategory = item.getAttribute('data-category');

    // Jika kategori cocok atau 'semua', tampilkan produk
    if (category === 'semua' || itemCategory === category) {
      item.classList.remove('is-hidden');
      countVisible++;
    } else {
      // Sembunyikan produk yang tidak cocok
      item.classList.add('is-hidden');
    }
  });

  // Tampilkan pesan kosong jika tidak ada produk
  if (countVisible === 0) {
    noProductAlert.classList.remove('d-none');
  } else {
    noProductAlert.classList.add('d-none');
  }
}

// ========================================================
// 3. FUNGSI MENGHAPUS STATE AKTIF PADA KARTU GAME
// ========================================================
function clearActiveGameCards() {
  cardWater.classList.remove('active-game');
  cardPluck.classList.remove('active-game');
  cardSun.classList.remove('active-game');
}

// ========================================================
// 4. LOGIKA 3 MINI GAME INTERAKTIF
// ========================================================

/**
 * GAME FILTER 1: MENYIRAM BUNGA (Kategori: POT)
 */
btnWater.addEventListener('click', () => {
  // 1. Jalankan animasi tetesan air dan pertumbuhan
  stageWater.classList.remove('watering-active');
  void stageWater.offsetWidth; // Refresh reflow animasi
  stageWater.classList.add('watering-active');

  // 2. Ubah ikon tunas 🌱 menjadi bunga mekar 🌸
  flowerIconWater.textContent = '🌺';

  // 3. Highlight kartu game yang sedang aktif
  clearActiveGameCards();
  cardWater.classList.add('active-game');

  // 4. Update teks status
  activeFilterText.innerHTML = `💧 <strong>Bunga Disiram:</strong> Menampilkan Tanaman Pot Segar`;
  activeFilterText.className = 'text-primary fs-6';

  // 5. Filter produk di katalog
  filterFlowers('pot');

  // 6. Efek reset animasi setelah selesai
  setTimeout(() => {
    stageWater.classList.remove('watering-active');
  }, 900);
});

/**
 * GAME FILTER 2: MEMETIK BUNGA (Kategori: BUKET)
 */
btnPluck.addEventListener('click', () => {
  // 1. Jalankan animasi gunting & partikel petik
  stagePluck.classList.remove('plucking-active');
  void stagePluck.offsetWidth; // Refresh reflow animasi
  stagePluck.classList.add('plucking-active');

  // 2. Ubah ikon setangkai mawar 🌹 menjadi buket cantik 💐
  flowerIconPluck.textContent = '💐';

  // 3. Highlight kartu game yang sedang aktif
  clearActiveGameCards();
  cardPluck.classList.add('active-game');

  // 4. Update teks status
  activeFilterText.innerHTML = `✂️ <strong>Bunga Dipetik:</strong> Menampilkan Koleksi Buket Siap Dirangkai`;
  activeFilterText.className = 'text-danger fs-6';

  // 5. Filter produk di katalog
  filterFlowers('buket');

  // 6. Efek reset animasi setelah selesai
  setTimeout(() => {
    stagePluck.classList.remove('plucking-active');
  }, 900);
});

/**
 * GAME FILTER 3: SINAR MATAHARI (Kategori: TROPIS)
 */
btnSun.addEventListener('click', () => {
  // 1. Jalankan animasi pancaran sinar mentari
  stageSun.classList.remove('sun-active');
  void stageSun.offsetWidth; // Refresh reflow animasi
  stageSun.classList.add('sun-active');

  // 2. Ikon bunga matahari mekar sempurna
  flowerIconSun.textContent = '🌻';

  // 3. Highlight kartu game yang sedang aktif
  clearActiveGameCards();
  cardSun.classList.add('active-game');

  // 4. Update teks status
  activeFilterText.innerHTML = `☀️ <strong>Diberi Sinar Mentari:</strong> Menampilkan Bunga & Tanaman Tropis Cerah`;
  activeFilterText.className = 'text-warning text-darken fs-6';

  // 5. Filter produk di katalog
  filterFlowers('tropis');

  // 6. Efek reset animasi setelah selesai
  setTimeout(() => {
    stageSun.classList.remove('sun-active');
  }, 900);
});

/**
 * RESET FILTER: KEMBALI KE SEMUA BUNGA
 */
btnReset.addEventListener('click', () => {
  // 1. Bersihkan highlight
  clearActiveGameCards();

  // 2. Kembalikan ikon game ke kondisi semula
  flowerIconWater.textContent = '🌱';
  flowerIconPluck.textContent = '🌹';
  flowerIconSun.textContent = '🌻';

  // 3. Tampilkan semua bunga
  filterFlowers('semua');

  // 4. Update teks status
  activeFilterText.innerHTML = `Menampilkan Semua Bunga (8 Koleksi)`;
  activeFilterText.className = 'text-success fs-6';
});

// ========================================================
// 5. LOGIKA MODAL PEMESANAN & KIRIM KE WHATSAPP
// ========================================================

// Pasang event listener ke setiap tombol "Pesan" pada kartu produk
document.querySelectorAll('.btn-order').forEach(button => {
  button.addEventListener('click', (event) => {
    const btn = event.currentTarget;
    selectedFlower.name = btn.getAttribute('data-name');
    selectedFlower.price = btn.getAttribute('data-price');

    // Masukkan data ke modal
    modalFlowerName.textContent = selectedFlower.name;
    modalFlowerPrice.textContent = selectedFlower.price;
    buyerNameInput.value = '';
    buyerNoteInput.value = '';

    // Buka modal
    orderModal.show();
  });
});

// Tombol Submit di dalam modal -> buka WhatsApp
btnSubmitOrder.addEventListener('click', () => {
  const buyerName = buyerNameInput.value.trim() || 'Pelanggan';
  const buyerNote = buyerNoteInput.value.trim() || '-';
  const phoneNumber = '6281234567890'; // Ganti dengan nomor WhatsApp toko yang diinginkan

  // Format Pesan WhatsApp yang Rapi
  const message = `Halo FloraStory! 🌸%0A%0ASaya ingin memesan bunga:%0A- *Produk:* ${encodeURIComponent(selectedFlower.name)}%0A- *Harga:* ${encodeURIComponent(selectedFlower.price)}%0A- *Nama Pemesan:* ${encodeURIComponent(buyerName)}%0A- *Ucapan / Catatan:* ${encodeURIComponent(buyerNote)}%0A%0AMohon info ketersediaan dan nomor rekening pembayarannya. Terima kasih!`;

  // Buka WhatsApp di tab baru
  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

  // Tutup modal
  orderModal.hide();
});

