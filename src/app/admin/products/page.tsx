"use client";

import Image from "next/image";
import Link from "next/link";
import { useAdminStore } from "@/lib/adminStore";
import { products as staticProducts } from "@/lib/data";

export default function AdminProductsPage() {
  const { customProducts, deleteProduct } = useAdminStore();
  const allProducts = [...staticProducts, ...customProducts];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Produtos</h1>
          <p className="text-slate-500 text-sm mt-1">{allProducts.length} produtos no catálogo</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo produto
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100">
            <tr className="text-left">
              <th className="px-6 py-4 font-semibold text-slate-500 font-medium">Produto</th>
              <th className="px-4 py-4 font-semibold text-slate-500 font-medium">Categoria</th>
              <th className="px-4 py-4 font-semibold text-slate-500 font-medium">Preço</th>
              <th className="px-4 py-4 font-semibold text-slate-500 font-medium">Estoque</th>
              <th className="px-4 py-4 font-semibold text-slate-500 font-medium">Origem</th>
              <th className="px-4 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {allProducts.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <span className="font-medium text-slate-900 line-clamp-1">{product.name}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-slate-600">{product.category}</td>
                <td className="px-4 py-4 font-semibold text-slate-900">
                  {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    product.stock > 10
                      ? "bg-emerald-100 text-emerald-700"
                      : product.stock > 0
                      ? "bg-amber-100 text-amber-700"
                      : "bg-red-100 text-red-700"
                  }`}>
                    {product.stock} un.
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${"isCustom" in product && product.isCustom ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"}`}>
                    {"isCustom" in product && product.isCustom ? "Admin" : "Catálogo"}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    {"isCustom" in product && product.isCustom ? (
                      <>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="text-xs text-slate-600 hover:text-indigo-600 font-medium px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-xs text-red-500 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Remover
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400 px-3 py-1.5">Somente leitura</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
