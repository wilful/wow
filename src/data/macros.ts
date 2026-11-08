// Макросы для страницы /macros/.
//
// Два раздела: общие (подходят всем классам) и классовые — по два на класс.
//
// id        — короткий латинский якорь, для ссылок и поиска.
// title     — название карточки.
// description — одно-две предложения: что делает и когда пригождается.
// code      — текст макроса, копируется как есть (многострочные строки через \n).
// tags      — дополнительные слова для поиска (по-русски и по-английски).
//
// Названия способностей — как в русском клиенте игры. Если клиент английский,
// замени слова в code на английские: других правок не потребуется.

import { applicationClasses } from './guild';

export type Macro = {
  id: string;
  title: string;
  description: string;
  code: string;
  tags?: string[];
};

export type MacroClass = {
  code: string;
  label: string;
  color: string;
};

// Цвета классов в духе WoW — для точек в выборе класса.
const classColors: Record<string, string> = {
  WAR: '#c69b6d',
  PAL: '#f48cba',
  HUN: '#aad372',
  ROG: '#fff468',
  PRI: '#ffffff',
  SHA: '#0070dd',
  MAG: '#3fc7eb',
  WLK: '#8788ee',
  DRU: '#ff7c0a',
};

// Классы берём из заявки, чтобы коды и названия не расходились.
export const macroClasses: MacroClass[] = applicationClasses.map((c) => ({
  code: c.code,
  label: c.label,
  color: classColors[c.code] ?? '#d4af37',
}));

export const generalMacros: Macro[] = [
  {
    id: 'autoattack',
    title: 'Автоатака',
    description:
      'Включает автоатаку. Добавляй строку /startattack первой в любую кнопку ближнего боя — бой не сорвётся при смене цели.',
    code: '/startattack',
    tags: ['атака', 'autoattack', 'startattack'],
  },
  {
    id: 'focus-mouseover',
    title: 'Фокус под курсором',
    description:
      'Ставит фокус на существо под мышью, а если под курсором никого — на текущую цель. Дальше все макросы с [@focus] работают по фокусу.',
    code: '/focus [@mouseover,harm,nodead][@target,harm,nodead]',
    tags: ['фокус', 'focus', 'мышь', 'mouseover'],
  },
  {
    id: 'clearfocus',
    title: 'Сброс фокуса',
    description: 'Снимает фокус, чтобы способности с [@focus] не уходили по чужой цели.',
    code: '/clearfocus',
    tags: ['фокус', 'focus', 'сброс'],
  },
  {
    id: 'mount',
    title: 'Маунт и спешивание',
    description:
      'Одна кнопка: вне маунта садишься, на маунте слезаешь. Подставь в код имя своего ездового животного.',
    code: '/dismount [mounted]\n/cast [nomounted] <ездовое животное>',
    tags: ['маунт', 'mount', 'ездовое', 'спешивание'],
  },
  {
    id: 'castrandom-mount',
    title: 'Случайный маунт',
    description:
      'Выбирает случайный маунт из списка — удобно, если коллекция большая. Перечисли через запятую свои имена.',
    code: '/castrandom <маунт 1>, <маунт 2>, <маунт 3>',
    tags: ['маунт', 'mount', 'случайный', 'castrandom'],
  },
  {
    id: 'trinkets',
    title: 'Два аксессуара одной кнопкой',
    description:
      'Жмёт аксессуары в слотах 13 и 14 подряд: обе призмы, печати и другие прокладки срабатывают сразу.',
    code: '/use 13\n/use 14',
    tags: ['аксессуар', 'trinket', 'прокладка', 'слот'],
  },
];

