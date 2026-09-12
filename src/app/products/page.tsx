import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/lib/data";

export default async function ProductsPage({
  searchParams,
}: PageProps<"/products">) {
  const { category } = await searchParams;
  const categorySlug = typeof category === "string" ? category : undefined;

  const filtered = categorySlug
    ? products.filter(
        (p) =>
          p.category.toLowerCase() === categorySlug.toLowerCase() ||
          categories.find((c) => c.slug === categorySlug)?.name === p.category
      )
    : products;

  const activeCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6">
        <span>Início</span>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">
          {activeCategory ? activeCategory.name : "Todos os produtos"}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
            <h3 className="font-semibold text-slate-900 mb-4">Categorias</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/products"
                  className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                    !categorySlug
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <span>Todos</span>
                  <span className="text-xs text-slate-400">{products.length}</span>
                </a>
              </li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`/products?category=${cat.slug}`}
                    className={`flex items-center justify-between py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      categorySlug === cat.slug
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-xs text-slate-400">{cat.count}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="border-t border-slate-100 mt-6 pt-6">
              <h3 className="font-semibold text-slate-900 mb-4">Faixa de Preço</h3>
              <div className="space-y-2">
                {["Até R$ 100", "R$ 100–500", "R$ 500–2.000", "Acima de R$ 2.000"].map((range) => (
                  <label key={range} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" className="rounded accent-indigo-600" />
                    {range}
                  </label>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 mt-6 pt-6">
              <h3 className="font-semibold text-slate-900 mb-4">Avaliação</h3>
              <div className="space-y-2">
                {[5, 4, 3].map((stars) => (
                  <label key={stars} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                    <input type="checkbox" className="rounded accent-indigo-600" />
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <svg key={s} className={`w-3.5 h-3.5 ${s <= stars ? "text-amber-400" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span>ou mais</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Products grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate-500">
              <span className="font-semibold text-slate-900">{filtered.length}</span> produtos encontrados
            </p>
            <select className="text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-400">
              <option>Mais relevantes</option>
              <option>Menor preço</option>
              <option>Maior preço</option>
              <option>Melhor avaliado</option>
              <option>Mais vendidos</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Nenhum produto encontrado</h3>
              <p className="text-slate-500">Tente outra categoria ou remova os filtros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
