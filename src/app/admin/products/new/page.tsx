"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminStore } from "@/lib/adminStore";
import { categories } from "@/lib/data";
import ImagePicker from "@/components/ImagePicker";

const empty = {
  name: "",
  slug: "",
  price: "",
  originalPrice: "",
  image: "",
  category: "Eletrônicos",
  description: "",
  features: "",
  stock: "",
  badge: "",
  rating: "5",
  reviews: "0",
};

export default function NewProductPage() {
  const router = useRouter();
  const addProduct = useAdminStore((s) => s.addProduct);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");

  const set = (k: keyof typeof empty, v: string) =>
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === "name" && !f.slug) {
        next.slug = v
          .toLowerCase()
          .normalize("NFD")
          .replace(/[̀-ͯ]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      }
      return next;
    });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image || !form.stock) {
      setError("Preencha os campos obrigatórios.");
      return;
    }
    addProduct({
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/\s+/g, "-"),
      price: parseFloat(form.price),
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
      image: form.image,
      category: form.category,
      description: form.description,
      features: form.features.split("\n").filter(Boolean),
      stock: parseInt(form.stock),
      badge: form.badge || undefined,
      rating: parseFloat(form.rating),
      reviews: parseInt(form.reviews),
    });
    router.push("/admin/products");
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/products" className="text-slate-400 hover:text-slate-700 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Novo produto</h1>
      </div>

      <form onSubmit={submit} className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic info */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h2 className="font-semibold text-slate-900">Informações básicas</h2>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Nome <span className="text-red-500">*</span>
              </label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Ex: iPhone 16 Pro"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Slug (URL)</label>
              <input
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="iphone-16-pro"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Descrição</label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                placeholder="Descrição do produto..."
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Características (uma por linha)
              </label>
              <textarea
                value={form.features}
                onChange={(e) => set("features", e.target.value)}
                rows={4}
                placeholder={"Chip A18 Pro\nCâmera 48MP\nTela OLED 6.3\""}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 resize-none font-mono"
              />
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h2 className="font-semibold text-slate-900">Imagem</h2>
            <ImagePicker value={form.image} onChange={(url) => set("image", url)} />
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h2 className="font-semibold text-slate-900">Preço e estoque</h2>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Preço (R$) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                placeholder="0,00"
                min="0"
                step="0.01"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Preço original (R$)
              </label>
              <input
                type="number"
                value={form.originalPrice}
                onChange={(e) => set("originalPrice", e.target.value)}
                placeholder="0,00 (opcional)"
                min="0"
                step="0.01"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Estoque <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => set("stock", e.target.value)}
                placeholder="0"
                min="0"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h2 className="font-semibold text-slate-900">Categoria e badge</h2>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Categoria</label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Badge</label>
              <select
                value={form.badge}
                onChange={(e) => set("badge", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400"
              >
                <option value="">Nenhum</option>
                <option value="Novo">Novo</option>
                <option value="Oferta">Oferta</option>
                <option value="Mais Vendido">Mais Vendido</option>
                <option value="Top Avaliado">Top Avaliado</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
          >
            Criar produto
          </button>
        </div>
      </form>
    </div>
  );
}
