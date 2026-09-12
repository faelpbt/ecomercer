"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/data";
import { useCartStore } from "@/lib/cartStore";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link href={`/products/${product.slug}`} className="group block bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-indigo-200 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-square bg-slate-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${
            product.badge === "Oferta" ? "bg-red-500 text-white" :
            product.badge === "Novo" ? "bg-emerald-500 text-white" :
            product.badge === "Top Avaliado" ? "bg-amber-500 text-white" :
            "bg-indigo-600 text-white"
          }`}>
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute top-3 right-3 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-indigo-600 font-medium mb-1">{product.category}</p>
        <h3 className="font-semibold text-slate-900 text-sm leading-snug mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-3.5 h-3.5 ${star <= Math.round(product.rating) ? "text-amber-400" : "text-slate-200"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-slate-500">({product.reviews.toLocaleString("pt-BR")})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-slate-900">
            {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">
              {product.originalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          )}
        </div>

        <p className="text-xs text-emerald-600 mt-1">Em até 12x no cartão</p>
      </div>

      {/* Add to cart button */}
      <div className="px-4 pb-4">
        <button
          onClick={(e) => { e.preventDefault(); addItem(product); }}
          className="w-full bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white text-sm font-semibold rounded-xl py-2.5 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Adicionar ao Carrinho
        </button>
      </div>
    </Link>
  );
}
