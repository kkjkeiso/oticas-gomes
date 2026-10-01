# Óticas Gomes

**Versão em português (oficial).** Em caso de divergência entre esta versão e a tradução em inglês abaixo, prevalece o texto em português.

Este é o site institucional da Óticas Gomes, uma rede familiar de óticas fundada em 2012, com sete lojas em seis cidades do Rio Grande do Norte, publicado em https://oticasgomesrn.com.br. O site apresenta o que as lojas oferecem — armações receituário, óculos solares e assistência técnica gratuita para clientes — junto com as marcas e laboratórios parceiros, a história da empresa, uma página para cada loja e os canais de contato. O visual é editorial e contido: tipografia grande, linhas finas no lugar de cards em caixas, espaço para fotos reais das lojas e um conjunto de animações leves (títulos entrando palavra por palavra, fotos reveladas como uma cortina, um parallax discreto, uma faixa rolante de marcas) que rodam na placa de vídeo e se desligam para quem prefere menos movimento. Há tema claro e escuro, o layout foi pensado primeiro para o celular e o visitante pode deixar o site encontrar a loja mais perto: com a permissão dele, a localização do navegador é comparada com as coordenadas de cada loja e a distância aparece num pequeno banner e na lista de unidades — a localização nunca sai do aparelho do visitante. Todo botão de WhatsApp já abre a conversa com uma mensagem pronta e, na página de uma loja, vai direto para o número daquela unidade.

Tudo é HTML, CSS e JavaScript puros, sem framework e sem etapa de build: a Hostinger serve os arquivos exatamente como estão no repositório. A raiz guarda só a página inicial e os arquivos de configuração; todo o resto fica em `frontend/`, e as páginas internas vivem em `frontend/html/`. Mesmo assim, os endereços públicos são limpos e sem `.html` (`/sobre/`, `/unidades/`, `/loja/?u=natal`): o `.htaccess` entrega o arquivo certo para cada endereço sem mudar o que aparece na barra do navegador. O conteúdo que mais muda fica em pequenos arquivos de dados em vez de espalhado pelas páginas — contatos, horário de funcionamento e a mensagem padrão do WhatsApp estão em `site.js`, as lojas (endereço, WhatsApp, coordenadas, mapa e fotos) estão em `units.js` e as notícias em `posts.js`. A página `loja/` é um modelo único que monta qualquer loja a partir desses dados pela URL, então adicionar ou atualizar uma loja é editar um objeto, não uma página. Todas as páginas carregam a mesma base de estilos e os mesmos scripts, e cada script só age quando encontra seus próprios ganchos na página. Para a publicação, o projeto inclui uma página de erro própria, `robots.txt`, `sitemap.xml`, imagem e meta tags de Open Graph para os links compartilhados no WhatsApp e nas redes, e um `.htaccess` que força HTTPS, redireciona o `www`, esconde arquivos ocultos como a pasta `.git`, ativa compressão e cache e define cabeçalhos de segurança.

```
.
├── index.html                 Página inicial
├── .htaccess                  URLs limpas, HTTPS, redirecionamentos, cache, compressão e segurança
├── robots.txt                 Regras para buscadores
├── sitemap.xml                Lista de páginas para o Google
├── LICENSE.md                 Licença proprietária (português prevalece, com tradução em inglês)
├── README.md
└── frontend/
    ├── dev-server.py          Servidor local que imita as URLs limpas do .htaccess
    ├── assets/                Logos, favicon, imagem de compartilhamento e imagens do site
    │   └── unidades/          Fotos das lojas
    ├── css/
    │   ├── global.css         Tokens de tema, utilitárias e todos os componentes compartilhados
    │   ├── home.css           Seções exclusivas da home (hero, serviços, marcas, sobre)
    │   └── pages.css          Páginas internas (topo, linha do tempo, lista e página de loja)
    ├── html/
    │   ├── sobre.html         /sobre/ — história, missão e valores
    │   ├── unidades.html      /unidades/ — lista de todas as lojas
    │   ├── loja.html          /loja/?u=<slug> — modelo de página de loja
    │   ├── noticias.html      /noticias/ — notícias
    │   ├── contato.html       /contato/ — canais de atendimento e horário
    │   └── 404.html           Página de erro para endereços inexistentes
    └── js/
        ├── theme.js           Aplica o tema claro/escuro antes da página aparecer
        ├── site.js            Dados: telefone, WhatsApp, e-mail, redes sociais, horário
        ├── units.js           Dados: as lojas, mais funções para montar URLs e linhas
        ├── posts.js           Dados e renderização das notícias
        ├── components.js      <site-header>, <site-footer>, <site-hours> e <site-contacts>
        ├── units-render.js    Monta a lista de lojas, as cidades da home e a página de loja
        ├── nearby.js          Encontra a loja mais perto a partir da localização do visitante
        └── main.js            Links do WhatsApp, animações e contadores
```

Para rodar o site localmente, basta ter o Python 3. Como as URLs limpas dependem do `.htaccess`, que só funciona na Hostinger, o projeto traz um pequeno servidor de desenvolvimento que faz a mesma tradução de endereços e também mostra a página 404. Abra um terminal na pasta do projeto (a que contém o `index.html`) e rode o comando do seu sistema: no Linux e no macOS, `python3 frontend/dev-server.py`; no Windows, `py frontend\dev-server.py`. Depois abra `http://localhost:8000` no navegador; `Ctrl + C` encerra o servidor, e um número depois do comando troca a porta (`python3 frontend/dev-server.py 3000`). O `python -m http.server` comum não serve aqui, porque não entende os endereços limpos, e abrir o `index.html` direto pelo explorador de arquivos também não, já que os caminhos partem da raiz do site e a busca pela loja mais perto só funciona em `localhost` ou em HTTPS.

