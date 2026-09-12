import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./data";

export type AdminProduct = Product & { isCustom?: boolean };

export type Promotion = {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minOrder: number;
  active: boolean;
  uses: number;
  maxUses?: number;
  expiresAt?: string;
};

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

export type Order = {
  id: string;
  items: { productId: number; productName: string; price: number; quantity: number; image: string }[];
  customer: { name: string; email: string; phone: string; address: string };
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  coupon?: string;
  status: OrderStatus;
  createdAt: string;
};

type AdminStore = {
  customProducts: AdminProduct[];
  promotions: Promotion[];
  orders: Order[];

  addProduct: (p: Omit<AdminProduct, "id" | "isCustom">) => void;
  updateProduct: (id: number, data: Partial<AdminProduct>) => void;
  deleteProduct: (id: number) => void;

  addPromotion: (p: Omit<Promotion, "id" | "uses">) => void;
  togglePromotion: (id: string) => void;
  deletePromotion: (id: string) => void;
  validateCoupon: (code: string, subtotal: number) => Promotion | null;
  incrementCouponUse: (id: string) => void;

  addOrder: (o: Omit<Order, "id" | "createdAt">) => string;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
};

export const useAdminStore = create<AdminStore>()(
  persist(
    (set, get) => ({
      customProducts: [],
      promotions: [
        {
          id: "promo-1",
          code: "BEMVINDO10",
          type: "percentage",
          value: 10,
          minOrder: 0,
          active: true,
          uses: 0,
          maxUses: 100,
        },
        {
          id: "promo-2",
          code: "FRETE50",
          type: "fixed",
          value: 50,
          minOrder: 300,
          active: true,
          uses: 3,
        },
      ],
      orders: [],

      addProduct: (p) =>
        set((s) => ({
          customProducts: [
            ...s.customProducts,
            { ...p, id: Date.now(), isCustom: true },
          ],
        })),

      updateProduct: (id, data) =>
        set((s) => ({
          customProducts: s.customProducts.map((p) =>
            p.id === id ? { ...p, ...data } : p
          ),
        })),

      deleteProduct: (id) =>
        set((s) => ({
          customProducts: s.customProducts.filter((p) => p.id !== id),
        })),

      addPromotion: (p) =>
        set((s) => ({
          promotions: [...s.promotions, { ...p, id: `promo-${Date.now()}`, uses: 0 }],
        })),

      togglePromotion: (id) =>
        set((s) => ({
          promotions: s.promotions.map((p) =>
            p.id === id ? { ...p, active: !p.active } : p
          ),
        })),

      deletePromotion: (id) =>
        set((s) => ({ promotions: s.promotions.filter((p) => p.id !== id) })),

      validateCoupon: (code, subtotal) => {
        const promo = get().promotions.find(
          (p) => p.code.toUpperCase() === code.toUpperCase() && p.active
        );
        if (!promo) return null;
        if (promo.minOrder > subtotal) return null;
        if (promo.maxUses !== undefined && promo.uses >= promo.maxUses) return null;
        if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) return null;
        return promo;
      },

      incrementCouponUse: (id) =>
        set((s) => ({
          promotions: s.promotions.map((p) =>
            p.id === id ? { ...p, uses: p.uses + 1 } : p
          ),
        })),

      addOrder: (o) => {
        const id = `ORD-${Date.now()}`;
        set((s) => ({
          orders: [
            { ...o, id, createdAt: new Date().toISOString() },
            ...s.orders,
          ],
        }));
        return id;
      },

      updateOrderStatus: (id, status) =>
        set((s) => ({
          orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)),
        })),
    }),
    { name: "admin" }
  )
);
