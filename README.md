## 🏷️ Clearance Event: Street Socks - Final Gear Drop

**Clearance Event 35% | No Restocks. No Exceptions. Grab your gear before it's gone.**

Aplikasi _e-commerce_ sederhana untuk menjual kaos kaki dengan sistem "Clearance Sale," di mana pemesanan dan _checkout_ dilakukan melalui WhatsApp untuk mempermudah proses.

### ⚙️ Teknologi yang Digunakan (Tech Stack)

Proyek ini dibangun menggunakan:

- **Frontend _Framework_**: React (Vite)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS
- **Ikonografi**: Lucide React
- **Navigasi**: Internal React _State_ Management (Tidak menggunakan _client-side router_)

### 🚀 Fitur Utama

- **View Management**: Mengelola tampilan antara halaman **Home** (Product Grid) dan **Cart** menggunakan _state_ `view` di komponen `App.tsx`.
- **Clearance Product Listing**: Menampilkan daftar produk kaos kaki yang sedang di-**clearance** lengkap dengan nama, gambar, harga normal, dan detail diskon.
  - _Source file_: `product.ts`, `ProductGrid.tsx`, `ProductCard.tsx`
- **Shopping Cart**: Fungsionalitas untuk menambah, mengurangi jumlah (_quantity_), dan menghapus _item_ dari keranjang. Data keranjang disimpan di **LocalStorage**.
  - _Source file_: `CartItem.tsx`, `App.tsx`
- **Checkout Form**: Formulir untuk mengumpulkan data pemesan.
- **Voucher/Discount Application**: Sistem penerapan _voucher_ tambahan di atas diskon _clearance_ dasar, lengkap dengan validasi kode, minimal belanja (_min_belanja_), dan masa berlaku.
- **WhatsApp Order Generation**: Secara otomatis membuat pesan order terformat rapi yang siap dikirimkan ke nomor Admin via WhatsApp.

### 📂 Struktur Data Kunci

Aplikasi ini mengelola data produk dan _voucher_ melalui file **TypeScript**.

#### 1\. Produk (`productsData` di `product.ts`)

Setiap produk memiliki properti `id`, `nama`, `gambar`, `harga_normal`, `diskon_persen` (disetel 35%), dan `deskripsi`.

#### 2\. Voucher (`vouchersData` di `voucher.ts`)

Setiap _voucher_ memiliki `kode`, `diskon_persen`, `min_belanja`, `mulai`, dan `berakhir`.

### 🛠️ Pengaturan Proyek (Setup)

Untuk menjalankan proyek ini secara lokal, ikuti langkah-langkah berikut:

1.  **Clone Repository:**

    ```bash
    git clone [URL_REPOSITORY_ANDA]
    cd [NAMA_FOLDER]
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **Setup Environment Variables:**
    Anda perlu membuat file `.env.local` di _root_ proyek dan menentukan nomor WhatsApp Admin untuk fungsionalitas _checkout_.

    ```
    # .env.local
    VITE_ADMIN_PHONE=[Nomor WhatsApp Admin (misal: 62812xxxxxxx)]
    ```

4.  **Run Development Server:**

    ```bash
    npm run dev
    # atau
    yarn dev
    ```

Aplikasi akan berjalan di `http://localhost:5173` (atau _port_ yang berbeda).
