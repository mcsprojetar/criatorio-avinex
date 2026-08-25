/* ============================================================
   PRODUTOS — CRIATÓRIO AVINEX
   Os produtos reais ficam em data/produtos.json (editável pelo
   painel /admin ou diretamente pelo GitHub). Este arquivo apenas
   carrega esses dados para dentro do array PRODUTOS.
   ============================================================ */

let PRODUTOS = [];

/* Busca data/produtos.json e preenche o array PRODUTOS (mantendo a mesma referência) */
async function carregarProdutos() {
  try {
    const resposta = await fetch("data/produtos.json", { cache: "no-store" });
    const dados = await resposta.json();
    PRODUTOS.length = 0;
    if (Array.isArray(dados.produtos)) PRODUTOS.push(...dados.produtos);
  } catch (e) {
    console.warn("Não foi possível carregar data/produtos.json.", e);
  }
}

/* Retorna produto pelo id */
function buscarProduto(id) {
  return PRODUTOS.find((p) => p.id === id);
}

/* Formata preço em Real, ou "Consulte" se não cadastrado */
function formatarPreco(preco) {
  if (!preco || preco <= 0) return "Consulte o valor";
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
