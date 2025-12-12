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
    mulai: "2025-12-19",
    berakhir: "2025-12-21",
  },
  {
    kode: "LAST45",
    diskon_persen: 45,
    min_belanja: 130000,
    mulai: "2025-12-25",
    berakhir: "2025-12-31",
  },
  {
    kode: "KF0101",
    diskon_persen: 45,
    min_belanja: 100000,
    mulai: "2026-01-01",
    berakhir: "2026-01-02",
  },
];
