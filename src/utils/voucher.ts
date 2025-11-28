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

  const today = new Date();
  const startDate = new Date(voucher.mulai);
  const endDate = new Date(voucher.berakhir);

  // Set time to midnight for fair date comparison
  today.setHours(0, 0, 0, 0);

  if (today < startDate) {
    return {
      isValid: false,
      message: "Voucher is not active yet.",
      discountAmount: 0,
    };
  }

  if (today > endDate) {
    return {
      isValid: false,
      message: "Voucher has expired.",
      discountAmount: 0,
    };
  }

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