O código foi desenvolvido por Keyrrison Vinícius de Freitas Costa exclusivamente para a Óticas Gomes e é proprietário — os termos completos estão em `LICENSE.md`. Na prática, o código-fonte pode ser visualizado para fins de estudo e portfólio, mas nenhuma parte dele (código, textos, imagens ou identidade visual) pode ser copiada, redistribuída ou reutilizada sem autorização prévia por escrito.

---

# Óticas Gomes

**English version (translation for convenience only).** In case of any discrepancy between this translation and the Portuguese version above, the Portuguese text prevails.

This is the institutional website of Óticas Gomes, a family-run eyewear chain founded in 2012 with seven stores across six cities in Rio Grande do Norte, Brazil, published at https://oticasgomesrn.com.br. The site presents what the stores offer — prescription frames, sunglasses and free technical assistance for customers — along with the partner brands and labs, the story of the company, a page for each store and the contact channels. The look is editorial and restrained: large type, hairline rules instead of boxed cards, room for real photos of the stores and a set of light animations (word-by-word headings, photos revealed like a curtain, a subtle parallax, a marquee of brands) that run on the GPU and switch off for anyone who prefers reduced motion. There is a light and a dark theme, the layout was built mobile-first, and visitors can let the site find the store closest to them: with their permission, the browser's location is compared against each store's coordinates and the distance is shown in a small banner and in the store list — the location never leaves the visitor's device. Every WhatsApp button opens the chat with a ready-made message and, on a store page, goes straight to that store's own number.

Everything is plain HTML, CSS and JavaScript, with no framework and no build step: Hostinger serves the files exactly as they are in the repository. The root only holds the home page and the configuration files; everything else lives in `frontend/`, with the inner pages in `frontend/html/`. Even so, the public addresses are clean and free of `.html` (`/sobre/`, `/unidades/`, `/loja/?u=natal`): `.htaccess` serves the right file for each address without changing what shows in the browser's address bar. The content that changes most lives in small data files instead of being scattered through the pages — contact details, opening hours and the default WhatsApp message are in `site.js`, the stores (address, WhatsApp, coordinates, map and photos) are in `units.js`, and the news are in `posts.js`. The `loja/` page is a single template that renders any store from that data through the URL, so adding or updating a store means editing one object, not a page. Every page loads the same stylesheet base and the same scripts, and each script only acts when it finds its own hooks on the page. For publishing, the project ships its own error page, `robots.txt`, `sitemap.xml`, an Open Graph image and meta tags for links shared on WhatsApp and social media, and an `.htaccess` that forces HTTPS, redirects `www`, hides dotfiles such as the `.git` folder, enables compression and caching and sets security headers.

```
.
├── index.html                 Home page
├── .htaccess                  Clean URLs, HTTPS, redirects, caching, compression and security
├── robots.txt                 Rules for search engines
├── sitemap.xml                Page list for Google
├── LICENSE.md                 Proprietary license (Portuguese prevails, English translation)
├── README.md
└── frontend/
    ├── dev-server.py          Local server that mirrors the clean URLs of .htaccess
    ├── assets/                Logos, favicon, sharing image and site images
    │   └── unidades/          Store photos
    ├── css/
    │   ├── global.css         Theme tokens, utilities and every shared component
    │   ├── home.css           Home-only sections (hero, services, marquee, about)
    │   └── pages.css          Inner pages (page hero, timeline, store list and store page)
    ├── html/
    │   ├── sobre.html         /sobre/ — history, mission and values
    │   ├── unidades.html      /unidades/ — list of all stores
    │   ├── loja.html          /loja/?u=<slug> — single-store template
    │   ├── noticias.html      /noticias/ — news
    │   ├── contato.html       /contato/ — contact channels and opening hours
    │   └── 404.html           Error page for addresses that do not exist
    └── js/
        ├── theme.js           Applies the light/dark theme before the page paints
        ├── site.js            Data: phone, WhatsApp, e-mail, social links, opening hours
        ├── units.js           Data: the stores, plus helpers to build their URLs and rows
        ├── posts.js           Data and rendering of the news
        ├── components.js      <site-header>, <site-footer>, <site-hours> and <site-contacts>
        ├── units-render.js    Renders the store list, the home city list and the store page
        ├── nearby.js          Finds the closest store from the visitor's location
        └── main.js            WhatsApp links, animations and counters
```

To run the site locally you only need Python 3. Since the clean URLs depend on `.htaccess`, which only works on Hostinger, the project ships a small development server that performs the same address translation and also shows the 404 page. Open a terminal in the project folder (the one that contains `index.html`) and run the command for your system: on Linux and macOS, `python3 frontend/dev-server.py`; on Windows, `py frontend\dev-server.py`. Then open `http://localhost:8000` in the browser; `Ctrl + C` stops the server, and a number after the command changes the port (`python3 frontend/dev-server.py 3000`). The regular `python -m http.server` does not work here because it does not understand the clean addresses, and neither does opening `index.html` straight from the file explorer, since paths start from the site root and the closest-store finder only works on `localhost` or over HTTPS.

The code was developed by Keyrrison Vinícius de Freitas Costa exclusively for Óticas Gomes and is proprietary — the full terms are in `LICENSE.md`. In practice, the source can be viewed for study and portfolio purposes, but no part of it (code, texts, images or visual identity) may be copied, redistributed or reused without prior written permission.
