"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { useAdminStore, type Promotion } from "@/lib/adminStore";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const { validateCoupon, incrementCouponUse } = useAdminStore();

  const [couponInput, setCouponInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<Promotion | null>(null);
  const [couponError, setCouponError] = useState("");

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = subtotal >= 200 ? 0 : 29.9;

  const discount = appliedPromo
    ? appliedPromo.type === "percentage"
      ? subtotal * (appliedPromo.value / 100)
      : appliedPromo.value
    : 0;

  const total = subtotal + shipping - discount;

  const applyCoupon = () => {
    if (!couponInput.trim()) return;
    const promo = validateCoupon(couponInput, subtotal);
    if (!promo) {
      setCouponError("Cupom inválido ou não aplicável para este pedido.");
      setAppliedPromo(null);
      return;
    }
    setAppliedPromo(promo);
    setCouponError("");
    incrementCouponUse(promo.id);
  };

  const removeCoupon = () => {
    setAppliedPromo(null);
    setCouponInput("");
    setCouponError("");
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-indigo-600">Início</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Carrinho</span>
        </nav>

        <h1 className="text-3xl font-bold text-slate-900 mb-8">Meu Carrinho</h1>

        {items.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Seu carrinho está vazio</h3>
            <p className="text-slate-500 mb-6">Adicione produtos para continuar comprando.</p>
            <Link href="/products" className="bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-indigo-700 transition-colors">
              Explorar produtos
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex gap-4">
                  <div className="relative w-24 h-24 bg-slate-50 rounded-xl overflow-hidden shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="text-xs text-indigo-600 font-medium">{product.category}</p>
                        <h3 className="font-semibold text-slate-900 text-sm leading-snug mt-0.5">{product.name}</h3>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors shrink-0"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="px-3 py-1.5 text-slate-600 hover:bg-slate-50 font-bold"
                        >
                          −
                        </button>
                        <span className="px-4 py-1.5 font-semibold text-slate-900 border-x border-slate-200 text-sm">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="px-3 py-1.5 text-slate-600 hover:bg-slate-50 font-bold"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">
                          {(product.price * quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                        {product.originalPrice && (
                          <p className="text-xs text-slate-400 line-through">
                            {(product.originalPrice * quantity).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Coupon */}
              <div className="bg-white rounded-2xl border border-slate-200 p-5">
                <h3 className="font-semibold text-slate-900 mb-3">Cupom de desconto</h3>
                {appliedPromo ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                    <div>
                      <span className="font-mono font-bold text-emerald-700 text-sm">{appliedPromo.code}</span>
                      <span className="text-xs text-emerald-600 ml-2">
                        -{appliedPromo.type === "percentage" ? `${appliedPromo.value}%` : appliedPromo.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </span>
                    </div>
                    <button onClick={removeCoupon} className="text-xs text-slate-500 hover:text-red-500 transition-colors">Remover</button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                        placeholder="Digite seu cupom"
                        className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 font-mono uppercase"
                      />
                      <button onClick={applyCoupon} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors">
                        Aplicar
                      </button>
                    </div>
                    {couponError && <p className="text-xs text-red-500 mt-2">{couponError}</p>}
                  </>
                )}
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
                <h2 className="font-bold text-slate-900 text-lg mb-6">Resumo do pedido</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} itens)</span>
                    <span className="font-medium text-slate-900">
                      {subtotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-emerald-600">
                      <span>Desconto ({appliedPromo?.code})</span>
                      <span className="font-medium">-{discount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Frete</span>
                    <span className={`font-medium ${shipping === 0 ? "text-emerald-600" : "text-slate-900"}`}>
                      {shipping === 0 ? "Grátis" : shipping.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2">
                      Parabéns! Você ganhou frete grátis.
                    </p>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-900">Total</span>
                    <div className="text-right">
                      <p className="font-bold text-2xl text-slate-900">
                        {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                      <p className="text-xs text-slate-500">
                        ou 12x de {(total / 12).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                      </p>
                    </div>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl text-center block transition-colors"
                >
                  Finalizar compra
                </Link>

                <div className="flex items-center justify-center gap-2 mt-4">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-xs text-slate-400">Pagamento 100% seguro</span>
                </div>

                <div className="flex justify-center gap-2 mt-3">
                  {["Visa", "MC", "Pix", "Boleto"].map((method) => (
                    <span key={method} className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded font-medium">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
