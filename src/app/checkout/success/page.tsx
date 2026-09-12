"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("order");

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Pedido confirmado!</h1>
        <p className="text-slate-500 mb-1">Obrigado pela sua compra.</p>
        {orderId && (
          <p className="text-sm font-mono bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg inline-block mt-2 mb-6">
            {orderId}
          </p>
        )}

        <p className="text-slate-500 text-sm mb-8">
          Você receberá um e-mail com os detalhes do pedido em breve.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            href="/products"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3.5 rounded-xl transition-colors"
          >
            Continuar comprando
          </Link>
          <Link
            href="/"
            className="text-slate-600 hover:text-slate-900 text-sm font-medium py-2 transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
