// Аддоны гильдии Durotar для World of Warcraft: Forever.
//
// Это данные раздела «Аддоны»: карточки в каталоге (/addons/) и страницы
// аддонов (/addons/<slug>/). Тексты короткие: название, одна строка о чём
// аддон, вкладки и установка.
//
// Чтобы добавить новый аддон, допиши объект в addons: slug станет адресом
// страницы, cover — картинка из public/img (только игровые кадры WoW).

export type AddonIcon = 'scroll' | 'people' | 'coin' | 'info';

export type AddonFeature = {
  icon: AddonIcon;
  title: string;
  text: string;
};

export type Addon = {
  slug: string;
  name: string;
  title: string;
  tagline: string;
  summary: string;
  version: string;
  folder: string;
  clients: string[];
  cover: { src: string; alt: string; caption: string };
  features: AddonFeature[];
  install: string[];
};

export const addons: Addon[] = [
  {
    slug: 'durotar',
    name: 'Durotar',
    title: 'Дуротар',
    tagline: 'Заявки, согильдейцы и золото — в одном окне',
    summary: 'Окно с вкладками для офицеров гильдии.',
    version: '0.9.0',
    folder: 'Durotar',
    clients: ['WoW: Forever', 'TBC Classic Anniversary'],
    cover: {
      src: 'img/hero-durotar.jpg',
      alt: 'Пустыня Дуротар в игре World of Warcraft',
      caption: 'Дуротар · warcraft.wiki.gg',
    },
    features: [
      {
        icon: 'scroll',
        title: 'Заявки',
        text: 'Заявки с сайта: класс, роль, уровень. Принять или отклонить.',
      },
      {
        icon: 'people',
        title: 'Рядом',
        text: 'Согильдейцы в сети и в зоне. Свои рядом — с золотой рамкой.',
      },
      {
        icon: 'coin',
        title: 'Финансы',
        text: 'Золото за сессию, по источникам и по каждому забегу в подземелье.',
      },
      {
        icon: 'info',
        title: 'Об аддоне',
        text: 'Версия, команды и справка.',
      },
    ],
    install: [
      'Скачай папку Durotar.',
      'Положи её в Interface/AddOns.',
      'В игре набери /durotar.',
    ],
  },
];
