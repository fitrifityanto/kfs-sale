import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import ProductGrid from "./components/ProductGrid";
import VoucherBanner from "./components/VoucherBanner";
import Cart from "./components/Cart";
import type { Product, CartItem } from "./types";
import { productsData } from "./data/product.ts";
import "./App.css";

const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData);
    }, 800);
  });
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [view, setView] = useState<"home" | "cart">("home");

  // Load Cart from LocalStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("gudangDiskonCart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
  }, []);

  // Save Cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("gudangDiskonCart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Cart Actions
  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      }),
    );
  };

  const handleRemoveItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const adminPhone = import.meta.env.VITE_ADMIN_PHONE;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header
        cartCount={cartTotalItems}
        onCartClick={() => setView("cart")}
        onHomeClick={() => setView("home")}
      />

      {/* Show Voucher Banner only on Home view */}
      {view === "home" && <VoucherBanner />}

      <main className="flex-grow">
        {view === "home" ? (
          <>
            <Banner />
            <div className="container mx-auto px-4 py-12 md:py-16">
              <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
                <div>
                  <h2 className="text-4xl font-black text-black uppercase tracking-tighter italic">
                    Latest Drops
                  </h2>
                  <p className="text-gray-500 mt-2 font-medium">
                    Official Merchandise. Limited Quantities.
                  </p>
                </div>

                {/* Filter UI - Sharp corners */}
                <div className="flex gap-2">
                  <select className="bg-white border-2 border-black text-black text-sm font-bold uppercase tracking-wide rounded-none focus:ring-0 focus:border-street-red block p-3 min-w-[200px] cursor-pointer hover:bg-black hover:text-white transition-colors">
                    <option>Sort By: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>
              </div>

              <ProductGrid
                products={products}
                isLoading={loading}
                onAddToCart={handleAddToCart}
              />
            </div>
          </>
        ) : (
          <Cart
            cartItems={cart}
            onUpdateQty={handleUpdateQty}
            onRemove={handleRemoveItem}
            onBackToHome={() => setView("home")}
          />
        )}
      </main>

      <footer className="bg-street-black text-white py-16 border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-4">
                kickflip<span className="text-street-red">socks</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Old-school socks clearance. Grab your style before it’s gone..
              </p>
            </div>
            <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-gray-400">
              <a
                href="https://instagram.com/kickflipsocks"
                className="hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href={`https://wa.me/${adminPhone}`}
                className="hover:text-white transition-colors"
              >
                Whatsapp
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-neutral-800 text-center md:text-left">
            <p className="text-xs text-neutral-600 font-mono uppercase">
              &copy; {new Date().getFullYear()} Cuci Gudang kickflipsocks. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
