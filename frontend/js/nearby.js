(() => {
  const triggers = document.querySelectorAll('[data-nearby]');

  if (!('geolocation' in navigator) || !isSecureContext) {
    triggers.forEach((trigger) => (trigger.hidden = true));
    return;
  }

  const DISMISSED = 'oticasgomes:nearby-dismissed';

  const toRad = (deg) => (deg * Math.PI) / 180;
  const distanceKm = ([lat1, lng1], [lat2, lng2]) => {
    const a =
      Math.sin(toRad(lat2 - lat1) / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(toRad(lng2 - lng1) / 2) ** 2;
    return 6371 * 2 * Math.asin(Math.sqrt(a));
  };
  const formatKm = (km) => (km < 1 ? 'menos de 1 km' : `${Math.round(km)} km`);

  const locate = () =>
    new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => resolve([coords.latitude, coords.longitude]),
        reject,
        { timeout: 10000, maximumAge: 600000 }
      )
    );

  const rank = (origin) =>
    UNITS.map((unit) => ({ unit, km: distanceKm(origin, unit.coords) })).sort((a, b) => a.km - b.km);

  const showDistances = (ranked) =>
    ranked.forEach(({ unit, km }) =>
      document.querySelectorAll(`[data-distance="${unit.slug}"]`).forEach((el) => {
        el.textContent = `${formatKm(km)} de você, em linha reta`;
        el.hidden = false;
        el.closest('[hidden]')?.removeAttribute('hidden');
      })
    );

  const banner = document.createElement('div');
  banner.className = 'nearby';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-label', 'Unidade mais perto de você');
  document.body.append(banner);

  const closeButton = (label) => `<button class="btn btn--ghost btn--sm" data-action="close">${label}</button>`;
  const render = (text, actions = '') => {
    banner.innerHTML = `<p>${text}</p><div class="nearby__actions">${actions}</div>`;
    banner.classList.add('is-visible');
  };
  const close = () => {
    localStorage.setItem(DISMISSED, '1');
    banner.classList.remove('is-visible');
  };

  const ask = () =>
    render(
      'Quer saber qual unidade da Óticas Gomes fica mais perto de você?<small>Sua localização é usada só no seu navegador e não é enviada a ninguém.</small>',
      `<button class="btn btn--primary btn--sm" data-action="locate">Usar minha localização</button>${closeButton('Agora não')}`
    );

  const find = async () => {
    render('Procurando a unidade mais perto…');
    try {
      const ranked = rank(await locate());
      const { unit, km } = ranked[0];
      showDistances(ranked);
      localStorage.setItem(DISMISSED, '1');
      render(
        `A unidade mais perto de você é <strong>${unitFullName(unit)}</strong>, a cerca de ${formatKm(km)} em linha reta.`,
        `<a class="btn btn--primary btn--sm" href="${unitUrl(unit)}">Ver unidade ${icon('arrow')}</a>${closeButton('Fechar')}`
      );
    } catch {
      render(
        'Não foi possível acessar sua localização. Você pode ver todas as unidades na lista.',
        `<a class="btn btn--primary btn--sm" href="${unitsUrl()}">Ver unidades</a>${closeButton('Fechar')}`
      );
    }
  };

  banner.addEventListener('click', (e) => {
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'locate') find();
    if (action === 'close') close();
  });
  triggers.forEach((trigger) => trigger.addEventListener('click', find));

  const askLater = () => {
    if (!localStorage.getItem(DISMISSED)) setTimeout(ask, 1200);
  };

  if (!navigator.permissions) {
    askLater();
    return;
  }

  navigator.permissions
    .query({ name: 'geolocation' })
    .then(({ state }) => {
      if (state === 'granted') locate().then((origin) => showDistances(rank(origin)), () => {});
      else if (state === 'prompt') askLater();
    })
    .catch(askLater);
})();
