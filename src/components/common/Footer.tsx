import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../contexts/AppContext';
import { 
  Wrench, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Mail, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2 
} from 'lucide-react';
import { buildGeneralSupportUrl } from '../../services/whatsappService';

export const Footer: React.FC = () => {
  const { empresa } = useApp();
  const whatsappUrl = buildGeneralSupportUrl(empresa, 'Dúvidas e Atendimento');

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* Top Advisory Banner about In-Store Purchase */}
      <div className="bg-slate-900/90 border-b border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>Aviso Importante:</strong> {empresa.avisoLojaFisica}
            </span>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Consulte estoque pelo WhatsApp &rarr;
          </a>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Wrench className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white font-mono">
                TECH<span className="text-cyan-400">FIX</span> PRO
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              {empresa.slogan}. Especialistas em reparo de microeletrônica, notebooks, smartphones, redes e venda presencial de hardware e acessórios.
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p>CNPJ: {empresa.cnpj}</p>
              <p>Garantia legal de até 90 dias em todos os serviços realizados.</p>
            </div>
          </div>

          {/* Col 2: Serviços Especializados */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">
              Nossos Serviços
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>Manutenção de Celulares e Telas OLED</span>
              </li>
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>Conserto e Upgrade de Notebooks & MacBooks</span>
              </li>
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>Formatação e Instalação de Softwares</span>
              </li>
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>Manutenção Preventiva e Pasta Térmica</span>
              </li>
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>Conserto de Impressoras e Redes Wi-Fi</span>
              </li>
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                <span>Recuperação de Dados e Backups</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Navegação Rápida & Clientes */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">
              Links Rápidos
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/produtos" className="hover:text-cyan-400 transition-colors">
                  Catálogo de Acessórios & Produtos
                </Link>
              </li>
              <li>
                <Link to="/acompanhar-os" className="hover:text-cyan-400 transition-colors">
                  Consultar Ordem de Serviço Online
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                  Acesso Administrativo (Funcionários)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Localização & Contato */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold uppercase tracking-wider">
              Loja Física & Contato
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  {empresa.endereco.logradouro}, {empresa.endereco.numero} - {empresa.endereco.complemento}
                  <br />
                  {empresa.endereco.bairro}, {empresa.endereco.cidade} - {empresa.endereco.uf}
                  <br />
                  CEP: {empresa.endereco.cep}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{empresa.telefone}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{empresa.email}</span>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-snug">
                  {empresa.horarioFuncionamento}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {empresa.nome}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span>Desenvolvido com PWA & React Architecture</span>
            <Link to="/login" className="hover:text-slate-400">
              Painel Interno
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
