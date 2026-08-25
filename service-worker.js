/* ============================================================
   SERVICE WORKER — CRIATÓRIO AVINEX
   Cache básico para permitir instalação como app e uso offline
   das páginas e arquivos principais.
   ============================================================ */

const CACHE_NOME = "avinex-cache-v1";
const ARQUIVOS_CACHE = [
  "index.html",
  "produtos.html",
  "contato.html",
  "css/style.css",
  "js/config.js",
  "js/produtos.js",
  "js/carrinho.js",
  "js/app.js",
  "manifest.json",
  "data/produtos.json",
  "data/config.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NOME).then((cache) => cache.addAll(ARQUIVOS_CACHE)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(chaves.filter((c) => c !== CACHE_NOME).map((c) => caches.delete(c)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((resposta) => {
      return (
        resposta ||
        fetch(event.request)
          .then((rede) => {
            const copia = rede.clone();
            caches.open(CACHE_NOME).then((cache) => cache.put(event.request, copia));
            return rede;
          })
          .catch(() => resposta)
      );
    })
  );
});
