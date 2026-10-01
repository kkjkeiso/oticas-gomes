(() => {
  const list = document.querySelector('[data-units-list]');
  const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  list.innerHTML = UNITS.map((unit, index) => {
    const info = [unit.address, unit.phone].filter(Boolean);
    const fullName = unitFullName(unit);

    return `
      <li class="unit" id="${unit.slug}" data-reveal>
        <a class="unit__link" href="unidade.html?u=${unit.slug}">
          <span class="unit__index">${String(index + 1).padStart(2, '0')}</span>
          <div>
            <span class="unit__tag">${unit.tag}</span>
            <h2>${fullName}</h2>
            <div class="unit__info">
              ${info.length ? info.map((line) => `<p>${line}</p>`).join('') : '<p class="unit__pending">Endereço e telefone em breve</p>'}
            </div>
            <span class="unit__more">Ver unidade ${arrow}</span>
          </div>
          <figure class="photo" style="--ratio: 4 / 3">
            <div class="photo__frame">${unitPhoto(unit.photos.facade, 'Foto · fachada', `Fachada da Óticas Gomes ${fullName}`)}</div>
          </figure>
        </a>
      </li>`;
  }).join('');
})();
