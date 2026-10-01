(() => {
  const PAGES = [
    { label: 'Inicial', path: '' },
    { label: 'Sobre nós', path: 'sobre/' },
    { label: 'Unidades', path: 'unidades/', also: 'loja/' },
    { label: 'Notícias', path: 'noticias/' },
    { label: 'Fale conosco', path: 'contato/' },
  ];

  const CHANNELS = {
    whatsapp: { label: 'WhatsApp', value: SITE.phone, href: whatsappUrl(), external: true, whatsapp: true },
    email: { label: 'E-mail', value: SITE.email, href: `mailto:${SITE.email}` },
    instagram: { label: 'Instagram', value: SITE.instagram.handle, href: SITE.instagram.url, external: true },
    facebook: { label: 'Facebook', value: SITE.facebook.handle, href: SITE.facebook.url, external: true },
  };

  const normalize = (pathname) => pathname.replace(/index\.html$/, '');
  const isCurrent = (...paths) =>
    paths.filter((path) => path !== undefined).some((path) => normalize(new URL(siteUrl(path)).pathname) === normalize(location.pathname));

  const logo = (modifier = '') => `
    <a class="logo ${modifier}" href="${siteUrl()}" aria-label="Óticas Gomes, ir para o início">
      <img class="logo__img logo__img--light" src="${siteUrl('frontend/assets/logo-light.webp')}" alt="" width="1194" height="474">
      <img class="logo__img logo__img--dark" src="${siteUrl('frontend/assets/logo-dark.webp')}" alt="" width="1194" height="474">
    </a>`;

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      const navItems = PAGES.map(({ label, path, also }) => {
        const current = isCurrent(path, also);
        return `<li><a href="${siteUrl(path)}" class="nav__link${current ? ' is-active' : ''}"${current ? ' aria-current="page"' : ''}>${label}</a></li>`;
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
              <a class="btn btn--ghost" href="${telUrl(SITE.phone)}">${SITE.phone}</a>
              <a class="btn btn--primary" href="${whatsappUrl()}" target="_blank" rel="noopener" data-whatsapp>WhatsApp</a>
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
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('oticasgomes:theme', next);
        window.oticasApplyTheme();
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
      const navItems = PAGES.map(({ label, path }) => `<li><a href="${siteUrl(path)}">${label}</a></li>`).join('');

      this.innerHTML = `
        <footer class="site-footer">
          <div class="container site-footer__inner">
            <div class="site-footer__brand">${logo('logo--footer')}</div>
            <nav aria-label="Acesso rápido">
              <p class="site-footer__heading overline">Acesso rápido</p>
              <ul class="site-footer__links">${navItems}</ul>
            </nav>
            <div>
              <p class="site-footer__heading overline">Fale conosco</p>
              <ul class="site-footer__links">
                <li><a href="${telUrl(SITE.phone)}">${SITE.phone}</a></li>
                <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
              </ul>
              <div class="site-footer__social">
                <a href="${SITE.instagram.url}" target="_blank" rel="noopener" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>
                </a>
                <a href="${SITE.facebook.url}" target="_blank" rel="noopener" aria-label="Facebook">
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
        </button>`;

      this.bindBackToTop();
    }

    bindBackToTop() {
      const button = this.querySelector('.back-to-top');
      const onScroll = () => button.classList.toggle('is-visible', scrollY > 600);

      button.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));
      document.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
  }

  class SiteHours extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <dl class="hours rows">
          ${SITE.hours.map(([days, time]) => `<div><dt>${days}</dt><dd>${time}</dd></div>`).join('')}
        </dl>`;
    }
  }

  class SiteContacts extends HTMLElement {
    connectedCallback() {
      const items = this.getAttribute('channels').split(' ').map((key) => {
        const { label, value, href, external, whatsapp } = CHANNELS[key];
        return `
          <li>
            <a href="${href}"${external ? ' target="_blank" rel="noopener"' : ''}${whatsapp ? ' data-whatsapp' : ''}>
              <span><small class="overline">${label}</small><br>${value}</span>
              ${icon('diagonal')}
            </a>
          </li>`;
      }).join('');

      this.innerHTML = `<ul class="contact-list">${items}</ul>`;
    }
  }

  customElements.define('site-header', SiteHeader);
  customElements.define('site-footer', SiteFooter);
  customElements.define('site-hours', SiteHours);
  customElements.define('site-contacts', SiteContacts);
})();
