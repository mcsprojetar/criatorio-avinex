/* ============================================================
   CARRINHO — CRIATÓRIO AVINEX
   Carrinho simples, salvo no localStorage do navegador do
   cliente, com finalização do pedido pelo WhatsApp.
   ============================================================ */

const CARRINHO_KEY = "avinex_carrinho";

function lerCarrinho() {
  try {
    const dados = localStorage.getItem(CARRINHO_KEY);
    return dados ? JSON.parse(dados) : [];
  } catch (e) {
    return [];
  }
}

function salvarCarrinho(itens) {
  try {
    localStorage.setItem(CARRINHO_KEY, JSON.stringify(itens));
  } catch (e) {
    /* Ignora silenciosamente se o armazenamento não estiver disponível */
  }
  atualizarContadorCarrinho();
}

function adicionarAoCarrinho(produtoId, quantidade = 1) {
  const itens = lerCarrinho();
  const existente = itens.find((i) => i.id === produtoId);
  if (existente) {
    existente.quantidade += quantidade;
  } else {
    itens.push({ id: produtoId, quantidade });
  }
  salvarCarrinho(itens);
}

function alterarQuantidade(produtoId, novaQuantidade) {
  let itens = lerCarrinho();
  if (novaQuantidade <= 0) {
    itens = itens.filter((i) => i.id !== produtoId);
  } else {
    const item = itens.find((i) => i.id === produtoId);
    if (item) item.quantidade = novaQuantidade;
  }
  salvarCarrinho(itens);
  renderizarCarrinho();
}

function removerDoCarrinho(produtoId) {
  const itens = lerCarrinho().filter((i) => i.id !== produtoId);
  salvarCarrinho(itens);
  renderizarCarrinho();
}

function totalItensCarrinho() {
  return lerCarrinho().reduce((soma, i) => soma + i.quantidade, 0);
}

function subtotalCarrinho() {
  const itens = lerCarrinho();
  let total = 0;
  itens.forEach((i) => {
    const produto = buscarProduto(i.id);
    if (produto && produto.preco > 0) total += produto.preco * i.quantidade;
  });
  return total;
}

function atualizarContadorCarrinho() {
  const contadores = document.querySelectorAll("[data-carrinho-contador]");
  const total = totalItensCarrinho();
  contadores.forEach((el) => {
    el.textContent = total;
    el.style.display = total > 0 ? "flex" : "none";
  });
}

/* Renderiza a lista de itens do carrinho na página, se o container existir */
function renderizarCarrinho() {
  const container = document.querySelector("[data-carrinho-lista]");
  if (!container) return;

  const itens = lerCarrinho();

  if (itens.length === 0) {
    container.innerHTML = `<p class="carrinho-vazio">Seu carrinho está vazio. Veja os <a href="produtos.html">produtos disponíveis</a>.</p>`;
    atualizarResumoCarrinho();
    return;
  }

  container.innerHTML = itens
    .map((i) => {
      const p = buscarProduto(i.id);
      if (!p) return "";
      return `
        <div class="carrinho-item">
          <img src="${p.imagem}" alt="${p.nome}" onerror="this.src='images/produtos/placeholder.svg'">
          <div class="carrinho-item-info">
            <h4>${p.nome}</h4>
            <p class="carrinho-item-preco">${formatarPreco(p.preco)} ${p.preco > 0 ? "/ " + p.unidade : ""}</p>
            <div class="qtd-controle">
              <button type="button" aria-label="Diminuir quantidade" onclick="alterarQuantidade('${p.id}', ${i.quantidade - 1})">−</button>
              <span>${i.quantidade}</span>
              <button type="button" aria-label="Aumentar quantidade" onclick="alterarQuantidade('${p.id}', ${i.quantidade + 1})">+</button>
            </div>
          </div>
          <button type="button" class="carrinho-item-remover" aria-label="Remover item" onclick="removerDoCarrinho('${p.id}')">✕</button>
        </div>`;
    })
    .join("");

  atualizarResumoCarrinho();
}

function atualizarResumoCarrinho() {
  const subtotalEl = document.querySelector("[data-carrinho-subtotal]");
  if (subtotalEl) {
    const subtotal = subtotalCarrinho();
    const semPreco = lerCarrinho().some((i) => {
      const p = buscarProduto(i.id);
      return p && p.preco <= 0;
    });
    subtotalEl.textContent =
      subtotal > 0
        ? subtotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) + (semPreco ? " + itens a consultar" : "")
        : "A consultar";
  }
}

/* Monta a mensagem do WhatsApp com todos os itens do carrinho + dados do formulário */
function montarMensagemPedido() {
  const itens = lerCarrinho();
  const nome = document.getElementById("pedido-nome")?.value.trim() || "";
  const cidade = document.getElementById("pedido-cidade")?.value.trim() || "";
  const estado = document.getElementById("pedido-estado")?.value.trim() || "";
  const cep = document.getElementById("pedido-cep")?.value.trim() || "";
  const obs = document.getElementById("pedido-observacao")?.value.trim() || "";

  let linhas = ["Olá! Gostaria de fazer um pedido no Criatório Avinex.", ""];

  if (itens.length > 0) {
    itens.forEach((i) => {
      const p = buscarProduto(i.id);
      if (p) linhas.push(`Produto: ${p.nome}\nQuantidade: ${i.quantidade}`);
    });
    linhas.push("");
  }

  linhas.push(`Nome: ${nome || "-"}`);
  linhas.push(`Cidade: ${cidade || "-"}`);
  linhas.push(`Estado: ${estado || "-"}`);
  linhas.push(`CEP: ${cep || "-"}`);
  linhas.push("");
  linhas.push(`Observação:\n${obs || "-"}`);

  return linhas.join("\n");
}

function enviarPedidoWhatsApp(event) {
  if (event) event.preventDefault();
  const nome = document.getElementById("pedido-nome");
  if (nome && !nome.value.trim()) {
    nome.focus();
    nome.reportValidity?.();
    return false;
  }
  const mensagem = montarMensagemPedido();
  window.open(linkWhatsApp(mensagem), "_blank");
  return false;
}

document.addEventListener("DOMContentLoaded", () => {
  atualizarContadorCarrinho();
  renderizarCarrinho();
});
