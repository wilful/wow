// Объекты для полноэкранной карты Азерота эпохи World of Warcraft: Forever.
// Координаты — проценты от игровой карты (0–100 по ширине и высоте).
// Карты: public/img/map/{azeroth,eastern-kingdoms,kalimdor}.jpg (2004×1336).

export type MapRegion = 'world' | 'ek' | 'kalimdor';

export type MapCategory =
  | 'zone'
  | 'city'
  | 'dungeon'
  | 'raid'
  | 'pvp'
  | 'boss'
  | 'transport'
  | 'geo';

export type GeoKind = 'lake' | 'pass' | 'landmark' | 'river' | 'road' | 'mountain';

export type Faction = 'alliance' | 'horde' | 'neutral';

export type MapPoint = {
  id: string;
  name: string;
  region: MapRegion;
  x: number;
  y: number;
  category: MapCategory;
  geoKind?: GeoKind;
  level?: string;
  faction?: Faction;
  isNew?: boolean;
  soon?: string;
  desc: string;
};

export const categories: {
  id: MapCategory;
  label: string;
  short: string;
  color: string;
}[] = [
  { id: 'zone', label: 'Зоны', short: 'Зоны', color: '#f0d58a' },
  { id: 'city', label: 'Города', short: 'Города', color: '#ffd15c' },
  { id: 'dungeon', label: 'Подземелья', short: 'Подземелья', color: '#e79a45' },
  { id: 'raid', label: 'Рейды', short: 'Рейды', color: '#e1534c' },
  { id: 'pvp', label: 'PvP', short: 'PvP', color: '#b189e8' },
  { id: 'boss', label: 'Боссы', short: 'Боссы', color: '#7fd49a' },
  { id: 'transport', label: 'Транспорт', short: 'Транспорт', color: '#77c5e8' },
  { id: 'geo', label: 'Горы, озёра, перевалы', short: 'География', color: '#d8c9a5' },
];

type PointInput = Omit<MapPoint, 'id' | 'region' | 'x' | 'y' | 'desc' | 'category'> & {
  id: string;
  x: number;
  y: number;
  desc: string;
  category?: MapCategory;
};

const ek = (p: PointInput): MapPoint => ({
  ...p,
  category: p.category ?? 'zone',
  region: 'ek',
  faction: p.faction ?? 'neutral',
});
const kal = (p: PointInput): MapPoint => ({
  ...p,
  category: p.category ?? 'zone',
  region: 'kalimdor',
  faction: p.faction ?? 'neutral',
});
const world = (p: PointInput): MapPoint => ({
  ...p,
  category: p.category ?? 'zone',
  region: 'world',
  faction: p.faction ?? 'neutral',
});

const zoneIn = (region: MapRegion) => (p: PointInput): MapPoint => ({
  ...p,
  category: 'zone',
  region,
  faction: p.faction ?? 'neutral',
});

const zone = zoneIn('ek');
const zoneKal = zoneIn('kalimdor');

// ── Восточные королевства ────────────────────────────────────────────────────

