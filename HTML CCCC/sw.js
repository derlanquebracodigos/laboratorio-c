/* ==========================================================
   Service worker do Laboratório C
   - Guarda os arquivos do próprio site para a interface abrir sem internet.
   - NÃO guarda respostas do compilador (Judge0). Pedidos para outros
     endereços passam direto pela rede, sem interferência.
   - Compilar C continua exigindo internet.

   Se você mudar algum arquivo do site, aumente o número em VERSAO
   para os aparelhos baixarem a versão nova.
   ========================================================== */
const VERSAO = "laboratorioc-v3";

const ARQUIVOS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png"
];

self.addEventListener("install", function (evento) {
  evento.waitUntil(
    caches.open(VERSAO)
      .then(function (cache) { return cache.addAll(ARQUIVOS); })
      .then(function () { return self.skipWaiting(); })
  );
});

// Apaga caches de versões antigas
self.addEventListener("activate", function (evento) {
  evento.waitUntil(
    caches.keys()
      .then(function (nomes) {
        return Promise.all(
          nomes.filter(function (nome) { return nome !== VERSAO; })
               .map(function (nome) { return caches.delete(nome); })
        );
      })
      .then(function () { return self.clients.claim(); })
  );
});

// Estratégia: mostra o que está guardado na hora e atualiza em segundo plano.
self.addEventListener("fetch", function (evento) {
  const pedido = evento.request;
  const url = new URL(pedido.url);

  // Só mexe em pedidos GET do próprio site. O Judge0 (outro endereço) fica de fora.
  if (pedido.method !== "GET" || url.origin !== self.location.origin) return;

  evento.respondWith(
    caches.open(VERSAO).then(function (cache) {
      return cache.match(pedido, { ignoreSearch: true }).then(function (guardado) {
        const buscarNaRede = fetch(pedido)
          .then(function (resposta) {
            if (resposta && resposta.ok) cache.put(pedido, resposta.clone());
            return resposta;
          })
          .catch(function () {
            return guardado || (pedido.mode === "navigate" ? cache.match("./index.html") : undefined);
          });
        return guardado || buscarNaRede;
      });
    })
  );
});
