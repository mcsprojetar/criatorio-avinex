# Criatório Avinex — Site

Site institucional e de vendas do Criatório Avinex, com catálogo de produtos, carrinho simples e finalização de pedido pelo WhatsApp.

## Estrutura do projeto

```
criatorio-avinex/
├── index.html          → Página inicial
├── produtos.html        → Catálogo + carrinho + formulário de pedido
├── contato.html         → Página de contato
├── manifest.json        → Configuração do app instalável (PWA)
├── service-worker.js    → Cache offline básico
├── css/style.css        → Todo o visual do site
├── js/
│   ├── config.js         → INFORMAÇÕES DO NEGÓCIO (edite aqui!)
│   ├── produtos.js       → Lista de produtos (edite aqui!)
│   ├── carrinho.js       → Lógica do carrinho de compras
│   └── app.js            → Menu, rodapé, FAQ, galeria, etc.
├── images/
│   ├── produtos/  galeria/  banners/  logo/
└── favicon/
```

## O que editar quando precisar

**Trocar número de WhatsApp, Instagram ou descrição do criatório**
→ Abra `js/config.js` e altere os valores no topo do arquivo. Essas informações aparecem automaticamente em todas as páginas.

**Adicionar, remover ou alterar um produto**
→ Abra `js/produtos.js` e edite a lista `PRODUTOS`. Copie um bloco `{ ... }` para criar um novo produto. Defina `preco: 0` se ainda não tiver o valor definido — o site mostrará "Consulte o valor" automaticamente.

**Adicionar fotos**
→ Coloque os arquivos de imagem em `images/produtos/`, `images/galeria/` ou `images/banners/`, usando o mesmo nome de arquivo referenciado no HTML (ou atualize o caminho `src=""` correspondente). Enquanto uma foto não existir, um espaço reservado (placeholder) aparece no lugar automaticamente — o site nunca quebra por falta de imagem.

**Alterar textos (Sobre, FAQ, formas de envio)**
→ Edite diretamente o texto dentro de `index.html`. Trechos marcados como editáveis estão sinalizados no próprio site.

## Como colocar o site no ar

Este é um site estático (HTML, CSS e JavaScript puros) — não precisa de servidor especial nem banco de dados.

### Opção 1 — Netlify (mais simples)
1. Acesse [netlify.com](https://netlify.com) e crie uma conta gratuita.
2. Arraste a pasta `criatorio-avinex` inteira para a área de upload ("Deploy manually").
3. Pronto — o Netlify gera um link público na hora.

### Opção 2 — Vercel
1. Acesse [vercel.com](https://vercel.com) e crie uma conta.
2. Crie um novo projeto e importe a pasta `criatorio-avinex` (ou um repositório do GitHub com esses arquivos).
3. Publique — o Vercel gera o link automaticamente.

### Opção 3 — GitHub Pages
1. Crie um repositório no GitHub e envie todos os arquivos desta pasta para ele.
2. Vá em **Settings → Pages**.
3. Em "Branch", selecione `main` e a pasta `/root`, depois salve.
4. O site ficará disponível em `https://seu-usuario.github.io/nome-do-repositorio/`.

### Opção 4 — Hospedagem tradicional (cPanel, Hostgator, etc.)
1. Acesse o gerenciador de arquivos ou use FTP.
2. Envie todo o conteúdo da pasta `criatorio-avinex` para a pasta `public_html` (ou equivalente).
3. Acesse o domínio contratado — o site estará no ar.

## Observações importantes

- O botão flutuante de WhatsApp e todos os botões de compra usam o número cadastrado em `js/config.js` — altere apenas ali.
- Preços não cadastrados aparecem como "Consulte o valor" em vez de um valor inventado.
- O carrinho é salvo no navegador do próprio cliente (não há banco de dados nesta primeira versão).
- Para o ícone do app (PWA) funcionar perfeitamente, adicione os arquivos `favicon/icon-192.png` e `favicon/icon-512.png` (imagens PNG quadradas) quando tiver a logo pronta.
- Teste sempre em um celular real antes de divulgar o link.
