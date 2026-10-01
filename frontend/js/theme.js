(() => {
  const KEY = 'oticasgomes:theme';
  const systemDark = matchMedia('(prefers-color-scheme: dark)');
  const apply = () => {
    document.documentElement.dataset.theme = localStorage.getItem(KEY) || (systemDark.matches ? 'dark' : 'light');
  };

  apply();
  systemDark.addEventListener('change', apply);
})();
