(() => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const { whatsappMessage, whatsappNumber } = document.body.dataset;
  document.querySelectorAll('[data-whatsapp]').forEach((link) => (link.href = whatsappUrl(whatsappMessage, whatsappNumber)));

  document.querySelectorAll('.marquee__track').forEach((track) => {
    const list = track.firstElementChild;
    for (let copy = 0; copy < 3; copy++) {
      const clone = list.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.append(clone);
    }
  });

  let wordIndex = 0;

  const splitNode = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        if (child.tagName !== 'BR') splitNode(child);
        return;
      }
      if (child.nodeType !== Node.TEXT_NODE || !child.textContent.trim()) return;

      const fragment = document.createDocumentFragment();
      child.textContent.split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.append(' ');
          return;
        }
        const word = document.createElement('span');
        const inner = document.createElement('span');
        word.className = 'word';
        inner.textContent = part;
        inner.style.setProperty('--i', wordIndex++);
        word.append(inner);
        fragment.append(word);
      });
      child.replaceWith(fragment);
    });
  };

  document.querySelectorAll('[data-split]').forEach((el) => {
    wordIndex = 0;
    splitNode(el);
  });

  const animateCount = (el) => {
    const target = Number(el.dataset.countTo);
    const duration = 1400;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const onVisible = (selector, callback, options) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, options);
    document.querySelectorAll(selector).forEach((el) => observer.observe(el));
  };

  onVisible('[data-reveal], [data-split], .photo', (el) => el.classList.add('is-visible'), {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px',
  });

  if (!reducedMotion) onVisible('[data-count-to]', animateCount, { threshold: 0.6 });
})();
