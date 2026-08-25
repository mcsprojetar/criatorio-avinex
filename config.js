/* ============================================================
   CONFIGURAÇÃO CENTRAL — CRIATÓRIO AVINEX
   Os valores reais ficam em data/config.json (editável pelo
   painel /admin ou diretamente pelo GitHub). Este arquivo
   apenas carrega esses dados e monta o link do WhatsApp.
   ============================================================ */

const CONFIG = {
  NOME_DO_CRIATORIO: "Criatório Avinex",
  WHATSAPP_NUMERO: "5575991869145",
  WHATSAPP_EXIBICAO: "(75) 99186-9145",
  INSTAGRAM_USUARIO: "@criatorioavinex",
  INSTAGRAM_URL: "https://instagram.com/criatorioavinex",
  TEXTO_SOBRE: "",
  FORMAS_DE_ENVIO: [],
  ANO_RODAPE: new Date().getFullYear()
};

/* Busca data/config.json e atualiza o objeto CONFIG (mantendo a mesma referência) */
async function carregarConfig() {
  try {
    const resposta = await fetch("data/config.json", { cache: "no-store" });
    const dados = await resposta.json();

    CONFIG.NOME_DO_CRIATORIO = dados.nome_do_criatorio || CONFIG.NOME_DO_CRIATORIO;
    CONFIG.WHATSAPP_NUMERO = dados.whatsapp_numero || CONFIG.WHATSAPP_NUMERO;
    CONFIG.WHATSAPP_EXIBICAO = dados.whatsapp_exibicao || CONFIG.WHATSAPP_EXIBICAO;
    CONFIG.INSTAGRAM_USUARIO = dados.instagram_usuario || CONFIG.INSTAGRAM_USUARIO;
    CONFIG.INSTAGRAM_URL = dados.instagram_url || CONFIG.INSTAGRAM_URL;
    CONFIG.TEXTO_SOBRE = dados.texto_sobre || CONFIG.TEXTO_SOBRE;
    CONFIG.FORMAS_DE_ENVIO = Array.isArray(dados.formas_de_envio) ? dados.formas_de_envio : CONFIG.FORMAS_DE_ENVIO;
  } catch (e) {
    console.warn("Não foi possível carregar data/config.json, usando valores padrão.", e);
  }
}

/* Monta o link do WhatsApp com mensagem pré-definida */
function linkWhatsApp(mensagem) {
  const texto = encodeURIComponent(mensagem || "Olá! Vim pelo site do Criatório Avinex e gostaria de mais informações.");
  return `https://wa.me/${CONFIG.WHATSAPP_NUMERO}?text=${texto}`;
}