const easternKingdoms: MapPoint[] = [
  zone({ id: 'epl', name: 'Восточные Чумные земли', x: 57, y: 13, level: '53–60', desc: 'Стратхольм, Некроситет и крепости Алого ордена. Здесь же висит Наксрамас.' }),
  zone({ id: 'wpl', name: 'Западные Чумные земли', x: 50, y: 19.5, level: '51–58', desc: 'Андорал, остров Каэр Дарроу и путь к Некроситету.' }),
  zone({ id: 'tirisfal', name: 'Тирисфальские леса', x: 44, y: 25.5, level: '1–10', faction: 'horde', desc: 'Стартовая зона нежити, Подгород и новый квартал «Руины Лордерона».' }),
  zone({ id: 'silverpine', name: 'Серебряный бор', x: 35, y: 30.5, level: '10–20', faction: 'horde', desc: 'Крепость Тёмного Клыка, Гилнеас и мрачные сосны.' }),
  zone({ id: 'hillsbrad', name: 'Предгорья Хилсбрада', x: 38.5, y: 37, level: '20–30', desc: 'Южнобережье, Таран-Милл и вечная борьба за фермы.' }),
  zone({ id: 'alterac', name: 'Альтеракские горы', x: 42.5, y: 30.8, level: '30–40', desc: 'Снежные перевалы, руины Альтерака и Даларан над озером.' }),
  zone({ id: 'hinterlands', name: 'Внутренние земли', x: 52.5, y: 30.5, level: '40–50', desc: 'Джунгли, грифоны Доланы и логово дракона Таэрара.' }),
  zone({ id: 'arathi', name: 'Нагорье Арати', x: 47.5, y: 37.5, level: '30–40', desc: 'Стромгард, поле боя «Низина Арати» и красные скалы.' }),
  zone({ id: 'wetlands', name: 'Болотина', x: 40.5, y: 42.5, level: '20–30', desc: 'Расширенная в Forever зона: новые задания и подземелье «Раскопки».' }),
  zone({ id: 'lochmodan', name: 'Лок Модан', x: 46.5, y: 44.5, level: '10–20', faction: 'alliance', desc: 'Долина с дамбой, озером Лок и входом в Тлеющее ущелье.' }),
  zone({ id: 'dunmorogh', name: 'Дун Морог', x: 43.5, y: 50, level: '1–10', faction: 'alliance', desc: 'Снежная родина дворфов и гномов: Стальгорн, Гномреган и Чертог Танов.' }),
  zone({ id: 'badlands', name: 'Бесплодные земли', x: 51.5, y: 48.5, level: '35–45', desc: 'Каньоны, раскопки Ульдамана и путь в Риверглейдс.' }),
  zone({ id: 'searing', name: 'Тлеющее ущелье', x: 45.5, y: 54.5, level: '45–50', desc: 'Дымная расщелина между Лок Моданом и Пылающими степями.' }),
  zone({ id: 'burning', name: 'Пылающие степи', x: 51.5, y: 56.5, level: '50–58', desc: 'Лавовые поля у Чёрной горы и дорога в Риверглейдс.' }),
  zone({ id: 'elwynn', name: 'Элвиннский лес', x: 43.5, y: 61.5, level: '1–10', faction: 'alliance', desc: 'Штормград, Золотая дорога и зелёные поля людей.' }),
  zone({ id: 'westfall', name: 'Западный край', x: 38.5, y: 66.5, level: '10–20', faction: 'alliance', desc: 'Пшеничные поля, Сторожевой холм и Мёртвые копи.' }),
  zone({ id: 'duskwood', name: 'Сумеречный лес', x: 46.5, y: 68.5, level: '18–30', faction: 'alliance', desc: 'Тёмный лес, кладбища и дракон Эмерисс.' }),
  zone({ id: 'redridge', name: 'Красногорье', x: 51.5, y: 63.5, level: '15–25', faction: 'alliance', desc: 'Горное озеро, Приозёрный городок и перевал в Риверглейдс.' }),
  zone({ id: 'swamp', name: 'Болото Печали', x: 55.5, y: 69.5, level: '35–45', desc: 'Топи у Тёмного портала и Затонувший храм.' }),
  zone({ id: 'deadwind', name: 'Перевал Мертвого Ветра', x: 51.5, y: 71.5, level: '45–55', desc: 'Ущелье между Сумеречным лесом и Выжженными землями.' }),
  zone({ id: 'blasted', name: 'Выжженные земли', x: 55.5, y: 77.5, level: '45–55', desc: 'Пустошь у Тёмного портала, демоны и Лорд Каззак.' }),
  zone({ id: 'stv', name: 'Тернистая долина', x: 47.5, y: 80.5, level: '30–45', desc: 'Джунгли троллей, Пиратская Бухта и Зул\'Гуруб.' }),
  zone({ id: 'riverglades', name: 'Риверглейдс', x: 54, y: 59.5, level: '35–45', isNew: true, desc: 'Новая зона Forever: почти 200 квестов, порт Пороховой Фитиль и крепость Крол\'док.' }),

  // города и транспорт
  ek({ id: 'stormwind', name: 'Штормград', x: 43.8, y: 62, category: 'city', faction: 'alliance', desc: 'Столица Альянса и главный город людей.' }),
  ek({ id: 'ironforge', name: 'Стальгорн', x: 43.8, y: 50.8, category: 'city', faction: 'alliance', desc: 'Подземная столица дворфов.' }),
  ek({ id: 'undercity', name: 'Подгород', x: 44.8, y: 25.8, category: 'city', faction: 'horde', desc: 'Столица Отрекшихся под руинами Лордерона.' }),
  ek({ id: 'swharbor', name: 'Штормградская гавань', x: 42.8, y: 64.2, category: 'transport', faction: 'alliance', desc: 'Новый паром Forever: Штормград — Аубердин.' }),
  ek({ id: 'menethil', name: 'Гавань Менетил', x: 39.6, y: 41.6, category: 'transport', faction: 'alliance', desc: 'Порт в Болотине. Маршрут Менетил — Южнобережье — Аубердин.' }),
  ek({ id: 'bootybay', name: 'Пиратская Бухта', x: 48.6, y: 89.6, category: 'transport', desc: 'Гоблинский порт на юге Тернистой долины.' }),
  ek({ id: 'powderfuse', name: 'Порт Пороховой Фитиль', x: 56, y: 62.6, category: 'transport', isNew: true, desc: 'Новый нейтральный порт Риверглейдса; корабль из Танариса.' }),
  ek({ id: 'gromgol', name: 'Гром\'гол', x: 48.2, y: 76.2, category: 'transport', faction: 'horde', desc: 'Лагерь Орды в Тернистой долине.' }),
  ek({ id: 'zepp_uc', name: 'Дирижабли Подгорода', x: 45.8, y: 24.2, category: 'transport', faction: 'horde', desc: 'Дирижабли в Оргриммар и Гром\'гол.' }),
  ek({ id: 'deeprun', name: 'Подземный трамвай', x: 43.6, y: 55.6, category: 'transport', faction: 'alliance', desc: 'Подземная линия Стальгорн — Штормград.' }),
  ek({ id: 'skyboat_dalaran', name: 'Небесный причал у Даларана', x: 40.7, y: 32.4, category: 'transport', isNew: true, desc: 'Небесный корабль с Зефраса к северной стороне Даларана.' }),

  // подземелья
  ek({ id: 'deadmines', name: 'Мёртвые копи', x: 36.5, y: 67.8, category: 'dungeon', level: '17–26', desc: 'Логово Братства Справедливости в Западном крае.' }),
  ek({ id: 'stockade', name: 'Тюрьма', x: 44.4, y: 61.3, category: 'dungeon', level: '24–32', desc: 'Тюрьма под Штормградом.' }),
  ek({ id: 'shadowfang', name: 'Крепость Тёмного Клыка', x: 35, y: 30, category: 'dungeon', level: '22–30', desc: 'Замок Аругала в Серебряном бору.' }),
  ek({ id: 'gnomeregan', name: 'Гномреган', x: 44, y: 51.8, category: 'dungeon', level: '29–38', desc: 'Заражённая столица гномов.' }),
  ek({ id: 'thanes', name: 'Чертог Танов', x: 43, y: 50.2, category: 'dungeon', level: '13–18', isNew: true, desc: 'Новое подземелье Forever под Стальгорном.' }),
  ek({ id: 'lordaeron', name: 'Руины Лордерона', x: 45.5, y: 24.6, category: 'dungeon', level: '15–20', isNew: true, desc: 'Новое подземелье Forever над Подгородом.' }),
  ek({ id: 'scarlet', name: 'Монастырь Алого ордена', x: 46.3, y: 27.6, category: 'dungeon', level: '30–46', desc: 'Четыре крыла Алого ордена в Тирисфале.' }),
  ek({ id: 'excavation', name: 'Раскопки: Болотина', x: 39.5, y: 41.5, category: 'dungeon', level: '26–31', isNew: true, desc: 'Новое подземелье Forever над раскопками Уэлгара.' }),
  ek({ id: 'dalaran', name: 'Город Даларан', x: 41, y: 33, category: 'dungeon', level: '28–33', isNew: true, desc: 'Новое подземелье Forever: город чар и аркановых конструктов.' }),
  ek({ id: 'drownedcity', name: 'Затонувший город', x: 52, y: 84.5, category: 'dungeon', level: '35–40', isNew: true, desc: 'Новое подземелье у берегов Тернистой долины.' }),
  ek({ id: 'kroldok', name: 'Крепость Крол\'док', x: 54.4, y: 60.8, category: 'dungeon', level: '40–45', isNew: true, desc: 'Новое подземелье Forever: открытая крепость огров в Риверглейдсе.' }),
  ek({ id: 'uldaman', name: 'Ульдаман', x: 50.5, y: 50, category: 'dungeon', level: '41–51', desc: 'Титанические залы в Бесплодных землях.' }),
  ek({ id: 'brd', name: 'Глубины Чёрной горы', x: 46.2, y: 55.6, category: 'dungeon', level: '52–60', desc: 'Подземный город тёмных дворфов.' }),
  ek({ id: 'brs', name: 'Пик Чёрной горы', x: 47.6, y: 54.8, category: 'dungeon', level: '55–60', desc: 'Верхний и нижний ярусы крепости.' }),
  ek({ id: 'scholomance', name: 'Некроситет', x: 49.2, y: 21.2, category: 'dungeon', level: '58–60', desc: 'Школа некромантии на Каэр Дарроу.' }),
  ek({ id: 'stratholme', name: 'Стратхольм', x: 57.2, y: 17.6, category: 'dungeon', level: '58–60', desc: 'Мёртвый город в Восточных Чумных землях.' }),
  ek({ id: 'sunkentemple', name: 'Затонувший храм', x: 54.8, y: 70.6, category: 'dungeon', level: '50–60', desc: 'Храм Атал\'Хаккара в Болоте Печали.' }),

  // рейды и PvP
  ek({ id: 'mc', name: 'Огненные Недра', x: 45.8, y: 56.4, category: 'raid', level: '40', desc: 'Рейд на 40 человек в сердце Чёрной горы.' }),
  ek({ id: 'bwl', name: 'Логово Крыла Тьмы', x: 48, y: 54.4, category: 'raid', level: '40', desc: 'Рейд на 40 человек: Нефариан.' }),
  ek({ id: 'naxx', name: 'Наксрамас', x: 55.4, y: 16.4, category: 'raid', level: '40', desc: 'Летающая цитадель Плети.' }),
  ek({ id: 'zg', name: 'Зул\'Гуруб', x: 48.2, y: 77.6, category: 'raid', level: '20', desc: 'Рейд на 20 человек в Тернистой долине.' }),
  ek({ id: 'ab', name: 'Низина Арати', x: 48, y: 39.6, category: 'pvp', level: '20–60', desc: 'Поле боя 15 на 15.' }),
  ek({ id: 'av', name: 'Альтеракская долина', x: 39.6, y: 34.6, category: 'pvp', level: '51–60', desc: 'Поле боя 40 на 40.' }),

  // боссы
  ek({ id: 'kazzak', name: 'Лорд Каззак', x: 55.6, y: 76.8, category: 'boss', level: '60', desc: 'Мировой босс-демон в Выжженных землях.' }),
  ek({ id: 'taerar', name: 'Таэрар', x: 52.6, y: 31.6, category: 'boss', level: '60', desc: 'Дракон Кошмара во Внутренних землях.' }),
  ek({ id: 'emeriss', name: 'Эмерисс', x: 46.6, y: 69.6, category: 'boss', level: '60', desc: 'Дракон Кошмара в Сумеречном лесу.' }),

  // география
  ek({ id: 'geo_lordaemere', name: 'Озеро Лордамер', x: 39.5, y: 32, category: 'geo', geoKind: 'lake', desc: 'Большое озеро между Тирисфалем, Серебряным бором и Альтераком.' }),
  ek({ id: 'geo_darrowmere', name: 'Озеро Дарроумир', x: 50.5, y: 21.5, category: 'geo', geoKind: 'lake', desc: 'Озеро с островом Каэр Дарроу в Западных Чумных землях.' }),
  ek({ id: 'geo_everstill', name: 'Озеро Эверстилл', x: 53, y: 65, category: 'geo', geoKind: 'lake', desc: 'Горное озеро у Приозёрного городка в Красногорье.' }),
  ek({ id: 'geo_nazferiti', name: 'Озеро Назферити', x: 46.5, y: 78, category: 'geo', geoKind: 'lake', desc: 'Озеро в северной Тернистой долине.' }),
  ek({ id: 'geo_thandol', name: 'Тандольский мост', x: 45.5, y: 41.5, category: 'geo', geoKind: 'road', desc: 'Мост через реку на границе Болотины и Арати.' }),
  ek({ id: 'geo_blackrock', name: 'Перевал Блэкрок', x: 54, y: 63, category: 'geo', geoKind: 'pass', desc: 'Горный проход из Красногорья в Риверглейдс.' }),
  ek({ id: 'geo_greymane', name: 'Стена Греймейна', x: 30.5, y: 36.5, category: 'geo', geoKind: 'landmark', desc: 'Огромная стена, отделяющая Гилнеас от Серебряного бора.' }),
  ek({ id: 'geo_darkportal', name: 'Тёмный портал', x: 56.5, y: 77.5, category: 'geo', geoKind: 'landmark', desc: 'Портал в Выжженных землях.' }),
  ek({ id: 'geo_caerdarrow', name: 'Остров Каэр Дарроу', x: 49.5, y: 21.5, category: 'geo', geoKind: 'landmark', desc: 'Остров на озере Дарроумир, школа Некроситета.' }),
];

