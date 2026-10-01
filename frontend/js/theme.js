(() => {
  const saved = localStorage.getItem('oticasgomes:theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();
