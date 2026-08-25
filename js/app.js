/* ============================================================
   APP — CRIATÓRIO AVINEX
   Componentes compartilhados (cabeçalho, rodapé, botão flutuante),
   menu mobile, FAQ, galeria e renderização de produtos.
   ============================================================ */

/* ---------- Cabeçalho, rodapé e botão flutuante (evita repetir HTML em cada página) ---------- */
function montarCabecalho() {
  const el = document.querySelector("[data-header]");
  if (!el) return;
  const pagina = document.body.dataset.pagina || "";
  const link = (href, label, id) =>
    `<a href="${href}" class="${pagina === id ? "ativo" : ""}">${label}</a>`;

  el.innerHTML = `
    <div class="cabecalho-conteudo container">
      <a href="index.html" class="marca">
        <span class="marca-icone" aria-hidden="true">🥚</span>
        <span class="marca-texto">${CONFIG.NOME_DO_CRIATORIO}</span>
      </a>
      <button class="menu-botao" id="menu-botao" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu-nav">
        <span></span><span></span><span></span>
      </button>
      <nav class="menu-nav" id="menu-nav">
        ${link("index.html", "Início", "inicio")}
        ${link("produtos.html", "Produtos", "produtos")}
        ${link("index.html#sobre", "Sobre", "")}
        ${link("index.html#galeria", "Galeria", "")}
        ${link("index.html#faq", "Dúvidas", "")}
        ${link("contato.html", "Contato", "contato")}
        <a href="produtos.html#carrinho" class="menu-carrinho" aria-label="Ver carrinho">
          🛒 <span class="carrinho-badge" data-carrinho-contador>0</span>
        </a>
      </nav>
    </div>`;

  const botao = document.getElementById("menu-botao");
  const nav = document.getElementById("menu-nav");
  botao.addEventListener("click", () => {
    const aberto = nav.classList.toggle("aberto");
    botao.classList.toggle("aberto", aberto);
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("aberto");
      botao.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
    })
  );
}

function montarRodape() {
  const el = document.querySelector("[data-footer]");
  if (!el) return;
  el.innerHTML = `
    <div class="container rodape-conteudo">
      <div class="rodape-marca">
        <strong>${CONFIG.NOME_DO_CRIATORIO}</strong>
        <p>Codornas • Ovos férteis • Aves</p>
      </div>
      <div class="rodape-links">
        <a href="${linkWhatsApp()}" target="_blank" rel="noopener">WhatsApp</a>
        <a href="${CONFIG.INSTAGRAM_URL}" target="_blank" rel="noopener">Instagram</a>
        <a href="contato.html">Fale conosco</a>
      </div>
      <p class="rodape-copy">© ${CONFIG.ANO_RODAPE} ${CONFIG.NOME_DO_CRIATORIO}. Todos os direitos reservados.</p>
    </div>`;
}

function montarBotaoFlutuante() {
  const el = document.querySelector("[data-whatsapp-flutuante]");
  if (!el) return;
  el.innerHTML = `
    <a href="${linkWhatsApp()}" target="_blank" rel="noopener" class="whatsapp-flutuante" aria-label="Falar no WhatsApp">
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" fill="currentColor">
        <path d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.35.66 4.55 1.8 6.42L4 29l7.76-1.75a12.9 12.9 0 0 0 4.26.72h.01c6.62 0 12.02-5.4 12.02-12.02C28.05 8.4 22.65 3 16.02 3zm0 21.9h-.01a10 10 0 0 1-5.1-1.4l-.37-.22-4.6 1.04 1.05-4.48-.24-.38a9.9 9.9 0 0 1-1.53-5.32c0-5.48 4.46-9.94 9.95-9.94 2.66 0 5.15 1.04 7.03 2.92a9.86 9.86 0 0 1 2.9 7.02c0 5.48-4.46 9.94-9.94 9.94l-.14.02zm5.45-7.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.87 1.21 3.07c.15.2 2.09 3.19 5.06 4.47.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"/>
      </svg>
    </a>`;
}

