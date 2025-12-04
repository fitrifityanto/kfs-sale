import type { Voucher } from "../types";

/**
 * Memeriksa apakah suatu voucher sedang aktif berdasarkan tanggal hari ini.
 * Logika ini konsisten dengan validasi tanggal di validateVoucher.ts.
 */
export const isVoucherActive = (voucher: Voucher): boolean => {
  // Ambil tanggal hari ini dan set ke tengah malam UTC (untuk tanggal murni)
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Menggunakan UTC untuk konsistensi
  const todayUTC = today.getTime();

  const startDate = new Date(voucher.mulai + "T00:00:00Z");
  const endDate = new Date(voucher.berakhir + "T23:59:59Z");

  return todayUTC >= startDate.getTime() && todayUTC <= endDate.getTime();
};