// ── Калимдор ─────────────────────────────────────────────────────────────────

const kalimdor: MapPoint[] = [
  zoneKal({ id: 'teldrassil', name: 'Тельдрассил', x: 41, y: 8.5, level: '1–10', faction: 'alliance', desc: 'Мировое древо и стартовая зона ночных эльфов.' }),
  zoneKal({ id: 'darkshore', name: 'Тёмные берега', x: 43.5, y: 17.5, level: '10–20', faction: 'alliance', desc: 'Туманное побережье и Аубердин.' }),
  zoneKal({ id: 'moonglade', name: 'Лунная поляна', x: 49, y: 15.5, level: '50–55', desc: 'Святилище друидов в центре Калимдора.' }),
  zoneKal({ id: 'felwood', name: 'Осквернённый лес', x: 47, y: 20.5, level: '45–55', desc: 'Испорченный лес к югу от Лунной поляны.' }),
  zoneKal({ id: 'winterspring', name: 'Зимние Ключи', x: 52.5, y: 14.5, level: '50–60', desc: 'Снежные горы, Круговзор и дорога в Хиджал.' }),
  zoneKal({ id: 'hyjal', name: 'Гора Хиджал', x: 56.5, y: 19.5, level: '55–60', isNew: true, desc: 'Новая зона Forever: лес после битвы с Архимондом.' }),
  zoneKal({ id: 'azshara', name: 'Азшара', x: 60.5, y: 25.5, level: '45–55', desc: 'Осенний берег, Азурегос и крепость Чёрной Пасти.' }),
  zoneKal({ id: 'ashenvale', name: 'Ясеневый лес', x: 47, y: 24.5, level: '18–30', desc: 'Древний лес ночных эльфов и Ущелье Песни Войны.' }),
  zoneKal({ id: 'durotar', name: 'Дуротар', x: 59.5, y: 30.5, level: '1–10', faction: 'horde', desc: 'Красная пустыня орков, Оргриммар и Разлом Ярости.' }),
  zoneKal({ id: 'barrens', name: 'Степи', x: 50.5, y: 35.5, level: '10–25', faction: 'horde', desc: 'Саванна центрального Калимдора и Кабестан.' }),
  zoneKal({ id: 'stonetalon', name: 'Когтистые горы', x: 44.5, y: 32.5, level: '15–27', desc: 'Горный край между Ясеневым лесом и Степями.' }),
  zoneKal({ id: 'mulgore', name: 'Мулгор', x: 47.5, y: 45.5, level: '1–10', faction: 'horde', desc: 'Зелёные равнины тауренов и Громовой Утёс.' }),
  zoneKal({ id: 'desolace', name: 'Пустоши', x: 40.5, y: 44.5, level: '30–40', desc: 'Серые земли кентавров и дорога в Шен\'дралас.' }),
  zoneKal({ id: 'shendralas', name: 'Шен\'дралас', x: 44, y: 51.5, isNew: true, desc: 'Новая зона Forever к югу от Пустошей.' }),
  zoneKal({ id: 'dustwallow', name: 'Пылевые топи', x: 57.5, y: 43.5, level: '35–45', desc: 'Болота Терамора, Ониксия и тюрьма Алказ.' }),
  zoneKal({ id: 'feralas', name: 'Фералас', x: 40.5, y: 55.5, level: '40–50', desc: 'Тропические леса и Забытый город.' }),
  zoneKal({ id: 'needles', name: 'Тысяча Игл', x: 50.5, y: 54.5, level: '25–35', desc: 'Каньоны и шпили скал.' }),
  zoneKal({ id: 'tanaris', name: 'Танарис', x: 55.5, y: 62.5, level: '40–50', desc: 'Пустыня, Прибамбасск и Зул\'Фаррак.' }),
  zoneKal({ id: 'ungoro', name: 'Кратер Ун\'Горо', x: 47.5, y: 65.5, level: '48–55', desc: 'Доисторический кратер и Терраса Созидателя.' }),
  zoneKal({ id: 'silithus', name: 'Силитус', x: 43.5, y: 77.5, level: '55–60', desc: 'Пустыня Ан\'Киража и Оплот Кенария.' }),

  // города и транспорт
  kal({ id: 'darnassus', name: 'Дарнас', x: 41, y: 9, category: 'city', faction: 'alliance', desc: 'Столица ночных эльфов на Тельдрассиле.' }),
  kal({ id: 'orgrimmar', name: 'Оргриммар', x: 59.6, y: 30, category: 'city', faction: 'horde', desc: 'Столица Орды в Дуротаре.' }),
  kal({ id: 'thunderbluff', name: 'Громовой Утёс', x: 47.6, y: 46.2, category: 'city', faction: 'horde', desc: 'Столица тауренов на плато в Мулгоре.' }),
  kal({ id: 'ratchet', name: 'Кабестан', x: 51.6, y: 38.6, category: 'transport', desc: 'Порт в Степях, корабль в Пиратскую Бухту.' }),
  kal({ id: 'auberdine', name: 'Аубердин', x: 43.6, y: 17.6, category: 'transport', faction: 'alliance', desc: 'Порт Тёмных берегов и новые маршруты Forever.' }),
  kal({ id: 'theramore', name: 'Терамор', x: 57.6, y: 48.6, category: 'transport', faction: 'alliance', desc: 'Крепость и порт в Пылевых топях.' }),
  kal({ id: 'gadgetzan', name: 'Прибамбасск', x: 54.6, y: 63.6, category: 'transport', desc: 'Гоблинский город в Танарисе.' }),
  kal({ id: 'everlook', name: 'Круговзор', x: 51, y: 17.4, category: 'transport', desc: 'Гоблинский город в Зимних Ключах.' }),
  kal({ id: 'steamwheedle', name: 'Порт Хитрой Шестерёнки', x: 54.6, y: 60.6, category: 'transport', desc: 'Порт Танариса; корабль в Порт Пороховой Фитиль.' }),
  kal({ id: 'cenarion', name: 'Оплот Кенария', x: 43.6, y: 75.6, category: 'transport', desc: 'Форпост Круга Кенария в Силитусе.' }),
  kal({ id: 'zepp_org', name: 'Дирижабли Оргриммара', x: 59.6, y: 28.6, category: 'transport', faction: 'horde', desc: 'Дирижабли в Подгород и Гром\'гол.' }),
  kal({ id: 'skyboat', name: 'Небесный корабль у Громового Утёса', x: 47.2, y: 44.2, category: 'transport', isNew: true, desc: 'Небесный корабль с Зефраса к скалам севернее Громового Утёса.' }),

  // подземелья
  kal({ id: 'rfc', name: 'Разлом Ярости', x: 59.2, y: 31, category: 'dungeon', level: '13–18', desc: 'Подземелье под Оргриммаром.' }),
  kal({ id: 'wc', name: 'Пещеры Стенаний', x: 50.6, y: 34.6, category: 'dungeon', level: '17–24', desc: 'Пещеры друидов в Степях.' }),
  kal({ id: 'bfd', name: 'Глубины Чёрной Топи', x: 47.6, y: 22.6, category: 'dungeon', level: '24–32', desc: 'Затопленный храм Элуны в Ясеневом лесу.' }),
  kal({ id: 'rfk', name: 'Лабиринты Иглошкурых', x: 49.6, y: 41.6, category: 'dungeon', level: '29–38', desc: 'Логово свинобразов в южных Степях.' }),
  kal({ id: 'rfd', name: 'Курганы Иглошкурых', x: 50.2, y: 43.6, category: 'dungeon', level: '37–46', desc: 'Курганы свинобразов и некромантия.' }),
  kal({ id: 'zf', name: 'Зул\'Фаррак', x: 54.6, y: 61.6, category: 'dungeon', level: '44–54', desc: 'Тролльская крепость в Танарисе.' }),
  kal({ id: 'maraudon', name: 'Мародон', x: 41.6, y: 46.6, category: 'dungeon', level: '46–55', desc: 'Пещеры в Пустошах.' }),
  kal({ id: 'diremaul', name: 'Забытый город', x: 41.6, y: 56.6, category: 'dungeon', level: '54–60', desc: 'Три крыла древнего Эльдре\'Таласа.' }),
  kal({ id: 'alcaz', name: 'Тюрьма Алказ', x: 60, y: 46.4, category: 'dungeon', level: '48–53', isNew: true, desc: 'Новое подземелье Forever на острове Алказ.' }),
  kal({ id: 'blackmaw', name: 'Крепость Чёрной Пасти', x: 61, y: 26.6, category: 'dungeon', level: '55–60', isNew: true, desc: 'Новое подземелье Forever в Азшаре.' }),
  kal({ id: 'shaper', name: 'Терраса Созидателя', x: 48.6, y: 64.6, category: 'dungeon', level: '58–60', isNew: true, desc: 'Новое подземелье Forever в Ун\'Горо.' }),

  // рейды и PvP
  kal({ id: 'onyxia', name: 'Логово Ониксии', x: 57.2, y: 44.6, category: 'raid', level: '60', soon: '9 декабря', desc: 'Рейд в Пылевых топях; открывается 9 декабря.' }),
  kal({ id: 'aq20', name: 'Руины Ан\'Киража', x: 42.6, y: 78.6, category: 'raid', level: '20', desc: 'Рейд на 20 человек в Силитусе.' }),
  kal({ id: 'aq40', name: 'Храм Ан\'Киража', x: 43.6, y: 79.6, category: 'raid', level: '40', desc: 'Рейд на 40 человек: К\'Тун.' }),
  kal({ id: 'hyjal_summit', name: 'Вершина Хиджала', x: 56.2, y: 19.1, category: 'raid', level: '20', isNew: true, soon: '9 декабря', desc: 'Новый рейд Forever на 20 человек.' }),
  kal({ id: 'barrow_deeps', name: 'Барроу-Дипс', x: 54.6, y: 16.8, category: 'raid', level: '10', isNew: true, soon: '9 декабря', desc: 'Новый рейд Forever на 10 человек.' }),
  kal({ id: 'warsong', name: 'Ущелье Песни Войны', x: 49.6, y: 27.6, category: 'pvp', level: '10–60', desc: 'Поле боя 10 на 10.' }),
  kal({ id: 'darkspear', name: 'Острова Тёмного Копья', x: 64, y: 44.6, category: 'pvp', level: '30–60', isNew: true, desc: 'Новое поле боя Forever 15 на 15 у Пылевых топей.' }),

  // боссы
  kal({ id: 'azuregos', name: 'Азурегос', x: 60.6, y: 25.6, category: 'boss', level: '60', desc: 'Мировой босс-дракон в Азшаре.' }),
  kal({ id: 'lethon', name: 'Лефтон', x: 43.6, y: 56.6, category: 'boss', level: '60', desc: 'Дракон Кошмара в Фераласе.' }),
  kal({ id: 'ysondre', name: 'Исондра', x: 47.6, y: 25.6, category: 'boss', level: '60', desc: 'Дракон Кошмара в Ясеневом лесу.' }),

  // география
  kal({ id: 'geo_eluneara', name: 'Озеро Элуны', x: 49, y: 16, category: 'geo', geoKind: 'lake', desc: 'Священное озеро в Лунной поляне.' }),
  kal({ id: 'geo_keltheril', name: 'Озеро Кел\'Терил', x: 53, y: 15, category: 'geo', geoKind: 'lake', desc: 'Замёрзшее озеро в Зимних Ключах.' }),
  kal({ id: 'geo_falathim', name: 'Озеро Фалатим', x: 47, y: 24, category: 'geo', geoKind: 'lake', desc: 'Лесное озеро в Ясеневом лесу.' }),
  kal({ id: 'geo_mennar', name: 'Озеро Меннар', x: 60.5, y: 24.5, category: 'geo', geoKind: 'lake', desc: 'Озеро в Азшаре.' }),
  kal({ id: 'geo_southfury', name: 'Река Саутфьюри', x: 54, y: 33, category: 'geo', geoKind: 'river', desc: 'Главная река Степей.' }),
  kal({ id: 'geo_darkwhisper', name: 'Тёмное ущелье', x: 57, y: 18, category: 'geo', geoKind: 'pass', desc: 'Проход из Зимних Ключей в Хиджал.' }),
];

