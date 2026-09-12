import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-xl text-white">ShopNow</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Seu destino de compras online com os melhores produtos e preços. Qualidade garantida e entrega rápida em todo o Brasil.
            </p>
            <div className="flex gap-3">
              {["instagram", "facebook", "twitter"].map((social) => (
                <a key={social} href="#" className="w-9 h-9 bg-slate-800 hover:bg-indigo-600 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-xs font-bold text-white uppercase">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Categorias</h3>
            <ul className="space-y-3">
              {["Eletrônicos", "Roupas", "Acessórios", "Casa & Decoração", "Esportes"].map((item) => (
                <li key={item}>
                  <Link href="/products" className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Ajuda</h3>
            <ul className="space-y-3">
              {["Central de Ajuda", "Como Comprar", "Rastrear Pedido", "Trocas e Devoluções", "Fale Conosco"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-sm text-slate-400 mb-4">Receba ofertas exclusivas e novidades direto no seu e-mail.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="seu@email.com"
                className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 transition-colors"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors">
                Inscrever-se
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">© 2026 ShopNow. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            {["Privacidade", "Termos de Uso", "Cookies"].map((item) => (
              <a key={item} href="#" className="text-sm text-slate-500 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
