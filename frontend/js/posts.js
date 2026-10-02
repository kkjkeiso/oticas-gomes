(() => {
  const POSTS = [
    {
      date: '2026-07-10',
      title: 'Dia Mundial da Saúde Ocular: quase 8 milhões de brasileiros têm cegueira total ou baixa visão severa',
      summary: 'Segundo o IBGE, quase 8 milhões de brasileiros declaram cegueira total ou severa dificuldade de enxergar. A OMS lembra que 80% dos casos de deficiência visual poderiam ser evitados com diagnóstico em estágio inicial — o check-up de rotina continua sendo a melhor prevenção.',
      source: 'Agência Brasil',
      href: 'https://agenciabrasil.ebc.com.br/saude/noticia/2026-07/dia-da-saude-ocular-chama-atencao-para-doencas-que-afetam-visao',
    },
    {
      date: '2026-07-10',
      title: 'Uso de lentes de contato dobra no Brasil e evidencia falhas de higiene',
      summary: 'O número de usuários de lentes de contato passou de 2 para 4 milhões entre 2024 e 2025, segundo a Soblec. Mas 45% dos jovens que usam lentes já tiveram alguma complicação ocular por higienização incorreta — um lembrete de que lente de contato também exige acompanhamento.',
      source: 'ES Hoje',
      href: 'https://eshoje.com.br/saude/2026/07/saude-ocular-numero-de-usuarios-de-lentes-dobra-no-pais-e-acende-alerta-para-cuidados-na-higiene/',
    },
    {
      date: '2026-06-11',
      title: 'Cresce a procura por cirurgias para reduzir a dependência dos óculos',
      summary: 'A busca por cirurgias refrativas para miopia, hipermetropia e astigmatismo aumentou, especialmente entre 25 e 40 anos. Oftalmologistas apontam a evolução das técnicas e das lentes intraoculares como fator decisivo para mais gente buscar independência visual.',
      source: 'NB Notícias',
      href: 'https://www.nbnoticias.com.br/noticia/122274/busca-por-independencia-dos-oculos-cresce',
    },
    {
      date: '2026-04-13',
      title: 'Lentes de alta tecnologia ganham espaço contra o cansaço visual das telas',
      summary: 'Fabricantes como Hoya e Bausch + Lomb lançaram lentes com bloqueio de luz azul e controle de miopia infantil, impulsionadas pela previsão de que metade da população mundial será míope até 2050. A Expo Óptica deste ano teve recorde de visitantes acompanhando a tendência.',
      source: 'Movimento Econômico',
      href: 'https://movimentoeconomico.com.br/tecnologia/2026/04/13/lentes-de-alta-tecnologia-viram-arma-do-setor-optico-contra-o-uso-de-telas/',
    },
  ];

  const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
  const formatDate = (iso) => {
    const [year, month, day] = iso.split('-');
    return `${Number(day)} ${MONTHS[month - 1]} ${year}`;
  };
  const padIndex = (index) => String(index + 1).padStart(2, '0');

  document.querySelectorAll('[data-posts]').forEach((list) => {
    const limit = Number(list.dataset.posts) || POSTS.length;

    list.innerHTML = POSTS.slice(0, limit).map(({ date, title, summary, source, href }, index) => `
      <a class="post" href="${href}" target="_blank" rel="noopener" data-reveal>
        <span class="index">${padIndex(index)}</span>
        <div>
          <time class="overline overline--accent" datetime="${date}">${formatDate(date)}</time>
          <h3>${title}</h3>
          <p>${summary}</p>
          <span class="overline post__source">Fonte: ${source}</span>
        </div>
      </a>`).join('');
  });
})();
