(() => {
  const root = new URL('../../', document.currentScript.src);
  const url = (path) => new URL(path, root).href;

  const PHONE_DISPLAY = '(84) 9 9404-1034';
  const PHONE_TEL = 'tel:+5584994041034';
  const WHATSAPP = 'https://wa.me/5584994041034';
  const EMAIL = 'contato@oticasgomesrn.com.br';
  const INSTAGRAM = 'https://instagram.com/oticasgomesrn';
  const FACEBOOK = 'https://facebook.com/OticaGomesRn';

  const PAGES = [
    { label: 'Inicial', path: 'index.html' },
    { label: 'Sobre nós', path: 'frontend/html/sobre.html' },
    { label: 'Unidades', path: 'frontend/html/unidades.html', also: 'frontend/html/unidade.html' },
    { label: 'Notícias', path: 'frontend/html/noticias.html' },
    { label: 'Fale conosco', path: 'frontend/html/contato.html' },
  ];

  const normalize = (pathname) => pathname.replace(/index\.html$/, '');
  const isCurrent = (...paths) =>
    paths.filter(Boolean).some((path) => normalize(new URL(url(path)).pathname) === normalize(location.pathname));

  const logo = (modifier = '') => `
    <a class="logo ${modifier}" href="${url('index.html')}" aria-label="Óticas Gomes, ir para o início">
      <img class="logo__img logo__img--light" src="${url('frontend/assets/logo-light.webp')}" alt="" width="1194" height="474">
      <img class="logo__img logo__img--dark" src="${url('frontend/assets/logo-dark.webp')}" alt="" width="1194" height="474">
    </a>`;

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      const navItems = PAGES.map(({ label, path, also }) => {
        const current = isCurrent(path, also);
        return `<li><a href="${url(path)}" class="nav__link${current ? ' is-active' : ''}"${current ? ' aria-current="page"' : ''}>${label}</a></li>`;
      }).join('');

      this.innerHTML = `
        <div class="scroll-progress"></div>
        <header class="site-header">
          <div class="container site-header__inner">
            ${logo()}
            <nav class="nav" id="siteNav" aria-label="Navegação principal">
              <ul class="nav__list">${navItems}</ul>
            </nav>
            <div class="site-header__actions">
              <a class="btn btn--ghost" href="${PHONE_TEL}">${PHONE_DISPLAY}</a>
              <a class="btn btn--primary" href="${WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>
              <button class="theme-toggle" aria-label="Alternar tema claro/escuro">
                <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
                <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>
              </button>
              <button class="nav-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="siteNav">
                <span></span><span></span><span></span>
              </button>
            </div>
          </div>
        </header>`;

      this.bindTheme();
      this.bindMenu();
      this.bindScroll();
    }

    bindTheme() {
      this.querySelector('.theme-toggle').addEventListener('click', () => {
        const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
        const current = document.documentElement.getAttribute('data-theme') || (prefersDark ? 'dark' : 'light');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('oticasgomes:theme', next);
      });
    }

    bindMenu() {
      const header = this.querySelector('.site-header');
      const toggle = this.querySelector('.nav-toggle');

      const setOpen = (open) => {
        header.classList.toggle('is-menu-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
      };

      toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-menu-open')));
      this.querySelector('.nav').addEventListener('click', (e) => {
        if (e.target.matches('.nav__link')) setOpen(false);
      });
    }

    bindScroll() {
      const header = this.querySelector('.site-header');
      const progress = this.querySelector('.scroll-progress');

      let lastY = scrollY;

      const onScroll = () => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const goingDown = scrollY > lastY;
        const menuOpen = header.classList.contains('is-menu-open');

        header.classList.toggle('is-scrolled', scrollY > 40);
        header.classList.toggle('is-hidden', goingDown && scrollY > 400 && !menuOpen);
        progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
        lastY = scrollY;
      };

      document.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      const navItems = PAGES.map(({ label, path }) => `<li><a href="${url(path)}">${label}</a></li>`).join('');

      this.innerHTML = `
        <footer class="site-footer">
          <div class="container site-footer__inner">
            <div class="site-footer__brand">
              ${logo('logo--footer')}
            </div>
            <nav class="site-footer__nav" aria-label="Acesso rápido">
              <p class="site-footer__heading">Acesso rápido</p>
              <ul>${navItems}</ul>
            </nav>
            <div class="site-footer__contact">
              <p class="site-footer__heading">Fale conosco</p>
              <p><a href="${PHONE_TEL}">${PHONE_DISPLAY}</a></p>
              <p><a href="mailto:${EMAIL}">${EMAIL}</a></p>
              <div class="site-footer__social">
                <a href="${INSTAGRAM}" target="_blank" rel="noopener" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
                </a>
                <a href="${FACEBOOK}" target="_blank" rel="noopener" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 8h2V4h-2a5 5 0 0 0-5 5v2H8v4h2v7h4v-7h3l1-4h-4V9a1 1 0 0 1 1-1Z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div class="site-footer__bottom">
            <div class="container">
              <p>Copyright © ${new Date().getFullYear()} Óticas Gomes. Todos os direitos reservados.</p>
            </div>
          </div>
        </footer>

        <button class="back-to-top" aria-label="Voltar ao topo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>
        </button>

        <div class="cookie-banner" role="dialog" aria-live="polite">
          <p>Este site usa cookies para personalizar o conteúdo e analisar o tráfego a fim de oferecer a você uma experiência melhor.</p>
          <button class="btn btn--primary btn--sm">Permitir cookies</button>
        </div>`;

      this.bindBackToTop();
      this.bindCookieBanner();
    }

    bindBackToTop() {
      const button = this.querySelector('.back-to-top');
      const onScroll = () => button.classList.toggle('is-visible', scrollY > 600);

      button.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
      document.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    bindCookieBanner() {
      const KEY = 'oticasgomes:cookies-accepted';
      const banner = this.querySelector('.cookie-banner');

      if (!localStorage.getItem(KEY)) {
        setTimeout(() => banner.classList.add('is-visible'), 800);
      }
      banner.querySelector('button').addEventListener('click', () => {
        localStorage.setItem(KEY, '1');
        banner.classList.remove('is-visible');
      });
    }
  }

  customElements.define('site-header', SiteHeader);
  customElements.define('site-footer', SiteFooter);
})();
