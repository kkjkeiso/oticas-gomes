(() => {
  const POSTS = [
    {
      date: '2025-02-21',
      title: 'Astigmatismo: você pode ter e nem saber!',
      summary: 'Você já sentiu sua visão embaçada, turva ou distorcida? Pode ser astigmatismo, um problema refrativo que afeta milhões de pessoas e muitas vezes passa despercebido.',
    },
    {
      date: '2025-02-17',
      title: 'Materiais de armação: escolha o melhor pra você',
      summary: 'Conheça os diferentes materiais utilizados nas armações de óculos e descubra qual combina mais com seu estilo e conforto.',
    },
    {
      date: '2025-02-14',
      title: 'Os óculos da moda: modelos mais procurados',
      summary: 'Descubra os estilos de óculos que fazem sucesso no momento e veja qual combina melhor com o seu rosto.',
    },
    {
      date: '2025-02-10',
      title: 'Guia completo para escolher suas lentes',
      summary: 'Tipos de lentes, materiais, tratamentos especiais e dicas para melhorar o conforto e a saúde da sua visão.',
    },
  ];

  const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const formatDate = (iso) => {
    const [year, month, day] = iso.split('-');
    return `${Number(day)} ${MONTHS[month - 1]} ${year}`;
  };

  document.querySelectorAll('[data-posts]').forEach((list) => {
    const limit = Number(list.dataset.posts) || POSTS.length;

    list.innerHTML = POSTS.slice(0, limit).map(({ date, title, summary }) => `
      <article class="post" data-reveal>
        <time class="overline overline--accent" datetime="${date}">${formatDate(date)}</time>
        <h3>${title}</h3>
        <p>${summary}</p>
      </article>`).join('');
  });
})();