export const classMacros: Record<string, Macro[]> = {
  WAR: [
    {
      id: 'charge',
      title: 'Рывок с автоатакой',
      description: 'Бьёт рывком и сразу включает автоатаку — не придётся жать «атака» отдельно.',
      code: '#showtooltip Рывок\n/startattack\n/cast Рывок',
      tags: ['рывок', 'charge', 'воин', 'атака'],
    },
    {
      id: 'shield-stance',
      title: 'Стойка + Блок щитом',
      description:
        'Переключает на оборонительную стойку и сразу ставит блок: одна кнопка вместо двух.',
      code: '/cast Оборонительная стойка\n/cast Блок щитом',
      tags: ['стойка', 'щит', 'блок', 'танк'],
    },
  ],
  PAL: [
    {
      id: 'holy-light-mouseover',
      title: 'Свет небес по наведению',
      description:
        'Лечит того, на кого смотрит курсор, не меняя текущую цель. Без цели — лечит цель, а без неё — себя.',
      code: '#showtooltip Свет небес\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Свет небес',
      tags: ['хил', 'лечение', 'паладин', 'mouseover'],
    },
    {
      id: 'cleanse-mouseover',
      title: 'Очищение по наведению',
      description: 'Снимает с подсвеченного союзника проклятия, болезни и магические дебаффы.',
      code: '#showtooltip Очищение\n/cast [@mouseover,help,nodead][@target,help,nodead] Очищение',
      tags: ['очищение', 'cleanse', 'диспел', 'дебафф'],
    },
  ],
  HUN: [
    {
      id: 'mark-pet',
      title: 'Метка охотника + атака питомца',
      description: 'Вешает метку и отправляет питомца в бой одной кнопкой.',
      code: '#showtooltip Метка охотника\n/petattack\n/cast Метка охотника',
      tags: ['метка', 'mark', 'питомец', 'pet'],
    },
    {
      id: 'pet-control',
      title: 'Атака или возврат питомца',
      description:
        'Обычное нажатие — питомец идёт в атаку, с Shift — возвращается и стоит на месте.',
      code: '/petattack [nomod]\n/petfollow [mod:shift]',
      tags: ['питомец', 'pet', 'petattack', 'petfollow'],
    },
  ],
  ROG: [
    {
      id: 'stealth',
      title: 'Незаметность без случайного снятия',
      description:
        'Заходит в незаметность и не снимает её повторным нажатием — кнопку можно жать на панели сколько угодно.',
      code: '#showtooltip Незаметность\n/cast !Незаметность',
      tags: ['незаметность', 'stealth', 'скрытность'],
    },
    {
      id: 'pickpocket',
      title: 'Ограбление и автоатака',
      description: 'Крадёт кошелёк и сразу включает автоатаку, чтобы после грабежа не жать «атака».',
      code: '#showtooltip Ограбление\n/cast Ограбление\n/startattack',
      tags: ['ограбление', 'pickpocket', 'кража'],
    },
  ],
  PRI: [
    {
      id: 'flash-heal-mouseover',
      title: 'Быстрое исцеление по наведению',
      description: 'Мгновенно лечит союзника под курсором, не переключая текущую цель.',
      code: '#showtooltip Быстрое исцеление\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Быстрое исцеление',
      tags: ['хил', 'лечение', 'жрец', 'flash heal', 'mouseover'],
    },
    {
      id: 'shield-mouseover',
      title: 'Слово силы: Щит по наведению',
      description: 'Ставит щит под курсором — на рейде не приходится переключаться между целями.',
      code: '#showtooltip Слово силы: Щит\n/cast [@mouseover,help,nodead][@target,help,nodead] Слово силы: Щит',
      tags: ['щит', 'shield', 'слово силы', 'mouseover'],
    },
  ],
  SHA: [
    {
      id: 'heal-wave-mouseover',
      title: 'Волна исцеления по наведению',
      description: 'Лечит подсвеченного союзника, не сбивая текущую цель.',
      code: '#showtooltip Волна исцеления\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Волна исцеления',
      tags: ['хил', 'лечение', 'шаман', 'волна', 'mouseover'],
    },
    {
      id: 'totems',
      title: 'Тотемы одной кнопкой',
      description:
        'Выставляет четыре тотема подряд по одному клику, прокручивает последовательность по новой после боя.',
      code: '#showtooltip\n/castsequence reset=combat Тотем каменных когтей, Тотем силы земли, Тотем исцеляющего потока, Тотем гнева воздуха',
      tags: ['тотем', 'totem', 'castsequence', 'шаман'],
    },
  ],
  MAG: [
    {
      id: 'polymorph',
      title: 'Превращение по наведению/фокусу',
      description:
        'Овечит того, на кого смотрит курсор, а если он занят — цель под фокусом. Без цели овечит текущую.',
      code: '#showtooltip Превращение\n/cast [@mouseover,harm,nodead][@focus,harm,nodead][] Превращение',
      tags: ['овца', 'полиморф', 'превращение', 'poly', 'контроль'],
    },
    {
      id: 'counterspell-focus',
      title: 'Антимагия по фокусу',
      description: 'Молчит заклинание сущности под фокусом — не надо переключать цель в бою.',
      code: '#showtooltip Антимагия\n/cast [@focus,harm,nodead][] Антимагия',
      tags: ['контрзаклинание', 'interrupt', 'фокус', 'антимагия'],
    },
  ],
  WLK: [
    {
      id: 'corrupt-pet',
      title: 'Порча и атака питомца',
      description: 'Накладывает порчу и отправляет демона в бой одной кнопкой.',
      code: '#showtooltip Порча\n/petattack\n/cast Порча',
      tags: ['порча', 'corrupt', 'демон', 'питомец', 'warlock'],
    },
    {
      id: 'banish',
      title: 'Изгнание по наведению/фокусу',
      description: 'Изгоняет сущность под курсором или под фокусом — удобно для контроля на пачках.',
      code: '#showtooltip Изгнание\n/cast [@mouseover,harm,nodead][@focus,harm,nodead][] Изгнание',
      tags: ['изгнание', 'banish', 'контроль', 'фокус'],
    },
  ],
  DRU: [
    {
      id: 'cat-form',
      title: 'Кошачья форма одной кнопкой',
      description: 'Входит в кошачью форму и не выходит из неё повторным нажатием.',
      code: '#showtooltip Кошачья форма\n/cast !Кошачья форма',
      tags: ['форма', 'кошка', 'cat', 'фера', 'друид'],
    },
    {
      id: 'heal-touch-mouseover',
      title: 'Целительное прикосновение по наведению',
      description: 'Лечит союзника под курсором, не меняя текущую цель.',
      code: '#showtooltip Целительное прикосновение\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Целительное прикосновение',
      tags: ['хил', 'лечение', 'друид', 'mouseover'],
    },
  ],
};

export default { generalMacros, classMacros, macroClasses };
