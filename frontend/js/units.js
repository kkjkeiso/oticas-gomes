const UNITS = [
  {
    slug: 'apodi',
    tag: 'Sede',
    name: 'Apodi',
    city: 'Apodi',
    description: 'A sede da Óticas Gomes, em Apodi.',
    address: 'R. Antônio Lopes Filho, 133',
    phone: '(84) 9 9404-1034',
    coords: [-5.6639, -37.7989],
  },
  {
    slug: 'apodi-soledade',
    tag: 'Unidade',
    name: 'Distrito de Soledade',
    city: 'Apodi',
    description: 'A unidade da Óticas Gomes no Distrito de Soledade, em Apodi.',
    address: null,
    phone: '(84) 9 9611-1289',
    coords: [-5.5983, -37.8299],
  },
  {
    slug: 'felipe-guerra',
    tag: 'Unidade',
    name: 'Felipe Guerra',
    city: 'Felipe Guerra',
    description: 'A unidade da Óticas Gomes em Felipe Guerra.',
    address: null,
    phone: '(84) 9 9804-0353',
    coords: [-5.6028, -37.6889],
  },
  {
    slug: 'severiano-melo',
    tag: 'Unidade',
    name: 'Severiano Melo',
    city: 'Severiano Melo',
    description: 'A unidade da Óticas Gomes em Severiano Melo.',
    address: null,
    phone: '(84) 9 9954-5160',
    coords: [-5.7769, -37.9578],
  },
  {
    slug: 'governador-dix-sept-rosado',
    tag: 'Unidade',
    name: 'Governador Dix-Sept Rosado',
    city: 'Governador Dix-Sept Rosado',
    description: 'A unidade da Óticas Gomes em Governador Dix-Sept Rosado.',
    address: null,
    phone: '(84) 9 9931-5631',
    coords: [-5.4589, -37.5208],
  },
  {
    slug: 'barauna',
    tag: 'Unidade',
    name: 'Baraúna',
    city: 'Baraúna',
    description: 'A unidade da Óticas Gomes em Baraúna.',
    address: null,
    phone: '(84) 9 9234-4054',
    coords: [-5.0800, -37.6169],
  },
  {
    slug: 'natal',
    tag: 'Unidade',
    name: 'Natal',
    city: 'Natal',
    description: 'A unidade da Óticas Gomes em Natal.',
    address: null,
    phone: null,
    coords: [-5.7950, -35.2090],
  },
];

const unitFullName = (unit) => (unit.name === unit.city ? unit.name : `${unit.city} · ${unit.name}`);

const unitUrl = (unit) => siteUrl(`loja/?u=${unit.slug}`);

const unitsUrl = (hash = '') => siteUrl(`unidades/${hash}`);

const padIndex = (index) => String(index + 1).padStart(2, '0');

const cityRow = ({ name, meta, href }) => `
  <li data-reveal>
    <a href="${href}">
      <span class="cities__name">${name}</span>
      <span class="cities__meta">${meta}</span>
      ${icon('arrow')}
    </a>
  </li>`;
