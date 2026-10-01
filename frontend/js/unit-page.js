(() => {
  const slug = new URLSearchParams(location.search).get('u');
  const unit = UNITS.find((item) => item.slug === slug);

  if (!unit) {
    location.replace('unidades.html');
    return;
  }

  const fullName = unitFullName(unit);
  const fill = (key, html) => document.querySelectorAll(`[data-unit="${key}"]`).forEach((el) => (el.innerHTML = html));
  const pending = '<span class="details__pending">Em breve</span>';
  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  document.title = `${fullName} — Óticas Gomes`;
  document.querySelector('meta[name="description"]').content =
    `${unit.description} Armações receituário, óculos solares e assistência técnica gratuita para clientes.`;

  fill('name', unit.name);
  fill('tag', `${unit.tag} · ${unit.city}, RN`);
  fill('description', unit.description);
  fill('city', `${unit.city}, RN`);
  fill('address', unit.address || pending);
  fill('phone', unit.phone ? `<a href="tel:+55${unit.phone.replace(/\D/g, '')}">${unit.phone}</a>` : pending);
  fill(
    'map',
    unit.mapEmbed
      ? `<iframe class="photo__media" src="${unit.mapEmbed}" title="Mapa da unidade ${fullName}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
      : '<div class="photo__media photo__empty">Mapa · em breve</div>'
  );

  const photoLabels = {
    facade: ['Foto · fachada da unidade', `Fachada da Óticas Gomes ${fullName}`],
    interior: ['Foto · interior da loja', `Interior da Óticas Gomes ${fullName}`],
    showcase: ['Foto · vitrine', `Vitrine da Óticas Gomes ${fullName}`],
    service: ['Foto · atendimento', `Atendimento na Óticas Gomes ${fullName}`],
  };
  document.querySelectorAll('[data-unit-photo]').forEach((el) => {
    const key = el.dataset.unitPhoto;
    const [label, alt] = photoLabels[key];
    el.innerHTML = unitPhoto(unit.photos[key], label, alt);
  });

  fill(
    'others',
    UNITS.map((item, index) => ({ item, index }))
      .filter(({ item }) => item !== unit)
      .map(
        ({ item, index }) => `
          <li data-reveal>
            <a href="unidade.html?u=${item.slug}">
              <span class="cities__index">${String(index + 1).padStart(2, '0')}</span>
              <span class="cities__name">${unitFullName(item)}</span>
              <span class="cities__meta">${item.tag}</span>
              ${arrow}
            </a>
          </li>`
      )
      .join('')
  );
})();
