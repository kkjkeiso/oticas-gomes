(() => {
  const KEY = 'oticasgomes:theme';
  const COLORS = { light: '#fafafa', dark: '#0a0a0c' };
  const systemDark = matchMedia('(prefers-color-scheme: dark)');

  const apply = () => {
    const theme = localStorage.getItem(KEY) || (systemDark.matches ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COLORS[theme]);
  };

  apply();
  systemDark.addEventListener('change', apply);
  window.oticasApplyTheme = apply;
})();