/* ---------- FAQ (acordeão) ---------- */
function iniciarFAQ() {
  document.querySelectorAll(".faq-pergunta").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const aberto = item.classList.contains("aberto");
      document.querySelectorAll(".faq-item.aberto").forEach((i) => {
        i.classList.remove("aberto");
        i.querySelector(".faq-pergunta").setAttribute("aria-expanded", "false");
      });
      if (!aberto) {
        item.classList.add("aberto");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* ---------- Galeria com visualização ampliada ---------- */
function iniciarGaleria() {
  const fotos = document.querySelectorAll("[data-galeria-foto]");
  const overlay = document.getElementById("galeria-overlay");
  if (!overlay) return;
  const overlayImg = overlay.querySelector("img");

  fotos.forEach((foto) => {
    foto.addEventListener("click", () => {
      overlayImg.src = foto.dataset.full || foto.src;
      overlayImg.alt = foto.alt;
      overlay.classList.add("aberto");
      document.body.style.overflow = "hidden";
    });
  });

  overlay.addEventListener("click", () => {
    overlay.classList.remove("aberto");
    document.body.style.overflow = "";
  });
}

/* ---------- Renderização de produtos ---------- */
function iniciarDestaquesProdutos() {
  const container = document.querySelector("[data-destaques-produtos]");
  if (!container) return;
  const destaques = PRODUTOS.slice(0, 3);
  container.innerHTML = destaques.map(cardProdutoHTML).join("");
}

function iniciarListaProdutos() {
  const container = document.querySelector("[data-lista-produtos]");
  if (!container) return;

  const categorias = ["Todos", ...new Set(PRODUTOS.map((p) => p.categoria))];
  const filtros = document.querySelector("[data-filtros-categoria]");
  if (filtros) {
    filtros.innerHTML = categorias
      .map((c, idx) => `<button type="button" class="filtro-btn ${idx === 0 ? "ativo" : ""}" data-categoria="${c}">${c}</button>`)
      .join("");
    filtros.querySelectorAll(".filtro-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        filtros.querySelectorAll(".filtro-btn").forEach((b) => b.classList.remove("ativo"));
        btn.classList.add("ativo");
        const cat = btn.dataset.categoria;
        const filtrados = cat === "Todos" ? PRODUTOS : PRODUTOS.filter((p) => p.categoria === cat);
        container.innerHTML = filtrados.map(cardProdutoHTML).join("");
      });
    });
  }

  container.innerHTML = PRODUTOS.map(cardProdutoHTML).join("");
}

function cardProdutoHTML(p) {
  return `
    <article class="produto-card">
      <div class="produto-card-img">
        <img src="${p.imagem}" alt="${p.nome}" loading="lazy" onerror="this.src='images/produtos/placeholder.svg'">
        ${!p.disponivel ? '<span class="produto-tag indisponivel">Indisponível</span>' : ""}
      </div>
      <div class="produto-card-corpo">
        <span class="produto-categoria">${p.categoria}</span>
        <h3>${p.nome}</h3>
        <p>${p.descricao}</p>
        <div class="produto-card-rodape">
          <span class="produto-preco">${formatarPreco(p.preco)}</span>
          <div class="produto-acoes">
            <button type="button" class="botao botao-secundario botao-pequeno" onclick="adicionarAoCarrinho('${p.id}')" ${!p.disponivel ? "disabled" : ""}>+ Carrinho</button>
            <a href="${linkWhatsApp("Olá! Tenho interesse em: " + p.nome)}" target="_blank" rel="noopener" class="botao botao-whatsapp botao-pequeno">Tenho interesse</a>
          </div>
        </div>
      </div>
    </article>`;
}

/* ---------- Texto "Sobre" vindo de data/config.json ---------- */
function preencherTextoSobre() {
  const el = document.querySelector("[data-texto-sobre]");
  if (el && CONFIG.TEXTO_SOBRE) el.textContent = CONFIG.TEXTO_SOBRE;
}

/* ---------- Inicialização geral ---------- */
/* Primeiro carrega os dados (data/config.json e data/produtos.json),
   só depois monta a página. Isso permite editar tudo pelo painel /admin. */
async function iniciarApp() {
  await Promise.all([
    typeof carregarConfig === "function" ? carregarConfig() : Promise.resolve(),
    typeof carregarProdutos === "function" ? carregarProdutos() : Promise.resolve()
  ]);

  montarCabecalho();
  montarRodape();
  montarBotaoFlutuante();
  iniciarFAQ();
  iniciarGaleria();
  iniciarDestaquesProdutos();
  iniciarListaProdutos();
  preencherTextoSobre();
  if (typeof renderizarCarrinho === "function") renderizarCarrinho();
  atualizarContadorCarrinho();

  const anoEl = document.querySelector("[data-ano]");
  if (anoEl) anoEl.textContent = new Date().getFullYear();

  /* Avisa outras páginas (contato.html, index.html) que os dados já estão prontos */
  document.dispatchEvent(new Event("avinexPronto"));
}

document.addEventListener("DOMContentLoaded", iniciarApp);
