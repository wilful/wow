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

export type AddonProcessStep = {
  title: string;
  text: string;
};

export type AddonProcess = {
  kicker: string;
  title: string;
  lead: string;
  steps: AddonProcessStep[];
  meaning: string;
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
  process?: AddonProcess;
  install: string[];
};

export const addons: Addon[] = [
  {
    slug: 'durotar',
    name: 'Durotar',
    title: 'Дуротар',
    tagline: 'Заявки, золото, Мак’гора и призыв «В бой!»',
    summary:
      'Окно с вкладками для офицеров гильдии: заявки, финансы, список PvP-врагов и сбор группы на Мак’гору.',
    version: '0.10.0',
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
        text: 'Кто убивал вас в PvP: класс, число побед, зона, координаты и красный крестик на карте. «Око за око» подсветит врага при встрече.',
      },
      {
        icon: 'people',
        title: 'Рядом',
        text: 'Согильдейцы в сети и в зоне. Кнопка «В бой!» собирает группу и шлёт призыв с именем цели.',
      },
      {
        icon: 'people',
        title: 'Отказники',
        text: 'Кто отказался от призыва — отдельный список. Крестик возвращает игрока в очередь.',
      },
      {
        icon: 'info',
        title: 'Об аддоне',
        text: 'Версия, команды и справка.',
      },
    ],
    process: {
      kicker: 'Кодекс Мак’горы',
      title: 'Как это работает',
      lead:
        'Мак’гора в Durotar — не просто список обид. Это короткая цепочка: запомнить, кто вас убил, ' +
        'собрать своих и ответить. Всё начинается с одной смерти в PvP и заканчивается группой, ' +
        'которая идёт за обидчиком.',
      steps: [
        {
          title: 'Смерть запоминается',
          text:
            'Аддон ловит PvP-смерть и сохраняет имя, класс, число побед, зону и координаты. ' +
            'На мировой карте появляется красный крестик — место, где вас убили.',
        },
        {
          title: '«Око за око»',
          text:
            'У каждого врага в «Мак’горе» есть переключатель. Пока он включён, при встрече аддон ' +
            'подсветит неймплейт красной рамкой, покажет баннер, напишет в чат и подаст звук.',
        },
        {
          title: 'Призыв «В бой!»',
          text:
            'На вкладке «Рядом» кнопка собирает группу из согильдейцев — сначала самых ' +
            'высокоуровневых. Каждому уходит приглашение и шёпот с именем цели: того, кто нарушил ' +
            'правила поединка.',
        },
        {
          title: 'Отказ — не приговор',
          text:
            'Кто отказался, попадает в «Отказники» и больше не получает приглашений. Вернуть его ' +
            'можно одним крестиком — и следующий призыв снова придёт.',
        },
      ],
      meaning:
        'Мак’гора — старый обычай чести: обиду не забывают, но и не мстят в одиночку. Durotar ' +
        'превращает PvP-смерть в понятный ритуал: запомнить, позвать своих, найти место и ответить. ' +
        'Участие добровольное — кодекс держится на тех, кто пришёл.',
    },
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
