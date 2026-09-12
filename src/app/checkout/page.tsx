"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/cartStore";
import { useAdminStore } from "@/lib/adminStore";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const { addOrder } = useAdminStore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "SP",
  });

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal >= 200 ? 0 : 29.9;
  const total = subtotal + shipping;

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    const id = addOrder({
      items: items.map((i) => ({
        productId: i.product.id,
        productName: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
      })),
      customer: {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone,
        address: `${form.address}, ${form.city} - ${form.state}`,
      },
      subtotal,
      shipping,
      discount: 0,
      total,
      status: "pending",
    });

    clearCart();
    router.push(`/checkout/success?order=${id}`);
  };

  if (items.length === 0) {
    return (
      <div className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Seu carrinho está vazio.</p>
          <Link href="/products" className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl">
            Explorar produtos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-bold text-xl text-slate-900">ShopNow</span>
          </Link>
          <div className="hidden md:flex items-center gap-2 text-sm">
            {["Carrinho", "Entrega", "Pagamento", "Confirmação"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                {i > 0 && <div className="w-8 h-px bg-slate-200" />}
                <div className={`flex items-center gap-1.5 ${i === 1 ? "text-indigo-600 font-semibold" : i < 1 ? "text-emerald-600" : "text-slate-400"}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${i < 1 ? "bg-emerald-100 text-emerald-600" : i === 1 ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                    {i < 1 ? "✓" : i + 1}
                  </div>
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit}>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery info */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="font-bold text-slate-900 text-lg mb-6">Informações de entrega</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome</label>
                    <input required value={form.firstName} onChange={(e) => set("firstName", e.target.value)} placeholder="João" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Sobrenome</label>
                    <input required value={form.lastName} onChange={(e) => set("lastName", e.target.value)} placeholder="Silva" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">E-mail</label>
                    <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="joao@email.com" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Telefone</label>
                    <input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="(11) 99999-9999" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Endereço</label>
                    <input required value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Rua, número, bairro" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Cidade</label>
                    <input required value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="São Paulo" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Estado</label>
                    <select value={form.state} onChange={(e) => set("state", e.target.value)} className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400">
                      {["SP","RJ","MG","RS","PR","SC","BA","CE","PE","GO"].map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Shipping */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="font-bold text-slate-900 text-lg mb-4">Método de entrega</h2>
                <div className="space-y-3">
                  {[
                    { label: "Padrão", desc: "5-7 dias úteis", price: "Grátis", selected: true },
                    { label: "Expresso", desc: "2-3 dias úteis", price: "R$ 19,90", selected: false },
                    { label: "Ultra-rápido", desc: "Entrega em até 24h", price: "R$ 49,90", selected: false },
                  ].map(({ label, desc, price, selected }) => (
                    <label key={label} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${selected ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:border-indigo-200"}`}>
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" defaultChecked={selected} className="accent-indigo-600" />
                        <div>
                          <p className="font-medium text-slate-900 text-sm">{label}</p>
                          <p className="text-xs text-slate-500">{desc}</p>
                        </div>
                      </div>
                      <span className={`font-semibold text-sm ${price === "Grátis" ? "text-emerald-600" : "text-slate-900"}`}>{price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="font-bold text-slate-900 text-lg mb-6">Pagamento</h2>
                <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-xl">
                  {["Cartão de Crédito", "Pix", "Boleto"].map((tab, i) => (
                    <button key={tab} type="button" className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${i === 0 ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
                      {tab}
                    </button>
                  ))}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Número do cartão</label>
                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome no cartão</label>
                    <input type="text" placeholder="JOÃO SILVA" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Validade</label>
                      <input type="text" placeholder="MM/AA" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">CVV</label>
                      <input type="text" placeholder="123" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
                <h2 className="font-bold text-slate-900 text-lg mb-4">Seu pedido</h2>
                <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-3">
                      <div className="relative w-14 h-14 bg-slate-50 rounded-lg overflow-hidden shrink-0">
                        <Image src={product.image} alt={product.name} fill className="object-cover" sizes="56px" />
                        <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                          {quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                        <p className="text-sm font-bold text-slate-700">
                          {(product.price * quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium">{subtotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Frete</span>
                    <span className={`font-medium ${shipping === 0 ? "text-emerald-600" : ""}`}>
                      {shipping === 0 ? "Grátis" : shipping.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-100">
                    <span>Total</span>
                    <span className="text-lg">{total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Confirmar pedido
                </button>
                <p className="text-xs text-slate-400 text-center mt-3">Dados protegidos com criptografia SSL</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
