import type { Voucher } from "../types";

export const vouchersData: Voucher[] = [
  {
    kode: "EASY20",
    diskon_persen: 20,
    min_belanja: 50000,
    mulai: "2025-12-01",
    berakhir: "2025-12-24",
  },
  {
    kode: "WKND35",
    diskon_persen: 35,
    min_belanja: 75000,
    mulai: "2025-11-28",
    berakhir: "2025-11-30",
  },
  {
    kode: "LAST45",
    diskon_persen: 45,
    min_belanja: 130000,
    mulai: "2025-11-23",
    berakhir: "2025-11-30",
  },
];
