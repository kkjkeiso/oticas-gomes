const SITE = {
  phone: '(84) 9 9404-1034',
  whatsappMessage: 'Olá! Vim pelo site da Óticas Gomes e gostaria de mais informações.',
  email: 'contato@oticasgomesrn.com.br',
  instagram: { handle: '@oticasgomesrn', url: 'https://instagram.com/oticasgomesrn' },
  facebook: { handle: 'Ótica Gomes RN', url: 'https://facebook.com/OticaGomesRn' },
  hours: [
    ['Segunda a sexta', '7h30 às 12h e 14h30 às 17h30'],
    ['Sábado', '7h30 às 12h'],
    ['Domingo', 'Fechado'],
  ],
};

const SITE_ROOT = new URL('../../', document.currentScript.src);

const siteUrl = (path = '') => new URL(path, SITE_ROOT).href;

const phoneDigits = (phone) => `55${phone.replace(/\D/g, '')}`;

const telUrl = (phone) => `tel:+${phoneDigits(phone)}`;

const whatsappUrl = (message = SITE.whatsappMessage, number = phoneDigits(SITE.phone)) =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

const icon = (name) => `<span class="icon icon--${name}" aria-hidden="true"></span>`;
