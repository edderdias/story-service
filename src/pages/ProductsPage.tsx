import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { CategoriaProduto, Produto } from '../types';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  Check, 
  MessageSquare, 
  AlertCircle, 
  ArrowUpDown, 
  X, 
  Tag, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { buildProductInterestUrl, formatCurrency } from '../services/whatsappService';
import { EmptyState } from '../components/common/EmptyState';

export const CATEGORY_LABELS: Record<CategoriaProduto, string> = {
  SMARTPHONES: 'Smartphones & Celulares',
  NOTEBOOKS_PCS: 'Notebooks & Computadores',
  ACESSORIOS_CELULAR: 'Acessórios para Celular',
  PERIFERICOS: 'Periféricos & Suportes',
  CABOS_ADAPTADORES: 'Cabos & Adaptadores',
  ARMAZENAMENTO: 'SSDs & Armazenamento',
  REDES_WIFI: 'Roteadores & Redes',
  PECAS_REPOSICAO: 'Peças de Reposição',
};

export const ProductsPage: React.FC = () => {
  const { produtos, empresa } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [selectedBrand, setSelectedBrand] = useState<string>('TODAS');
  const [priceFilter, setPriceFilter] = useState<string>('TODOS');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract unique brands
  const availableBrands = useMemo(() => {
    const brands = new Set<string>();
    produtos.forEach((p) => {
      if (p.marca) brands.add(p.marca);
    });
    return Array.from(brands).sort();
  }, [produtos]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return produtos.filter((p) => {
      // Must be visible in public catalog & active
      if (!p.visivelCatalogo || !p.ativo) return false;

      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.nome.toLowerCase().includes(query);
        const matchBrand = p.marca.toLowerCase().includes(query);
        const matchDesc = p.descricao.toLowerCase().includes(query);
        const matchSku = p.sku.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchDesc && !matchSku) return false;
      }

      // Category filter
      if (selectedCategory !== 'TODAS' && p.categoria !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'TODAS' && p.marca !== selectedBrand) {
        return false;
      }

      // Price filter
      const price = p.precoPromocional || p.precoVenda;
      if (priceFilter === 'ATE_100' && price > 100) return false;
      if (priceFilter === '100_A_250' && (price < 100 || price > 250)) return false;
      if (priceFilter === 'ACIMA_250' && price <= 250) return false;

      // In stock
      if (onlyInStock && p.estoque <= 0) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.precoPromocional || a.precoVenda;
      const priceB = b.precoPromocional || b.precoVenda;

      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      if (sortBy === 'name') return a.nome.localeCompare(b.nome);
      // 'featured'
      if (a.destaque && !b.destaque) return -1;
      if (!a.destaque && b.destaque) return 1;
      return 0;
    });
  }, [produtos, searchQuery, selectedCategory, selectedBrand, priceFilter, onlyInStock, sortBy]);

  const activeFiltersCount = [
    selectedCategory !== 'TODAS',
    selectedBrand !== 'TODAS',
    priceFilter !== 'TODOS',
    onlyInStock,
    searchQuery.trim().length > 0,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('TODAS');
    setSelectedBrand('TODAS');
    setPriceFilter('TODOS');
    setOnlyInStock(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-600 uppercase tracking-wider mb-1">
              <ShoppingBag className="w-4 h-4" />
              <span>Showroom & Acessórios</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Catálogo de Produtos
            </h1>
          </div>

          {/* Quick search input */}
          <div className="relative max-w-sm w-full">
            <input
              type="text"
              placeholder="Buscar por produto, marca ou modelo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-sm text-slate-900 placeholder-slate-400 rounded-xl pl-4 pr-10 py-2.5 border border-slate-300 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 shadow-xs"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            ) : (
              <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            )}
          </div>
        </div>

        {/* Physical Store Advisory Banner */}
        <div className="bg-amber-50/90 border border-amber-200 text-amber-900 rounded-2xl p-4 text-xs sm:text-sm flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-amber-950">
              Aviso sobre nosso Catálogo de Produtos:
            </p>
            <p className="text-amber-800 text-xs">
              {empresa.avisoLojaFisica} Não realizamos vendas diretas online com checkout. Ao clicar em <strong>"Tenho interesse"</strong>, você será direcionado para o WhatsApp de nossa equipe para confirmar disponibilidade e reservar o item para retirada.
            </p>
          </div>
        </div>
      </div>

      {/* Main Layout (Filters Sidebar + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex items-center justify-between gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-xs"
          >
            <Filter className="w-4 h-4 text-cyan-600" />
            <span>Filtros</span>
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-cyan-600 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 focus:outline-none"
            >
              <option value="featured">Destaques</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="name">Nome (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Sidebar Filters (Desktop & Mobile Drawer) */}
        <div
          className={`${
            mobileFilterOpen ? 'block' : 'hidden'
          } lg:block lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6`}
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cyan-600" />
              Filtrar Produtos
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-cyan-600 hover:text-cyan-800 font-semibold cursor-pointer"
              >
                Limpar ({activeFiltersCount})
              </button>
            )}
          </div>

          {/* 1. Categorias */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Categorias
            </label>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('TODAS')}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  selectedCategory === 'TODAS'
                    ? 'bg-cyan-50 text-cyan-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>Todas as Categorias</span>
                <span className="text-[10px] text-slate-400">{produtos.length}</span>
              </button>
              {Object.entries(CATEGORY_LABELS).map(([catKey, label]) => {
                const count = produtos.filter(
                  (p) => p.categoria === catKey && p.visivelCatalogo && p.ativo
                ).length;
                if (count === 0) return null;
                return (
                  <button
                    key={catKey}
                    onClick={() => setSelectedCategory(catKey)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === catKey
                        ? 'bg-cyan-50 text-cyan-700 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate pr-2">{label}</span>
                    <span className="text-[10px] text-slate-400">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Marcas */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Marca / Fabricante
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl p-2.5 text-slate-800 focus:outline-none focus:border-cyan-500"
            >
              <option value="TODAS">Todas as marcas</option>
              {availableBrands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Faixa de Preço */}
          <div className="space-y-2.5 pt-4 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Faixa de Preço
            </label>
            <div className="space-y-1.5">
              {[
                { id: 'TODOS', label: 'Todos os valores' },
                { id: 'ATE_100', label: 'Até R$ 100,00' },
                { id: '100_A_250', label: 'R$ 100,00 a R$ 250,00' },
                { id: 'ACIMA_250', label: 'Acima de R$ 250,00' },
              ].map((range) => (
                <button
                  key={range.id}
                  onClick={() => setPriceFilter(range.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors flex items-center gap-2 ${
                    priceFilter === range.id
                      ? 'text-cyan-700 font-bold bg-cyan-50/60'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      priceFilter === range.id
                        ? 'border-cyan-600 bg-cyan-600'
                        : 'border-slate-300'
                    }`}
                  >
                    {priceFilter === range.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </span>
                  <span>{range.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Disponibilidade */}
          <div className="pt-4 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
              />
              <span>Apenas produtos com estoque</span>
            </label>
          </div>
        </div>

        {/* Products Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Info Bar */}
          <div className="hidden lg:flex items-center justify-between pb-4 border-b border-slate-200 text-xs text-slate-500">
            <span>
              Exibindo <strong>{filteredProducts.length}</strong> produtos
              {activeFiltersCount > 0 && ' com filtros aplicados'}
            </span>

            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-700">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
              >
                <option value="featured">Destaques</option>
                <option value="price-asc">Menor Preço</option>
                <option value="price-desc">Maior Preço</option>
                <option value="name">Nome (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <EmptyState
              title="Nenhum produto encontrado"
              description="Tente ajustar os filtros ou pesquisar por outro termo para encontrar o que procura."
              actionLabel="Limpar todos os filtros"
              onAction={clearAllFilters}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((prod) => {
                const waUrl = buildProductInterestUrl(prod, empresa);
                const precoEfetivo = prod.precoPromocional || prod.precoVenda;

                return (
                  <div
                    key={prod.id}
                    id={`product-card-${prod.id}`}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-cyan-300 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative w-full h-52 bg-slate-100 overflow-hidden">
                        <img
                          src={prod.imagens[0]}
                          alt={prod.nome}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Badges */}
                        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
                          <span className="bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                            {prod.marca}
                          </span>
                          {prod.destaque && (
                            <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs flex items-center gap-1">
                              <Tag className="w-2.5 h-2.5" />
                              Destaque
                            </span>
                          )}
                        </div>

                        {/* Stock Badge */}
                        <div className="absolute bottom-2.5 right-2.5">
                          {prod.estoque > prod.estoqueMinimo ? (
                            <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                              Em Estoque ({prod.estoque})
                            </span>
                          ) : prod.estoque > 0 ? (
                            <span className="bg-amber-500/90 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                              Poucas Unidades ({prod.estoque})
                            </span>
                          ) : (
                            <span className="bg-rose-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-xs">
                              Esgotado
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Info Body */}
                      <div className="p-4 space-y-2">
                        <span className="text-[11px] font-medium text-slate-400 block">
                          SKU: {prod.sku}
                        </span>
                        <Link
                          to={`/produtos/${prod.id}`}
                          className="text-sm font-bold text-slate-900 hover:text-cyan-700 line-clamp-2 leading-snug transition-colors"
                        >
                          {prod.nome}
                        </Link>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {prod.descricao}
                        </p>
                      </div>
                    </div>

                    {/* Pricing and Action Button */}
                    <div className="p-4 pt-0 space-y-3">
                      <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
                        <div>
                          <span className="text-lg font-black text-slate-900">
                            {formatCurrency(precoEfetivo)}
                          </span>
                          {prod.precoPromocional && (
                            <span className="text-xs text-slate-400 line-through block leading-none">
                              {formatCurrency(prod.precoVenda)}
                            </span>
                          )}
                        </div>

                        <span className="text-[11px] text-slate-500 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-cyan-600" />
                          {prod.garantiaMeses}m garantia
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to={`/produtos/${prod.id}`}
                          className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold text-center transition-colors"
                        >
                          Detalhes
                        </Link>

                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          id={`btn-interesse-cat-${prod.id}`}
                          className="py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Tenho interesse</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
