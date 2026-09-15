import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { 
  ShoppingBag, 
  ArrowLeft, 
  MessageSquare, 
  ShieldCheck, 
  AlertCircle, 
  Check, 
  Package, 
  Store, 
  MapPin, 
  Share2, 
  Tag,
  Clock,
  Sparkles
} from 'lucide-react';
import { buildProductInterestUrl, formatCurrency } from '../services/whatsappService';
import { CATEGORY_LABELS } from './ProductsPage';
import { EmptyState } from '../components/common/EmptyState';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { produtos, empresa, addToast } = useApp();
  const navigate = useNavigate();

  const produto = produtos.find((p) => p.id === id);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!produto) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          title="Produto não encontrado"
          description="O item solicitado pode ter sido descontinuado ou removido do catálogo."
          actionLabel="Voltar para o catálogo"
          onAction={() => navigate('/produtos')}
        />
      </div>
    );
  }

  const waUrl = buildProductInterestUrl(produto, empresa);
  const precoEfetivo = produto.precoPromocional || produto.precoVenda;
  const descontoPercent = produto.precoPromocional
    ? Math.round(((produto.precoVenda - produto.precoPromocional) / produto.precoVenda) * 100)
    : null;

  const sameCategoryProducts = produtos
    .filter((p) => p.id !== produto.id && p.categoria === produto.categoria && p.visivelCatalogo && p.ativo)
    .slice(0, 3);
  const relatedProducts = sameCategoryProducts.length > 0 
    ? sameCategoryProducts 
    : produtos.filter((p) => p.id !== produto.id && p.visivelCatalogo && p.ativo).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: produto.nome,
        text: `Confira ${produto.nome} na ${empresa.nome}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      addToast('info', 'Link copiado!', 'Link do produto copiado para a área de transferência.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <Link to="/" className="hover:text-slate-800 transition-colors">
          Início
        </Link>
        <span>/</span>
        <Link to="/produtos" className="hover:text-slate-800 transition-colors">
          Catálogo
        </Link>
        <span>/</span>
        <span className="text-slate-700 font-semibold truncate max-w-xs sm:max-w-md">
          {produto.nome}
        </span>
      </nav>

      {/* Main Product Showcase Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Gallery (5 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden shadow-inner flex items-center justify-center">
              <img
                src={produto.imagens[selectedImageIdx] || produto.imagens[0]}
                alt={produto.nome}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              {descontoPercent && (
                <span className="absolute top-3 left-3 bg-rose-600 text-white text-xs font-extrabold px-2.5 py-1 rounded-lg shadow-md">
                  -{descontoPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {produto.imagens.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {produto.imagens.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      selectedImageIdx === idx
                        ? 'border-cyan-500 ring-2 ring-cyan-500/20'
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${produto.nome} miniatura ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Actions (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="bg-slate-900 text-white text-xs font-bold px-2.5 py-0.5 rounded-md">
                    {produto.marca}
                  </span>
                  <span className="bg-cyan-50 text-cyan-700 text-xs font-semibold px-2.5 py-0.5 rounded-md border border-cyan-200">
                    {CATEGORY_LABELS[produto.categoria] || produto.categoria}
                  </span>
                </div>

                <button
                  onClick={handleShare}
                  className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors flex items-center gap-1.5 text-xs font-medium cursor-pointer"
                  title="Compartilhar link do produto"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Compartilhar</span>
                </button>
              </div>

              {/* Title & SKU */}
              <div className="space-y-1">
                <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {produto.nome}
                </h1>
                <p className="text-xs text-slate-400">
                  SKU: <span className="font-mono text-slate-600">{produto.sku}</span>
                  {produto.modelo && ` • Modelo: ${produto.modelo}`}
                </p>
              </div>

              {/* Stock Status Badge */}
              <div className="flex items-center gap-3 pt-1">
                {produto.estoque > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    <Check className="w-3.5 h-3.5" />
                    Disponível na loja física ({produto.estoque} em estoque)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                    <AlertCircle className="w-3.5 h-3.5" />
                    Produto temporariamente esgotado
                  </span>
                )}

                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-cyan-600" />
                  Garantia de {produto.garantiaMeses} meses
                </span>
              </div>

              {/* Price Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">
                    {formatCurrency(precoEfetivo)}
                  </span>
                  {produto.precoPromocional && (
                    <span className="text-base text-slate-400 line-through">
                      {formatCurrency(produto.precoVenda)}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  Preço para pagamento presencial (Dinheiro, PIX, Cartão de Débito ou Crédito).
                </p>
              </div>

              {/* Short description */}
              <p className="text-sm text-slate-600 leading-relaxed">
                {produto.descricao}
              </p>
            </div>

            {/* In-Store Notice & Big WhatsApp CTA */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              {/* Critical notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
                <Store className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="block text-amber-950 font-semibold">
                    Venda Presencial na Loja Física:
                  </strong>
                  <p className="text-amber-800 leading-relaxed">
                    {empresa.avisoLojaFisica}
                  </p>
                </div>
              </div>

              {/* WhatsApp Action Button */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-interesse-whatsapp-detalhe"
                className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm sm:text-base transition-all shadow-lg shadow-emerald-700/20 hover:scale-[1.01] flex items-center justify-center gap-3 cursor-pointer"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Tenho interesse • Conversar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications Section */}
      {produto.especificacoes && Object.keys(produto.especificacoes).length > 0 && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-cyan-600" />
            Especificações Técnicas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 pt-2">
            {Object.entries(produto.especificacoes).map(([key, value], idx) => (
              <div
                key={key}
                className={`flex justify-between items-center py-2.5 px-3 rounded-lg text-xs ${
                  idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                }`}
              >
                <span className="font-semibold text-slate-600">{key}:</span>
                <span className="text-slate-900 font-medium text-right ml-2">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-slate-900">
              Produtos Relacionados
            </h3>
            <Link
              to="/produtos"
              className="text-xs font-bold text-cyan-700 hover:text-cyan-800"
            >
              Ver todos &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <Link
                key={rel.id}
                to={`/produtos/${rel.id}`}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:shadow-md hover:border-cyan-300 transition-all flex gap-4 items-center group"
              >
                <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden shrink-0">
                  <img
                    src={rel.imagens[0]}
                    alt={rel.nome}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {rel.marca}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-cyan-700">
                    {rel.nome}
                  </h4>
                  <p className="text-sm font-extrabold text-slate-900">
                    {formatCurrency(rel.precoPromocional || rel.precoVenda)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
