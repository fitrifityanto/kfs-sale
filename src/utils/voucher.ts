import type { Voucher } from "../types";

interface ValidationResult {
  isValid: boolean;
  message: string;
  discountAmount: number;
  voucher?: Voucher;
}

export const validateVoucher = (
  code: string,
  subtotal: number,
  availableVouchers: Voucher[],
): ValidationResult => {
  const voucher = availableVouchers.find(
    (v) => v.kode.toUpperCase() === code.toUpperCase(),
  );

  if (!voucher) {
    return {
      isValid: false,
      message: "Voucher code not found.",
      discountAmount: 0,
    };
  }

  // --- REVISI LOGIKA TANGGAL ---

  // 1. Ambil tanggal hari ini dan set ke tengah malam UTC (untuk tanggal murni)
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Menggunakan UTC untuk konsistensi

  // 2. Ambil tanggal mulai dan berakhir, pastikan juga diinisialisasi pada 00:00:00 UTC
  // Dengan menambahkan "T00:00:00Z" memastikan string "2025-11-28" diinterpretasikan dengan benar di UTC
  const startDate = new Date(voucher.mulai + "T00:00:00Z");
  // Tanggal berakhir perlu mencakup keseluruhan hari tersebut.
  // Kita set batas akhir hari, yaitu 23:59:59 pada hari berakhir.
  const endDate = new Date(voucher.berakhir + "T23:59:59Z");

  if (today.getTime() < startDate.getTime()) {
    return {
      isValid: false,
      message: "Voucher is not active yet.",
      discountAmount: 0,
    };
  }

  // Bandingkan today (00:00:00 UTC) dengan akhir hari (23:59:59 UTC)
  if (today.getTime() > endDate.getTime()) {
    return {
      isValid: false,
      message: "Voucher has expired.",
      discountAmount: 0,
    };
  }

  // --- AKHIR REVISI LOGIKA TANGGAL ---

  if (subtotal < voucher.min_belanja) {
    return {
      isValid: false,
      message: `Minimum purchase Rp ${voucher.min_belanja.toLocaleString()} required.`,
      discountAmount: 0,
    };
  }

  const discount = (subtotal * voucher.diskon_persen) / 100;

  return {
    isValid: true,
    message: `Voucher applied! -${voucher.diskon_persen}%`,
    discountAmount: discount,
    voucher: voucher,
  };
};
