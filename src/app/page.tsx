import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import { featuredProducts, categories } from "@/lib/data";

export default function HomePage() {
  const trending = featuredProducts.slice(0, 4);
  const newArrivals = featuredProducts.slice(4, 8);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-500 rounded-full opacity-20 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 rounded-full opacity-20 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-indigo-500/30 text-indigo-200 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                ✨ Novidades da temporada
              </span>
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Descubra os melhores{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">
                  produtos
                </span>{" "}
                para você
              </h1>
              <p className="text-lg text-indigo-200 mb-8 leading-relaxed">
                Eletrônicos, moda, acessórios e muito mais. Entrega rápida em todo o Brasil e as melhores ofertas todos os dias.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="bg-white text-indigo-900 font-semibold px-8 py-3.5 rounded-full hover:bg-indigo-50 transition-colors shadow-lg"
                >
                  Explorar produtos
                </Link>
                <Link
                  href="/products?category=eletronicos"
                  className="border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-colors"
                >
                  Ver ofertas
                </Link>
              </div>
              <div className="flex gap-8 mt-12">
                {[["50k+", "Produtos"], ["4.9★", "Avaliação"], ["2h", "Entrega"]].map(([value, label]) => (
                  <div key={label}>
                    <p className="text-2xl font-bold text-white">{value}</p>
                    <p className="text-sm text-indigo-300">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {featuredProducts.slice(0, 4).map((product, i) => (
                <div
                  key={product.id}
                  className={`relative aspect-square rounded-2xl overflow-hidden shadow-2xl ${i === 1 ? "mt-8" : ""} ${i === 3 ? "-mt-8" : ""}`}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-xs font-semibold truncate">{product.name}</p>
                    <p className="text-indigo-300 text-xs">
                      {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Promotional banners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">🚀</div>
            <div>
              <p className="font-bold">Frete Grátis</p>
              <p className="text-sm text-orange-100">Acima de R$ 200</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">🔄</div>
            <div>
              <p className="font-bold">Devolução Fácil</p>
              <p className="text-sm text-emerald-100">30 dias garantidos</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-6 text-white flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">💳</div>
            <div>
              <p className="font-bold">Parcelamento</p>
              <p className="text-sm text-purple-100">Até 12x sem juros</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Categorias</h2>
            <p className="text-slate-500 text-sm mt-1">Explore nossa seleção completa</p>
          </div>
          <Link href="/products" className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
            Ver todas →
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative aspect-video rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
              <div className="absolute bottom-4 left-4">
                <p className="text-white font-bold">{category.name}</p>
                <p className="text-white/70 text-sm">{category.count} produtos</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending products */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Mais Vendidos</h2>
              <p className="text-slate-500 text-sm mt-1">Os produtos favoritos dos nossos clientes</p>
            </div>
            <Link href="/products" className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {trending.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Big promo banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-slate-900 to-indigo-900 rounded-3xl overflow-hidden">
          <div className="px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <span className="text-indigo-300 text-sm font-medium">Oferta especial</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">
                Até 40% OFF em{" "}
                <span className="text-indigo-400">Eletrônicos</span>
              </h2>
              <p className="text-slate-400 mb-6">Aproveite os melhores preços em smartphones, notebooks, fones de ouvido e muito mais.</p>
              <Link
                href="/products?category=eletronicos"
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-full transition-colors inline-block"
              >
                Aproveitar oferta
              </Link>
            </div>
            <div className="relative w-64 h-64 hidden md:block">
              <Image
                src={featuredProducts[1].image}
                alt="MacBook Pro"
                fill
                className="object-cover rounded-2xl"
                sizes="256px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Novidades</h2>
              <p className="text-slate-500 text-sm mt-1">Os produtos mais recentes da nossa loja</p>
            </div>
            <Link href="/products" className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brands / trust */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-center text-sm font-medium text-slate-400 mb-8 uppercase tracking-widest">Marcas parceiras</p>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-40">
          {["Apple", "Samsung", "Nike", "Sony", "Levi's", "Ray-Ban"].map((brand) => (
            <span key={brand} className="text-2xl font-bold text-slate-700">{brand}</span>
          ))}
        </div>
      </section>
    </div>
  );
}
