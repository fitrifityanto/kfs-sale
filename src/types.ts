export interface Product {
  id: number;
  nama: string;
  gambar: string;
  harga_normal: number;
  diskon_persen: number;
  deskripsi: string;
}

export interface Voucher {
  kode: string;
  diskon_persen: number;
  min_belanja: number;
  mulai: string;
  berakhir: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomerData {
  name: string;
  phone: string;
  address: string;
  note: string;
}
