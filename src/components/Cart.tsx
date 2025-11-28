import React from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import type { CartItem as CartItemType } from "../types";
import CartItem from "./CartItem";
import CheckoutForm from "./CheckoutForm";

interface CartProps {
  cartItems: CartItemType[];
  onUpdateQty: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onBackToHome: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  onUpdateQty,
  onRemove,
  onBackToHome,
}) => {
  // Calculate Subtotal
  const subtotal = cartItems.reduce((total, item) => {
    const price =
      item.harga_normal - (item.harga_normal * item.diskon_persen) / 100;
    return total + price * item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <ShoppingBag size={64} className="text-gray-200 mb-6" />
        <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-gray-500 mb-8 max-w-md">
          Looks like you haven't added any gear to your stash yet.
        </p>
        <button
          onClick={onBackToHome}
          className="bg-black text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-street-red transition-colors"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <button
        onClick={onBackToHome}
        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Shop
      </button>

      <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic mb-8">
        Your Stash{" "}
        <span className="text-street-red text-2xl md:text-3xl align-top not-italic font-mono bg-black/5 px-2 py-1 rounded-none ml-2">
          ({cartItems.length})
        </span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Left Col: Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white border-t-2 border-black">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQty={onUpdateQty}
                onRemove={onRemove}
              />
            ))}
          </div>
        </div>

        {/* Right Col: Checkout */}
        <div className="lg:col-span-1">
          <CheckoutForm cartItems={cartItems} subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
