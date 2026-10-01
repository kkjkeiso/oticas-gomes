(() => {
  const renderUnitsList = (list) => {
    list.innerHTML = UNITS.map((unit) => {
      const fullName = unitFullName(unit);

      return `
        <li class="unit" id="${unit.slug}" data-reveal>
          <a class="unit__link" href="${unitUrl(unit)}">
            <div>
              <span class="overline overline--accent">${unit.tag}</span>
              <h2>${fullName}</h2>
              ${unit.address ? `<p>${unit.address}</p>` : '<p class="is-pending">Endereço em breve</p>'}
              ${unit.phone ? `<p>WhatsApp ${unit.phone}</p>` : ''}
              <p class="unit__distance" data-distance="${unit.slug}" hidden></p>
              <span class="link-more">Ver unidade ${icon('arrow')}</span>
            </div>
            <figure class="photo" style="--ratio: 4 / 3">
              <div class="photo__frame">${unitPhoto(unit.photos.facade, 'Foto · fachada', `Fachada da Óticas Gomes ${fullName}`)}</div>
            </figure>
          </a>
        </li>`;
    }).join('');
  };

  const renderCitiesList = (list) => {
    const cities = new Map();
    UNITS.forEach((unit) => cities.set(unit.city, [...(cities.get(unit.city) ?? []), unit]));

    list.innerHTML = [...cities].map(([city, units]) => {
      const single = units.length === 1;
      const meta = single
        ? '1 unidade'
        : `${units.map((unit) => (unit.name === unit.city ? unit.tag : unit.name)).join(' e ')} · ${units.length} unidades`;

      return cityRow({
        name: city,
        meta,
        href: single ? unitUrl(units[0]) : unitsUrl(`#${units[0].slug}`),
      });
    }).join('');
  };

  const renderUnitPage = () => {
    const slug = new URLSearchParams(location.search).get('u');
    const unit = UNITS.find((item) => item.slug === slug);

    if (!unit) {
      location.replace(unitsUrl());
      return;
    }

    const fullName = unitFullName(unit);
    const pending = '<span class="is-pending">Em breve</span>';
    const fill = (key, html) => document.querySelectorAll(`[data-unit="${key}"]`).forEach((el) => (el.innerHTML = html));

    document.title = `${fullName} — Óticas Gomes`;
    document.head.insertAdjacentHTML('beforeend', `<link rel="canonical" href="${unitUrl(unit)}">`);
    document.querySelector('meta[name="description"]').content =
      `${unit.description} Armações receituário, óculos solares e assistência técnica gratuita para clientes.`;
    const message = `Olá! Vim pelo site da Óticas Gomes e gostaria de falar com a unidade ${unit.name === unit.city ? `de ${unit.city}` : `${unit.name} (${unit.city})`}.`;
    const number = phoneDigits(unit.phone ?? SITE.phone);

    document.body.dataset.whatsappMessage = message;
    document.body.dataset.whatsappNumber = number;

    fill('name', unit.name);
    fill('tag', `${unit.tag} · ${unit.city}, RN`);
    fill('description', unit.description);
    fill('city', `${unit.city}, RN`);
    fill('address', unit.address || pending);
    fill('whatsapp-label', unit.phone ? 'WhatsApp da loja' : 'WhatsApp central');
    fill('whatsapp', `<a href="${whatsappUrl(message, number)}" target="_blank" rel="noopener" data-whatsapp>${unit.phone ?? SITE.phone}</a>`);
    fill(
      'map',
      unit.mapEmbed
        ? `<iframe class="photo__media" src="${unit.mapEmbed}" title="Mapa da unidade ${fullName}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
        : '<div class="photo__media photo__empty overline">Mapa · em breve</div>'
    );
    document.querySelector('[data-unit="distance"]').dataset.distance = unit.slug;

    const photoLabels = {
      facade: ['Foto · fachada da unidade', 'Fachada'],
      interior: ['Foto · interior da loja', 'Interior'],
      showcase: ['Foto · vitrine', 'Vitrine'],
      service: ['Foto · atendimento', 'Atendimento'],
    };
    document.querySelectorAll('[data-unit-photo]').forEach((el) => {
      const [label, alt] = photoLabels[el.dataset.unitPhoto];
      el.innerHTML = unitPhoto(unit.photos[el.dataset.unitPhoto], label, `${alt} da Óticas Gomes ${fullName}`);
    });

    fill(
      'others',
      UNITS.filter((item) => item !== unit)
        .map((item) => cityRow({ name: unitFullName(item), meta: item.tag, href: unitUrl(item) }))
        .join('')
    );
  };

  const unitsList = document.querySelector('[data-units-list]');
  const citiesList = document.querySelector('[data-cities-list]');

  if (unitsList) renderUnitsList(unitsList);
  if (citiesList) renderCitiesList(citiesList);
  if (document.querySelector('[data-unit-page]')) renderUnitPage();
})();
