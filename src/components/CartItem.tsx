import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "../types";
import { formatRupiah } from "../utils/format";

interface CartItemProps {
  item: CartItemType;
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQty, onRemove }) => {
  const discountAmount = (item.harga_normal * item.diskon_persen) / 100;
  const finalPrice = item.harga_normal - discountAmount;
  // const imageUrl = `https://picsum.photos/seed/${item.id}/200/200`;

  return (
    <div className="flex flex-col sm:flex-row gap-4 border-b border-gray-200 py-6 last:border-b-0">
      {/* Image */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 bg-gray-100 overflow-hidden border border-gray-200">
        <img
          src={item.gambar}
          alt={item.nama}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h4 className="font-black text-lg uppercase tracking-tight text-black">
            {item.nama}
          </h4>
          <p className="text-xs text-gray-500 font-mono mt-1">
            ID: {item.id.toString().padStart(4, "0")}
          </p>
          <div className="mt-2 text-street-red font-bold">
            {formatRupiah(finalPrice)}{" "}
            <span className="text-gray-400 text-xs line-through font-normal ml-2">
              {formatRupiah(item.harga_normal)}
            </span>
          </div>
        </div>
      </div>

      {/* Actions (Qty & Remove) */}
      <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end gap-4 mt-4 sm:mt-0">
        <div className="flex items-center border-2 border-black">
          <button
            onClick={() => onUpdateQty(item.id, -1)}
            disabled={item.quantity <= 1}
            className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors disabled:opacity-30"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center font-bold text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdateQty(item.id, 1)}
            className="w-8 h-8 flex items-center justify-center hover:bg-black hover:text-white transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>

        <button
          onClick={() => onRemove(item.id)}
          className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-street-red flex items-center gap-1 transition-colors"
        >
          <Trash2 size={14} /> Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
