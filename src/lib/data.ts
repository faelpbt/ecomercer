export type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  description: string;
  features: string[];
  stock: number;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
  count: number;
};

export const categories: Category[] = [
  { id: 1, name: "Eletrônicos", slug: "eletronicos", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop", count: 45 },
  { id: 2, name: "Roupas", slug: "roupas", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop", count: 120 },
  { id: 3, name: "Acessórios", slug: "acessorios", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop", count: 60 },
  { id: 4, name: "Casa & Decoração", slug: "casa", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop", count: 80 },
];

export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    slug: "iphone-15-pro-max",
    price: 8999,
    originalPrice: 9999,
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?w=500&h=500&fit=crop",
    category: "Eletrônicos",
    rating: 4.9,
    reviews: 2341,
    badge: "Mais Vendido",
    description: "O iPhone 15 Pro Max é o smartphone mais avançado da Apple, com chip A17 Pro, câmera de 48MP e tela Super Retina XDR de 6,7 polegadas.",
    features: ["Chip A17 Pro", "Câmera 48MP", "Tela 6,7\" OLED", "5G", "USB-C", "Titanium Design"],
    stock: 15,
  },
  {
    id: 2,
    name: "MacBook Pro 14\"",
    slug: "macbook-pro-14",
    price: 14999,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop",
    category: "Eletrônicos",
    rating: 4.8,
    reviews: 987,
    badge: "Novo",
    description: "MacBook Pro com chip M3 Pro, performance extraordinária para profissionais criativos e desenvolvedores.",
    features: ["Chip Apple M3 Pro", "Tela Liquid Retina XDR", "Até 18h de bateria", "16GB RAM", "512GB SSD", "MagSafe 3"],
    stock: 8,
  },
  {
    id: 3,
    name: "AirPods Pro 2ª Geração",
    slug: "airpods-pro-2",
    price: 1799,
    originalPrice: 2199,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=500&h=500&fit=crop",
    category: "Eletrônicos",
    rating: 4.7,
    reviews: 4521,
    badge: "Oferta",
    description: "AirPods Pro com cancelamento ativo de ruído de próxima geração, áudio adaptativo e transparência adaptativa.",
    features: ["Cancelamento de ruído", "Áudio Espacial", "Até 6h de bateria", "Resistente à água", "Chip H2", "MagSafe"],
    stock: 30,
  },
  {
    id: 4,
    name: "Samsung Galaxy Watch 6",
    slug: "galaxy-watch-6",
    price: 2199,
    originalPrice: 2599,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop",
    category: "Acessórios",
    rating: 4.6,
    reviews: 1203,
    description: "Smartwatch premium com monitoramento de saúde avançado, GPS integrado e design elegante.",
    features: ["Monitor cardíaco", "GPS integrado", "Resistente à água 5ATM", "Até 40h bateria", "NFC", "Tela AMOLED 1.4\""],
    stock: 20,
  },
  {
    id: 5,
    name: "Tênis Nike Air Max 270",
    slug: "nike-air-max-270",
    price: 799,
    originalPrice: 999,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    category: "Roupas",
    rating: 4.5,
    reviews: 3456,
    badge: "Oferta",
    description: "Tênis Nike Air Max 270 com a maior unidade Air da Nike, proporcionando conforto excepcional o dia todo.",
    features: ["Unidade Air 270°", "Cabedal respirável", "Solado de borracha", "Espuma React", "Disponível em 8 cores"],
    stock: 45,
  },
  {
    id: 6,
    name: "Jaqueta Levi's Trucker",
    slug: "jaqueta-levis-trucker",
    price: 449,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
    category: "Roupas",
    rating: 4.4,
    reviews: 876,
    description: "Jaqueta jeans clássica Levi's, um ícone da moda americana desde 1967. Estilo atemporal e durabilidade incomparável.",
    features: ["100% algodão", "Lavagem stone", "Bolsos frontais", "Ajuste slim", "Disponível em P/M/G/GG"],
    stock: 25,
  },
  {
    id: 7,
    name: "Relógio Fossil Gen 6",
    slug: "fossil-gen-6",
    price: 1599,
    originalPrice: 1999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    category: "Acessórios",
    rating: 4.3,
    reviews: 654,
    description: "Smartwatch Fossil Gen 6 com Wear OS, carregamento rápido e design sofisticado para o dia a dia.",
    features: ["Wear OS", "Carregamento rápido", "Monitor SpO2", "GPS conectado", "Pagamento por NFC", "Pulseiras intercambiáveis"],
    stock: 12,
  },
  {
    id: 8,
    name: "Sony WH-1000XM5",
    slug: "sony-wh-1000xm5",
    price: 2299,
    originalPrice: 2799,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "Eletrônicos",
    rating: 4.9,
    reviews: 5678,
    badge: "Top Avaliado",
    description: "Headphone premium Sony com o melhor cancelamento de ruído do mercado, áudio Hi-Res e até 30 horas de bateria.",
    features: ["Cancelamento de ruído líder", "30h de bateria", "Áudio Hi-Res", "8 microfones", "Multipoint Bluetooth", "Dobrável"],
    stock: 18,
  },
  {
    id: 9,
    name: "Camiseta Básica Premium",
    slug: "camiseta-basica-premium",
    price: 89,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500&h=500&fit=crop",
    category: "Roupas",
    rating: 4.2,
    reviews: 2109,
    description: "Camiseta de algodão premium, corte perfeito e toque suave. Disponível em 12 cores diferentes.",
    features: ["100% algodão Pima", "Gramatura 180g/m²", "12 cores disponíveis", "Tamanhos XS-3XL", "Lavável à máquina"],
    stock: 100,
  },
  {
    id: 10,
    name: "Mochila Samsonite Pro",
    slug: "mochila-samsonite-pro",
    price: 699,
    originalPrice: 899,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    category: "Acessórios",
    rating: 4.6,
    reviews: 1432,
    description: "Mochila profissional Samsonite com compartimento acolchoado para notebook de até 15.6\", porta USB e material expansível.",
    features: ["Compartimento notebook 15.6\"", "Porta USB integrada", "Material expansível 25-33L", "Organizador interno", "Impermeável"],
    stock: 22,
  },
  {
    id: 11,
    name: "iPad Pro M4 11\"",
    slug: "ipad-pro-m4",
    price: 7999,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop",
    category: "Eletrônicos",
    rating: 4.8,
    reviews: 1876,
    badge: "Novo",
    description: "O iPad Pro mais fino e poderoso já criado. Com chip M4 e tela Ultra Retina XDR OLED, é uma ferramenta profissional completa.",
    features: ["Chip Apple M4", "Tela OLED Ultra Retina XDR", "Apple Pencil Pro", "Magic Keyboard compatível", "USB-C Thunderbolt 4"],
    stock: 10,
  },
  {
    id: 12,
    name: "Óculos Ray-Ban Aviator",
    slug: "oculos-ray-ban-aviator",
    price: 799,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop",
    category: "Acessórios",
    rating: 4.5,
    reviews: 3210,
    description: "Óculos de sol Ray-Ban Aviator clássico, ícone do estilo americano desde 1937. Lentes polarizadas e armação dourada.",
    features: ["Lentes polarizadas", "Proteção UV400", "Armação dourada", "Lentes G-15", "Case incluso", "Garantia 2 anos"],
    stock: 35,
  },
];

export const featuredProducts = products.slice(0, 8);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}
