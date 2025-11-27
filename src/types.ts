export interface Product {
  id: number;
  nama: string;
  gambar: string;
  harga_normal: number;
  diskon_persen: number;
  deskripsi: string;
}

export interface CartItem extends Product {
  quantity: number;
}
