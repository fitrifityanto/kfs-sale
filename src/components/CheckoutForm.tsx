import React, { useState, useEffect } from "react";
import { MessageCircle, X, Tag } from "lucide-react";
import type { CartItem, CustomerData, Voucher } from "../types";
import { formatRupiah } from "../utils/format";
import { vouchersData } from "../data/voucher";
import { validateVoucher } from "../utils/voucher";
import VoucherListModal from "./VoucherListModal";

interface CheckoutFormProps {
  cartItems: CartItem[];
  subtotal: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ cartItems, subtotal }) => {
  const [formData, setFormData] = useState<CustomerData>({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  // Calculate Total Items
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Voucher State
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<Voucher | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [voucherMessage, setVoucherMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Reset voucher if subtotal changes and falls below min requirement
  useEffect(() => {
    if (appliedVoucher) {
      const result = validateVoucher(
        appliedVoucher.kode,
        subtotal,
        vouchersData,
      );
      if (!result.isValid) {
        setAppliedVoucher(null);
        setDiscountAmount(0);
        setVoucherMessage({ type: "error", text: result.message });
      } else {
        setDiscountAmount(result.discountAmount);
      }
    }
  }, [subtotal, appliedVoucher]);

  const finalTotal = subtotal - discountAmount;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyVoucher = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submit
    setVoucherMessage(null);

    if (!voucherCode.trim()) return;

    const result = validateVoucher(voucherCode, subtotal, vouchersData);

    if (result.isValid && result.voucher) {
      setAppliedVoucher(result.voucher);
      setDiscountAmount(result.discountAmount);
      setVoucherMessage({ type: "success", text: result.message });
    } else {
      setAppliedVoucher(null);
      setDiscountAmount(0);
      setVoucherMessage({ type: "error", text: result.message });
    }
  };

  const handleRemoveVoucher = () => {
    setAppliedVoucher(null);
    setDiscountAmount(0);
    setVoucherCode("");
    setVoucherMessage(null);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Format Item List
    const itemList = cartItems
      .map((item, index) => {
        const price =
          item.harga_normal - (item.harga_normal * item.diskon_persen) / 100;
        return `${index + 1}. ${item.nama} - ${item.quantity}x (${formatRupiah(price * item.quantity)})`;
      })
      .join("\n");

    // 2. Construct Message with Voucher Info
    let priceDetails = `*Total Item: ${totalItems}*`;
    priceDetails += `\n*Subtotal: ${formatRupiah(subtotal)}*`;

    if (appliedVoucher) {
      priceDetails += `\n*Voucher (${appliedVoucher.kode}): -${formatRupiah(discountAmount)}*`;
      priceDetails += `\n*Total Tagihan: ${formatRupiah(finalTotal)}*`;
    } else {
      priceDetails += `\n*Total Tagihan: ${formatRupiah(subtotal)}*`;
    }

    const message = `Halo Admin, saya ingin order:

${itemList}

${priceDetails}
(Belum termasuk ongkir)

*Data Pemesan:*
Nama: ${formData.name}
No HP: ${formData.phone}
Alamat: ${formData.address}
Catatan: ${formData.note || "-"}

Mohon dihitungkan total + ongkirnya ya.`;

    // 3. Encode & Redirect
    const encodedMessage = encodeURIComponent(message);

    // Ganti nomor ini dengan nomor Admin toko
    const adminNumber = import.meta.env.VITE_ADMIN_PHONE;
    window.open(
      `https://wa.me/${adminNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };

  const handleSelectVoucher = (code: string) => {
    setVoucherCode(code);
    // handleApplyVoucher;
  };

  return (
    <div className="bg-neutral-50 border border-gray-200 p-6 md:p-8 sticky top-24">
      <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-6 border-b-2 border-black pb-2">
        Checkout
      </h3>

      <form onSubmit={handleCheckout} className="space-y-4">
        {/* Input Fields */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white border-2 border-gray-200 p-3 text-sm font-medium focus:border-street-red focus:outline-none rounded-none transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
            WhatsApp Number
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-white border-2 border-gray-200 p-3 text-sm font-medium focus:border-street-red focus:outline-none rounded-none transition-colors"
            placeholder="0812..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
            Shipping Address
          </label>
          <textarea
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            rows={3}
            className="w-full bg-white border-2 border-gray-200 p-3 text-sm font-medium focus:border-street-red focus:outline-none rounded-none transition-colors"
            placeholder="Complete street address, city, zip code..."
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
            Notes (Optional)
          </label>
          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            rows={2}
            className="w-full bg-white border-2 border-gray-200 p-3 text-sm font-medium focus:border-street-red focus:outline-none rounded-none transition-colors"
            placeholder="Size request, color preference, etc."
          />
        </div>

        {/* Voucher Section */}
        <div className="pt-4 border-t border-gray-200 mt-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
            Voucher Code
          </label>

          {/* Tombol untuk membuka Modal */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="text-xs font-bold uppercase text-black hover:text-street-red transition-colors"
          >
            View All Vouchers
          </button>

          {!appliedVoucher ? (
            <div className="flex lg:flex-col gap-2 flex-row ">
              <input
                type="text"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                placeholder="CODE"
                className="flex-grow bg-white border-2 border-gray-200 p-3 text-sm font-bold uppercase focus:border-black focus:outline-none rounded-none"
              />
              <button
                type="button"
                onClick={handleApplyVoucher}
                className="bg-gray-200 text-black px-4 lg:py-3 font-bold uppercase text-xs hover:bg-black hover:text-white transition-colors border-2 border-transparent"
              >
                Apply
              </button>
            </div>
          ) : (
            <div className="bg-green-50 border border-green-200 p-3 flex justify-between items-center">
              <div className="flex items-center gap-2 text-green-700">
                <Tag size={14} />
                <span className="text-xs font-bold uppercase">
                  {appliedVoucher.kode} Applied
                </span>
              </div>
              <button
                type="button"
                onClick={handleRemoveVoucher}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {voucherMessage && !appliedVoucher && (
            <p
              className={`text-[10px] font-bold uppercase tracking-wide mt-2 ${voucherMessage.type === "error" ? "text-street-red" : "text-green-600"}`}
            >
              {voucherMessage.text}
            </p>
          )}
        </div>

        {/* Total Summary */}
        <div className="pt-4 border-t border-gray-200 mt-2 space-y-2">
          {/* New Total Items Row */}
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold uppercase text-gray-500">
              Total Item
            </span>
            <span className="text-sm font-black text-black">
              {totalItems} Pcs
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-bold uppercase text-gray-500">
              Subtotal
            </span>
            <span className="text-base font-bold text-black">
              {formatRupiah(subtotal)}
            </span>
          </div>

          {appliedVoucher && (
            <div className="flex justify-between items-center text-street-red">
              <span className="text-sm font-bold uppercase">
                Discount ({appliedVoucher.diskon_persen}%)
              </span>
              <span className="text-base font-bold">
                -{formatRupiah(discountAmount)}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-dashed border-gray-300">
            <span className="text-lg font-black uppercase text-black">
              Total
            </span>
            <span className="text-2xl font-black text-black">
              {formatRupiah(finalTotal)}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 px-6 font-black uppercase tracking-widest hover:bg-street-red transition-colors duration-200 flex items-center justify-center gap-2 group mt-4"
          >
            <span>Order via WhatsApp</span>
            <MessageCircle
              size={18}
              className="group-hover:rotate-12 transition-transform"
            />
          </button>
          <p className="text-[10px] text-gray-400 text-center mt-3">
            You will be redirected to WhatsApp to complete your order.
          </p>
        </div>
      </form>

      {/* Komponen Modal Voucher */}
      <VoucherListModal
        vouchers={vouchersData}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectVoucher={handleSelectVoucher}
      />
    </div>
  );
};

export default CheckoutForm;
