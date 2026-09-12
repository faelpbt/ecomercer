import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/data";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage(props: PageProps<"/products/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-indigo-600">Início</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-indigo-600">Produtos</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category.toLowerCase()}`} className="hover:text-indigo-600">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-medium truncate">{product.name}</span>
        </nav>

        {/* Product detail */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.badge && (
                <span className={`absolute top-4 left-4 text-sm font-bold px-3 py-1.5 rounded-full ${
                  product.badge === "Oferta" ? "bg-red-500 text-white" :
                  product.badge === "Novo" ? "bg-emerald-500 text-white" :
                  product.badge === "Top Avaliado" ? "bg-amber-500 text-white" :
                  "bg-indigo-600 text-white"
                }`}>
                  {product.badge}
                </span>
              )}
            </div>
            {/* Thumbnail strip */}
            <div className="flex gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-indigo-200 bg-slate-50 cursor-pointer">
                  <Image
                    src={product.image}
                    alt={`${product.name} ${i}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="text-indigo-600 text-sm font-medium mb-2">{product.category}</p>
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className={`w-5 h-5 ${star <= Math.round(product.rating) ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-slate-900 font-semibold">{product.rating}</span>
              <span className="text-slate-500 text-sm">({product.reviews.toLocaleString("pt-BR")} avaliações)</span>
            </div>

            {/* Price */}
            <div className="bg-slate-50 rounded-2xl p-6 mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-slate-900">
                  {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-slate-400 line-through">
                    {product.originalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                )}
                {discount && (
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-1 rounded-full">
                    -{discount}%
                  </span>
                )}
              </div>
              <p className="text-emerald-600 text-sm mt-2">
                Em até 12x de{" "}
                <strong>{(product.price / 12).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</strong>{" "}
                sem juros no cartão
              </p>
              <p className="text-slate-500 text-sm mt-1">
                {(product.price * 0.9).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} no Pix (10% de desconto)
              </p>
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? "bg-emerald-500" : product.stock > 0 ? "bg-amber-500" : "bg-red-500"}`} />
              <span className="text-sm text-slate-600">
                {product.stock > 10 ? "Em estoque" : product.stock > 0 ? `Apenas ${product.stock} unidades` : "Esgotado"}
              </span>
            </div>

            {/* Quantity + CTA */}
            <AddToCartButton product={product} />

            {/* Features */}
            <div className="border-t border-slate-100 pt-6">
              <h3 className="font-semibold text-slate-900 mb-3">Características</h3>
              <ul className="grid grid-cols-2 gap-2">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                    <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping info */}
            <div className="border-t border-slate-100 mt-6 pt-6 grid grid-cols-3 gap-4">
              {[
                { icon: "🚚", title: "Entrega grátis", desc: "Acima de R$ 200" },
                { icon: "🔄", title: "Devoluções", desc: "30 dias grátis" },
                { icon: "🔒", title: "Pagamento", desc: "100% seguro" },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="text-center">
                  <div className="text-2xl mb-1">{icon}</div>
                  <p className="text-xs font-semibold text-slate-900">{title}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="border-t border-slate-100 pt-12 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Sobre o produto</h2>
          <p className="text-slate-600 leading-relaxed max-w-3xl">{product.description}</p>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="border-t border-slate-100 pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Produtos relacionados</h2>
              <Link href={`/products?category=${product.category}`} className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
