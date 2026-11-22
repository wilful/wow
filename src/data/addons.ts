// Аддоны гильдии Durotar для World of Warcraft: Forever.
//
// Это данные раздела «Аддоны»: карточки в каталоге (/addons/) и страницы
// аддонов (/addons/<slug>/). Тексты короткие: название, одна строка о чём
// аддон, вкладки и установка.
//
// Чтобы добавить новый аддон, допиши объект в addons: slug станет адресом
// страницы, cover — картинка из public/img (только игровые кадры WoW).

export type AddonIcon = 'scroll' | 'coin' | 'skull' | 'people' | 'info';

export type AddonFeature = {
  icon: AddonIcon;
  title: string;
  text: string;
};

export type AddonShot = {
  src: string;
  alt: string;
  caption: string;
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
  shots?: AddonShot[];
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
        icon: 'coin',
        title: 'Финансы',
        text: 'Золото за сессию, по источникам и по каждому забегу в подземелье.',
      },
      {
        icon: 'skull',
        title: 'Мак’гора',
        text: 'Игроки, убивавшие вас в PvP: класс, звание, место. Есть звук и оповещения.',
      },
      {
        icon: 'people',
        title: 'Рядом',
        text: 'Согильдейцы в сети и в зоне. Свои рядом — с золотой рамкой.',
      },
      {
        icon: 'info',
        title: 'Об аддоне',
        text: 'Версия, команды и справка.',
      },
    ],
    shots: [
      {
        src: 'img/addons/durotar-applications.png',
        alt: 'Вкладка «Заявки» аддона Durotar со списком заявок в гильдию',
        caption: 'Заявки',
      },
      {
        src: 'img/addons/durotar-finance.jpg',
        alt: 'Вкладка «Финансы» аддона Durotar: золото за сессию, источники и забеги',
        caption: 'Финансы',
      },
      {
        src: 'img/addons/durotar-makgora.png',
        alt: 'Вкладка «Мак’гора» аддона Durotar: игроки, убивавшие вас в PvP',
        caption: 'Мак’гора',
      },
      {
        src: 'img/addons/durotar-nearby.jpg',
        alt: 'Вкладка «Рядом» аддона Durotar: согильдейцы в сети и в зоне',
        caption: 'Рядом',
      },
    ],
    install: [
      'Скачай папку Durotar.',
      'Положи её в Interface/AddOns.',
      'В игре набери /durotar.',
    ],
  },
];
