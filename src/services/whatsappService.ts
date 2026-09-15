import { EmpresaConfig, Produto, OrdemDeServico } from '../types';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function cleanPhoneForWa(phone: string): string {
  // Remove non-numeric characters
  const clean = phone.replace(/\D/g, '');
  // If no country code, prepend 55 (Brazil)
  if (clean.length === 10 || clean.length === 11) {
    return `55${clean}`;
  }
  return clean;
}

export function buildProductInterestUrl(produto: Produto, config: EmpresaConfig): string {
  const preco = formatCurrency(produto.precoPromocional || produto.precoVenda);
  const texto = `Olá! Tenho interesse no produto ${produto.nome}, no valor de ${preco}. Gostaria de verificar a disponibilidade na loja física.`;
  const waNumber = cleanPhoneForWa(config.whatsapp);
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(texto)}`;
}

export function buildOrderTrackingUrl(os: OrdemDeServico, config: EmpresaConfig): string {
  const texto = `Olá! Gostaria de informações sobre a Ordem de Serviço ${os.numeroOS} (${os.equipamento.marca} ${os.equipamento.modelo}). Meu nome é ${os.clienteNome}.`;
  const waNumber = cleanPhoneForWa(config.whatsapp);
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(texto)}`;
}

export function buildGeneralSupportUrl(config: EmpresaConfig, assunto: string = 'Atendimento Geral'): string {
  const texto = `Olá! Gostaria de solicitar um orçamento / suporte técnico sobre: ${assunto}.`;
  const waNumber = cleanPhoneForWa(config.whatsapp);
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(texto)}`;
}

export function buildApproveQuoteUrl(os: OrdemDeServico, config: EmpresaConfig): string {
  const valor = formatCurrency(os.valorTotal);
  const texto = `Olá! Gostaria de autorizar a execução do orçamento da Ordem de Serviço ${os.numeroOS} no valor total de ${valor}. (Cliente: ${os.clienteNome})`;
  const waNumber = cleanPhoneForWa(config.whatsapp);
  return `https://wa.me/${waNumber}?text=${encodeURIComponent(texto)}`;
}
