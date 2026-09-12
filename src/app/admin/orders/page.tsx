"use client";

import { useState } from "react";
import { useAdminStore, type OrderStatus } from "@/lib/adminStore";

const statusLabel: Record<OrderStatus, string> = {
  pending: "Aguardando",
  processing: "Processando",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
};

const statusColor: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-indigo-100 text-indigo-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusFlow: Record<OrderStatus, OrderStatus | null> = {
  pending: "processing",
  processing: "shipped",
  shipped: "delivered",
  delivered: null,
  cancelled: null,
};

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useAdminStore();
  const [filter, setFilter] = useState<OrderStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Pedidos</h1>
        <p className="text-slate-500 text-sm mt-1">{orders.length} pedidos no total</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(["all", "pending", "processing", "shipped", "delivered", "cancelled"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-sm font-medium px-4 py-2 rounded-xl transition-colors ${
              filter === s
                ? "bg-indigo-600 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:border-indigo-300"
            }`}
          >
            {s === "all" ? "Todos" : statusLabel[s]}
            {s !== "all" && (
              <span className="ml-1.5 text-xs opacity-70">
                ({orders.filter((o) => o.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 text-center py-16 text-slate-400 text-sm">
          Nenhum pedido encontrado
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order) => {
            const next = statusFlow[order.status];
            const isOpen = expanded === order.id;

            return (
              <div key={order.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                {/* Header */}
                <button
                  onClick={() => setExpanded(isOpen ? null : order.id)}
                  className="w-full flex items-center justify-between px-6 py-4 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-slate-900 text-sm">{order.id}</span>
                    <span className="text-sm text-slate-600">{order.customer.name}</span>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor[order.status]}`}>
                      {statusLabel[order.status]}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-500">
                      {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                    <span className="font-bold text-slate-900">
                      {order.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </span>
                    <svg
                      className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Detail */}
                {isOpen && (
                  <div className="border-t border-slate-100 px-6 py-5 space-y-5">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Items */}
                      <div>
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Itens</p>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.productId} className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.image} alt={item.productName} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-slate-900 truncate">{item.productName}</p>
                                <p className="text-xs text-slate-500">
                                  {item.quantity}x {item.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Customer + Summary */}
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Cliente</p>
                          <p className="text-sm text-slate-900 font-medium">{order.customer.name}</p>
                          <p className="text-sm text-slate-600">{order.customer.email}</p>
                          <p className="text-sm text-slate-600">{order.customer.phone}</p>
                          <p className="text-sm text-slate-600 mt-1">{order.customer.address}</p>
                        </div>

                        <div>
                          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Resumo</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-600">Subtotal</span>
                              <span>{order.subtotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                            </div>
                            {order.discount > 0 && (
                              <div className="flex justify-between text-emerald-600">
                                <span>Desconto {order.coupon && `(${order.coupon})`}</span>
                                <span>-{order.discount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-slate-600">Frete</span>
                              <span className={order.shipping === 0 ? "text-emerald-600" : ""}>
                                {order.shipping === 0 ? "Grátis" : order.shipping.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                              </span>
                            </div>
                            <div className="flex justify-between font-bold border-t border-slate-100 pt-1 mt-1">
                              <span>Total</span>
                              <span>{order.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                      {next && (
                        <button
                          onClick={() => updateOrderStatus(order.id, next)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                        >
                          Avançar para: {statusLabel[next]}
                        </button>
                      )}
                      {order.status !== "cancelled" && order.status !== "delivered" && (
                        <button
                          onClick={() => updateOrderStatus(order.id, "cancelled")}
                          className="text-sm font-medium text-red-500 hover:text-red-700 px-4 py-2 rounded-xl hover:bg-red-50 transition-colors"
                        >
                          Cancelar pedido
                        </button>
                      )}
                      {next === null && order.status !== "cancelled" && (
                        <span className="text-sm text-slate-400">Pedido finalizado</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
