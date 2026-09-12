"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/data";
import { useCartStore } from "@/lib/cartStore";

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();

  return (
    <>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-4 py-3 text-slate-600 hover:bg-slate-50 font-bold text-lg"
          >
            −
          </button>
          <span className="px-6 py-3 font-semibold text-slate-900 border-x border-slate-200">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className="px-4 py-3 text-slate-600 hover:bg-slate-50 font-bold text-lg"
          >
            +
          </button>
        </div>
        <button
          onClick={() => { addItem(product, quantity); router.push("/cart"); }}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl text-center transition-colors"
        >
          Adicionar ao Carrinho
        </button>
      </div>

      <button
        onClick={() => { addItem(product, quantity); router.push("/checkout"); }}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl text-center transition-colors block mb-6"
      >
        Comprar Agora
      </button>
    </>
  );
}