// ── Азерот целиком (ключевые объекты) ────────────────────────────────────────

const azeroth: MapPoint[] = [
  world({ id: 'w_stormwind', name: 'Штормград', x: 72.8, y: 58.6, category: 'city', faction: 'alliance', desc: 'Столица Альянса.' }),
  world({ id: 'w_ironforge', name: 'Стальгорн', x: 72.3, y: 50.4, category: 'city', faction: 'alliance', desc: 'Столица дворфов.' }),
  world({ id: 'w_undercity', name: 'Подгород', x: 77.6, y: 34.2, category: 'city', faction: 'horde', desc: 'Столица Отрекшихся.' }),
  world({ id: 'w_orgrimmar', name: 'Оргриммар', x: 30.4, y: 39.2, category: 'city', faction: 'horde', desc: 'Столица Орды.' }),
  world({ id: 'w_thunderbluff', name: 'Громовой Утёс', x: 24.2, y: 50.2, category: 'city', faction: 'horde', desc: 'Столица тауренов.' }),
  world({ id: 'w_darnassus', name: 'Дарнас', x: 17.2, y: 21.6, category: 'city', faction: 'alliance', desc: 'Столица ночных эльфов.' }),
  world({ id: 'w_riverglades', name: 'Риверглейдс', x: 80.6, y: 54.4, category: 'zone', level: '35–45', isNew: true, desc: 'Новая зона Forever на восточном побережье.' }),
  world({ id: 'w_shendralas', name: 'Шен\'дралас', x: 21.8, y: 55.4, category: 'zone', isNew: true, desc: 'Новая зона Forever к югу от Пустошей.' }),
  world({ id: 'w_hyjal', name: 'Гора Хиджал', x: 30.8, y: 24.4, category: 'zone', level: '55–60', isNew: true, desc: 'Новая зона Forever и рейд «Вершина Хиджала».' }),
  world({ id: 'w_onyxia', name: 'Логово Ониксии', x: 33.4, y: 47.2, category: 'raid', level: '60', soon: '9 декабря', desc: 'Рейд в Пылевых топях.' }),
  world({ id: 'w_hyjal_summit', name: 'Вершина Хиджала', x: 30.2, y: 22.8, category: 'raid', level: '20', isNew: true, soon: '9 декабря', desc: 'Новый рейд Forever на 20 человек.' }),
  world({ id: 'w_barrow', name: 'Барроу-Дипс', x: 28.8, y: 26.2, category: 'raid', level: '10', isNew: true, soon: '9 декабря', desc: 'Новый рейд Forever на 10 человек.' }),
  world({ id: 'w_zephras', name: 'Остров Зефрас', x: 10.4, y: 14.4, category: 'zone', level: '1–12', isNew: true, desc: 'Небесный остров Скайборнов в Скайволле; на карту Азерота не проецируется.' }),
  world({ id: 'w_darkspear', name: 'Острова Тёмного Копья', x: 35.6, y: 46.8, category: 'pvp', level: '30–60', isNew: true, desc: 'Новое поле боя Forever 15 на 15.' }),
];

export const mapPoints: MapPoint[] = [...easternKingdoms, ...kalimdor, ...azeroth];

export const pointsFor = (region: MapRegion): MapPoint[] =>
  region === 'world'
    ? mapPoints.filter((point) => point.region === 'world')
    : mapPoints.filter((point) => point.region === region);

export const pointById = (id: string) => mapPoints.find((point) => point.id === id);

export const categoryLabel = (id: string) =>
  categories.find((category) => category.id === id)?.label ?? id;

export const REGIONS: {
  id: MapRegion;
  label: string;
  short: string;
  image: string;
  view: [number, number, number, number];
}[] = [
  {
    id: 'world',
    label: 'Азерот',
    short: 'Азерот',
    image: 'map/azeroth.jpg',
    view: [0.02, 0.02, 0.98, 0.98],
  },
  {
    id: 'ek',
    label: 'Восточные королевства',
    short: 'Вост. королевства',
    image: 'map/eastern-kingdoms.jpg',
    view: [0.16, 0.02, 0.71, 0.97],
  },
  {
    id: 'kalimdor',
    label: 'Калимдор',
    short: 'Калимдор',
    image: 'map/kalimdor.jpg',
    view: [0.33, 0.1, 0.69, 0.96],
  },
];
