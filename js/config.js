/* ============================================================
   CONFIGURAÇÃO CENTRAL — CRIATÓRIO AVINEX
   Altere apenas este arquivo para atualizar informações
   que aparecem em todo o site.
   ============================================================ */

const CONFIG = {
  NOME_DO_CRIATORIO: "Criatório Avinex",

  // Apenas números, com DDD e país (55 = Brasil). Usado para o link do WhatsApp.
  WHATSAPP_NUMERO: "5575991869145",
  WHATSAPP_EXIBICAO: "(75) 99186-9145",

  INSTAGRAM_USUARIO: "@criatorioavinex",
  INSTAGRAM_URL: "https://instagram.com/criatorioavinex",

  // Deixe em branco até que o endereço seja confirmado pelo proprietário.
  ENDERECO: "",

  DESCRICAO_CURTA:
    "Ovos férteis de codorna, codornas e aves selecionadas. Criação com cuidado, seleção e responsabilidade.",

  FORMAS_DE_ENVIO: [
    { nome: "Correios", ativo: true, obs: "Consulte disponibilidade para sua região." },
    { nome: "Carro de linha", ativo: true, obs: "Disponível para algumas rotas — consulte." },
    { nome: "Transportadora", ativo: true, obs: "Sob consulta." },
    { nome: "Retirada no local", ativo: true, obs: "Combine data e horário pelo WhatsApp." }
  ],

  ANO_RODAPE: 2026
};

/* Monta o link do WhatsApp com mensagem pré-definida */
function linkWhatsApp(mensagem) {
  const texto = encodeURIComponent(mensagem || "Olá! Vim pelo site do Criatório Avinex e gostaria de mais informações.");
  return `https://wa.me/${CONFIG.WHATSAPP_NUMERO}?text=${texto}`;
}
