import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Banner from "./components/Banner";
import ProductGrid from "./components/ProductGrid";
import type { Product } from "./types";
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
  const [cartCount, setCartCount] = useState<number>(0);

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

  const handleAddToCart = (product: Product) => {
    setCartCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header cartCount={cartCount} />

      <main className="flex-grow">
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
      </main>

      <footer className="bg-street-black text-white py-16 border-t border-neutral-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-4">
                Gudang<span className="text-street-red">Diskon</span>
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium streetwear clearance outlet. Authenticity guaranteed.
                Defining the culture since 2024.
              </p>
            </div>
            <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Legal
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-neutral-800 text-center md:text-left">
            <p className="text-xs text-neutral-600 font-mono uppercase">
              &copy; {new Date().getFullYear()} Gudang Diskon Store. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
