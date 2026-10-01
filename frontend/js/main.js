(() => {
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

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('[data-reveal], [data-split], .photo').forEach((el) => revealObserver.observe(el));
})();
