"use client";

import { useState } from "react";
import { useAdminStore, type Promotion } from "@/lib/adminStore";

const emptyForm = {
  code: "",
  type: "percentage" as Promotion["type"],
  value: "",
  minOrder: "",
  maxUses: "",
  expiresAt: "",
};

export default function AdminPromotionsPage() {
  const { promotions, addPromotion, togglePromotion, deletePromotion } = useAdminStore();
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof emptyForm, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code || !form.value) {
      setError("Código e valor são obrigatórios.");
      return;
    }
    if (promotions.some((p) => p.code.toUpperCase() === form.code.toUpperCase())) {
      setError("Já existe um cupom com esse código.");
      return;
    }
    addPromotion({
      code: form.code.toUpperCase(),
      type: form.type,
      value: parseFloat(form.value),
      minOrder: form.minOrder ? parseFloat(form.minOrder) : 0,
      maxUses: form.maxUses ? parseInt(form.maxUses) : undefined,
      expiresAt: form.expiresAt || undefined,
      active: true,
    });
    setForm(emptyForm);
    setError("");
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Promoções</h1>
          <p className="text-slate-500 text-sm mt-1">{promotions.length} cupons cadastrados</p>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nova promoção
        </button>
      </div>

      {/* New promo form */}
      {showForm && (
        <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 space-y-4">
          <h2 className="font-semibold text-slate-900">Criar cupom de desconto</h2>

          {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-2.5 rounded-xl">{error}</p>}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Código <span className="text-red-500">*</span>
              </label>
              <input
                value={form.code}
                onChange={(e) => set("code", e.target.value.toUpperCase())}
                placeholder="EX: PROMO20"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Tipo</label>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value as Promotion["type"])}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400"
              >
                <option value="percentage">Porcentagem (%)</option>
                <option value="fixed">Valor fixo (R$)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Valor <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={form.value}
                onChange={(e) => set("value", e.target.value)}
                placeholder={form.type === "percentage" ? "10" : "50"}
                min="0"
                step="0.01"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Pedido mínimo (R$)</label>
              <input
                type="number"
                value={form.minOrder}
                onChange={(e) => set("minOrder", e.target.value)}
                placeholder="0"
                min="0"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Máximo de usos</label>
              <input
                type="number"
                value={form.maxUses}
                onChange={(e) => set("maxUses", e.target.value)}
                placeholder="Ilimitado"
                min="1"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Expira em</label>
              <input
                type="date"
                value={form.expiresAt}
                onChange={(e) => set("expiresAt", e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">
              Criar cupom
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-slate-600 text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-slate-100 transition-colors">
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Promotions table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100">
            <tr className="text-left">
              <th className="px-6 py-4 font-semibold text-slate-500">Código</th>
              <th className="px-4 py-4 font-semibold text-slate-500">Desconto</th>
              <th className="px-4 py-4 font-semibold text-slate-500">Mínimo</th>
              <th className="px-4 py-4 font-semibold text-slate-500">Usos</th>
              <th className="px-4 py-4 font-semibold text-slate-500">Expira</th>
              <th className="px-4 py-4 font-semibold text-slate-500">Status</th>
              <th className="px-4 py-4" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {promotions.map((promo) => (
              <tr key={promo.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                    {promo.code}
                  </span>
                </td>
                <td className="px-4 py-4 font-semibold text-slate-900">
                  {promo.type === "percentage"
                    ? `${promo.value}%`
                    : promo.value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </td>
                <td className="px-4 py-4 text-slate-600">
                  {promo.minOrder > 0
                    ? promo.minOrder.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                    : "—"}
                </td>
                <td className="px-4 py-4 text-slate-600">
                  {promo.uses}{promo.maxUses ? ` / ${promo.maxUses}` : ""}
                </td>
                <td className="px-4 py-4 text-slate-600">
                  {promo.expiresAt
                    ? new Date(promo.expiresAt).toLocaleDateString("pt-BR")
                    : "Sem limite"}
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => togglePromotion(promo.id)}
                    className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                      promo.active
                        ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {promo.active ? "Ativo" : "Inativo"}
                  </button>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => deletePromotion(promo.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
