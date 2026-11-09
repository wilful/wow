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
// Отдельно в этом же файле лежит macroNames — короткие имена для строки-создателя
// (/run CreateMacro), которую страница собирает из code.
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
  // Ходовой макрос: на карточке показывается значок «Хит».
  popular?: boolean;
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
    popular: true,
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
    popular: true,
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
    popular: true,
  },
  {
    id: 'showtooltip-base',
    title: 'Основа любого макроса',
    description:
      'Строка #showtooltip ставит в кнопку иконку и подсказку способности из следующей строки. Подставь своё заклинание — и макрос готов.',
    code: '#showtooltip <способность>\n/cast <способность>',
    tags: ['showtooltip', 'подсказка', 'иконка', 'основа', 'шаблон'],
  },
  {
    id: 'stopcasting',
    title: 'Стоп-каст',
    description:
      'Обрывает твоё текущее заклинание. Ставь первой строкой перед хилом или спасением — мгновенно прервёшь каст и среагируешь.',
    code: '/stopcasting',
    tags: ['стоп', 'stopcasting', 'прерывание', 'каст'],
    popular: true,
  },
  {
    id: 'targetlasttarget',
    title: 'Прошлая цель',
    description:
      'Возвращает цель, которая была до текущей. Помог хилом или контролем — и одной кнопкой вернулся в бой.',
    code: '/targetlasttarget',
    tags: ['цель', 'target', 'прошлая', 'lasttarget'],
  },
  {
    id: 'assist',
    title: 'Ассист по танку',
    description:
      'Берёт цель, которую бьёт указанный игрок. Впиши имя танка — и бей ровно то же, что и он.',
    code: '/assist <имя танка>',
    tags: ['ассист', 'assist', 'танк', 'цель'],
  },
  {
    id: 'eat-drink',
    title: 'Еда и питьё',
    description:
      'Ест и пьёт одним нажатием. Подставь названия своей еды и напитка — восстанавливаться между пулами станет проще.',
    code: '/use <еда>\n/use <питьё>',
    tags: ['еда', 'питьё', 'food', 'drink', 'восстановление'],
  },
  {
    id: 'targettarget-heal',
    title: 'Хил по цели цели',
    description:
      'Лечит того, кого держит твоя цель, — обычно танка под боссом. Удобно, когда сама цель не союзник.',
    code: '#showtooltip <исцеление>\n/cast [@targettarget,help,nodead][] <исцеление>',
    tags: ['хил', 'лечение', 'targettarget', 'танк', 'цель цели'],
  },
  {
    id: 'weapon-swap',
    title: 'Смена оружия',
    description:
      'Меняет оружие одной кнопкой: щит под танка, другой клинок под яд или добивание. Подставь название предмета.',
    code: '/equip <оружие>',
    tags: ['оружие', 'equip', 'смена', 'щит'],
  },
  {
    id: 'reload',
    title: 'Перезагрузка интерфейса',
    description:
      'Перезагружает интерфейс без выхода из игры. Помогает, когда зависли аддоны, пропали кнопки или поехали фреймы.',
    code: '/reload',
    tags: ['reload', 'перезагрузка', 'интерфейс', 'аддоны'],
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
    {
      id: 'execute',
      title: 'Казнь с автоатакой',
      description: 'Включает автоатаку и бьёт казнью — кнопка не сорвёт бой при смене цели.',
      code: '#showtooltip Казнь\n/startattack\n/cast Казнь',
      tags: ['казнь', 'execute', 'воин', 'атака'],
    },
    {
      id: 'taunt',
      title: 'Провокация под курсором',
      description:
        'Возвращает моба под курсором, не меняя текущую цель. Работает в оборонительной стойке — танку это самое то.',
      code: '#showtooltip Провокация\n/cast [@mouseover,harm,nodead][] Провокация',
      tags: ['провокация', 'taunt', 'танк', 'mouseover'],
    },
    {
      id: 'sunder',
      title: 'Раскол брони с автоатакой',
      description: 'Снимает броню цели и сразу включает автоатаку — удобно на танке и в соло.',
      code: '#showtooltip Раскол брони\n/startattack\n/cast Раскол брони',
      tags: ['раскол', 'sunder', 'броня', 'танк'],
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
    {
      id: 'bubble-hearth',
      title: 'Бабл + камень возвращения',
      description:
        'Классический трюк: божественный щит даёт время, а камень возвращения уносит домой. Работает и в открытом мире.',
      code: '/cast Божественный щит\n/use Камень возвращения',
      tags: ['бабл', 'bubble', 'щит', 'хайстон', 'hearthstone', 'возвращение'],
      popular: true,
    },
    {
      id: 'freedom',
      title: 'Благословение свободы по наведению',
      description: 'Снимает замедления и руты с того, на кого смотрит курсор, не меняя цель.',
      code: '#showtooltip Благословение свободы\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Благословение свободы',
      tags: ['свобода', 'freedom', 'рут', 'замедление', 'паладин'],
    },
    {
      id: 'judgement',
      title: 'Правосудие с автоатакой',
      description: 'Высвобождает активную печать правосудием и сразу включает автоатаку.',
      code: '#showtooltip Правосудие\n/startattack\n/cast Правосудие',
      tags: ['правосудие', 'judgement', 'печать', 'паладин'],
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
    {
      id: 'frost-trap-self',
      title: 'Ледяная ловушка под себя',
      description:
        'Ставит ловушку прямо под ноги — выручает, когда милишник уже дышит в затылок или нужно оторваться.',
      code: '#showtooltip Ледяная ловушка\n/cast [@player] Ледяная ловушка',
      tags: ['ловушка', 'trap', 'frost', 'охотник', 'контроль'],
    },
    {
      id: 'aspect-cheetah',
      title: 'Аспект гепарда без отмены',
      description:
        'Включает аспект гепарда и не выключает его повторным нажатием — кнопку можно жать сколько угодно.',
      code: '#showtooltip Аспект гепарда\n/cast !Аспект гепарда',
      tags: ['аспект', 'aspect', 'гепард', 'скорость', 'охотник'],
      popular: true,
    },
    {
      id: 'aimed-shot',
      title: 'Прицельный выстрел с автоатакой',
      description: 'Начинает автоатаку и стреляет прицельным — бой не сорвётся при смене цели.',
      code: '#showtooltip Прицельный выстрел\n/startattack\n/cast Прицельный выстрел',
      tags: ['прицельный', 'aimed', 'выстрел', 'охотник'],
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
    {
      id: 'blind-focus',
      title: 'Ослепление по фокусу',
      description:
        'Ослепляет цель в фокусе, не трогая основную. Держи второго противника в фокусе — и выключай его в нужный момент.',
      code: '#showtooltip Ослепление\n/cast [@focus,harm,nodead][] Ослепление',
      tags: ['ослепление', 'blind', 'фокус', 'контроль', 'разбойник'],
      popular: true,
    },
    {
      id: 'kick-focus',
      title: 'Пинок по фокусу',
      description: 'Сбивает каст цели в фокусе, не переключаясь с основной цели.',
      code: '#showtooltip Пинок\n/cast [@focus,harm,nodead][] Пинок',
      tags: ['пинок', 'kick', 'прерывание', 'фокус'],
    },
    {
      id: 'stealth-opener',
      title: 'Открывашка из незаметности',
      description:
        'Из незаметности бьёт внезапным ударом, а в бою — подлым. Одна кнопка на открывание и обычный удар.',
      code: '#showtooltip\n/cast [stealth] Внезапный удар; Подлый удар',
      tags: ['открывашка', 'opener', 'внезапный', 'подлый', 'стелс'],
    },
  ],
  PRI: [
    {
      id: 'inner-focus-devouring-plague',
      title: 'Внутреннее сосредоточение + Всепожирающая чума',
      description:
        'Сначала пытается применить внутреннее сосредоточение, затем — всепожирающую чуму. Если сосредоточение на перезарядке, чума всё равно будет применена.',
      code: '#showtooltip Всепожирающая чума\n/cast Внутреннее сосредоточение\n/cast Всепожирающая чума',
      tags: ['жрец', 'внутреннее сосредоточение', 'inner focus', 'всепожирающая чума', 'devouring plague', 'урон'],
    },
    {
      id: 'stopcast-psychic-scream',
      title: 'Стоп-каст + Ментальный крик',
      description:
        'Прерывает текущий каст и пытается применить ментальный крик. Удобно, чтобы быстро остановить заклинание и отпугнуть противников рядом.',
      code: '#showtooltip Ментальный крик\n/stopcasting\n/cast Ментальный крик',
      tags: ['жрец', 'стоп-каст', 'stopcasting', 'ментальный крик', 'psychic scream', 'страх', 'контроль'],
    },
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
    {
      id: 'dispel-mouseover',
      title: 'Рассеивание магии по наведению',
      description: 'Снимает магию с союзника под курсором, не меняя текущую цель.',
      code: '#showtooltip Рассеивание магии\n/cast [@mouseover,help,nodead][@target,help,nodead] Рассеивание магии',
      tags: ['рассеивание', 'dispel', 'магия', 'диспел', 'mouseover'],
      popular: true,
    },
    {
      id: 'renew-mouseover',
      title: 'Обновление по наведению',
      description:
        'Вешает обновление на союзника под курсором, а без него — на цель или себя. Хил без смены цели.',
      code: '#showtooltip Обновление\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Обновление',
      tags: ['обновление', 'renew', 'хил', 'hot', 'mouseover'],
    },
    {
      id: 'shackle-undead',
      title: 'Сковывание нежити по наведению',
      description:
        'Сковывает нежить под курсором — пригодится в Стратхольме, Некроситете и на кладбищенских паках.',
      code: '#showtooltip Сковывание нежити\n/cast [@mouseover,harm,nodead][] Сковывание нежити',
      tags: ['сковывание', 'shackle', 'нежить', 'контроль', 'undead'],
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
    {
      id: 'ghost-wolf',
      title: 'Призрачный волк без отмены',
      description:
        'Включает волка и не снимает его повторным нажатием: кнопку можно жать сколько угодно.',
      code: '#showtooltip Призрачный волк\n/cast !Призрачный волк',
      tags: ['волк', 'ghost wolf', 'скорость', 'шаман'],
      popular: true,
    },
    {
      id: 'earth-shock-focus',
      title: 'Земной шок по фокусу',
      description: 'Сбивает каст цели в фокусе, не переключаясь с основной цели.',
      code: '#showtooltip Земной шок\n/cast [@focus,harm,nodead][] Земной шок',
      tags: ['земной шок', 'earth shock', 'прерывание', 'фокус'],
    },
    {
      id: 'tremor-totem',
      title: 'Тотем трепета',
      description:
        'Ставит тотем трепета одной кнопкой — снимает страх, сон и обаяние с группы. Держи под рукой против чернокнижников и жрецов.',
      code: '#showtooltip Тотем трепета\n/cast Тотем трепета',
      tags: ['тотем', 'трепет', 'tremor', 'страх', 'сон'],
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
    {
      id: 'ice-block',
      title: 'Ледяная глыба вкл/выкл',
      description:
        'Одна кнопка: включает глыбу и снимает её повторным нажатием. Не нужно искать отдельный макрос на отмену.',
      code: '#showtooltip Ледяная глыба\n/cast Ледяная глыба\n/cancelaura Ледяная глыба',
      tags: ['глыба', 'ice block', 'cancelaura', 'маг', 'защита'],
      popular: true,
    },
    {
      id: 'remove-curse',
      title: 'Снятие проклятия по наведению',
      description: 'Снимает проклятие с союзника под курсором, не меняя текущую цель.',
      code: '#showtooltip Снятие проклятия\n/cast [@mouseover,help,nodead][@target,help,nodead] Снятие проклятия',
      tags: ['проклятие', 'curse', 'снятие', 'маг', 'mouseover'],
    },
    {
      id: 'blink-stopcast',
      title: 'Стоп-каст + Скачок',
      description:
        'Обрывает текущий каст и сразу прыгает скачком. Спасает, когда начал каст, а под тобой уже милишник.',
      code: '#showtooltip Скачок\n/stopcasting\n/cast Скачок',
      tags: ['скачок', 'blink', 'стоп-каст', 'маг', 'побег'],
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
    {
      id: 'fear-focus',
      title: 'Страх по наведению/фокусу',
      description: 'Пугает цель под курсором или в фокусе, не сбивая основную цель.',
      code: '#showtooltip Страх\n/cast [@mouseover,harm,nodead][@focus,harm,nodead][] Страх',
      tags: ['страх', 'fear', 'контроль', 'фокус', 'чернокнижник'],
    },
    {
      id: 'curse-tongues-focus',
      title: 'Проклятие языка по фокусу',
      description:
        'Вешает проклятие языка на цель в фокусе: вражеский кастер дольше читает заклинания.',
      code: '#showtooltip Проклятие языка\n/cast [@focus,harm,nodead][] Проклятие языка',
      tags: ['проклятие языка', 'curse of tongues', 'фокус', 'кастер'],
    },
    {
      id: 'shadow-bolt-pet',
      title: 'Стрела тьмы + питомец',
      description: 'Отправляет демона в бой и сразу читает стрелу тьмы.',
      code: '#showtooltip Стрела тьмы\n/petattack\n/cast Стрела тьмы',
      tags: ['стрела тьмы', 'shadow bolt', 'питомец', 'демон'],
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
    {
      id: 'bear-form',
      title: 'Медвежья форма без отмены',
      description:
        'Входит в медведя и не выходит из формы повторным нажатием — кнопку можно жать сколько угодно.',
      code: '#showtooltip Медвежья форма\n/cast !Медвежья форма',
      tags: ['медведь', 'bear', 'форма', 'танк', 'друид'],
    },
    {
      id: 'faerie-fire',
      title: 'Волшебный огонь по наведению',
      description: 'Вешает волшебный огонь на цель под курсором, не меняя текущую.',
      code: '#showtooltip Волшебный огонь\n/cast [@mouseover,harm,nodead][@target,harm,nodead] Волшебный огонь',
      tags: ['волшебный огонь', 'faerie fire', 'дебафф', 'mouseover'],
    },
    {
      id: 'rejuv-mouseover',
      title: 'Омоложение по наведению',
      description: 'Вешает омоложение на союзника под курсором, а без него — на цель или себя.',
      code: '#showtooltip Омоложение\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Омоложение',
      tags: ['омоложение', 'rejuvenation', 'хил', 'hot', 'mouseover'],
    },
  ],
};

// Короткие имена макросов для команды CreateMacro: игра ограничивает имя
// 16 символами, поэтому здесь не название карточки, а сокращение.
// Ключ — id макроса; если имени нет, страница возьмёт заголовок (обрезанный).
export const macroNames: Record<string, string> = {
  autoattack: 'Автоатака',
  'focus-mouseover': 'Фокус мышью',
  clearfocus: 'Сброс фокуса',
  mount: 'Маунт',
  'castrandom-mount': 'Случ. маунт',
  trinkets: 'Аксессуары',
  charge: 'Рывок',
  'shield-stance': 'Стойка+щит',
  'holy-light-mouseover': 'Свет небес',
  'cleanse-mouseover': 'Очищение',
  'mark-pet': 'Метка+питомец',
  'pet-control': 'Питомец',
  stealth: 'Незаметность',
  pickpocket: 'Ограбление',
  'inner-focus-devouring-plague': 'Сосредоточение+Чума',
  'stopcast-psychic-scream': 'Стоп+Крик',
  'flash-heal-mouseover': 'Быстрый хил',
  'shield-mouseover': 'Щит жреца',
  'heal-wave-mouseover': 'Волна хила',
  totems: 'Тотемы',
  polymorph: 'Овечка',
  'counterspell-focus': 'Антимагия',
  'corrupt-pet': 'Порча',
  banish: 'Изгнание',
  'cat-form': 'Кошка',
  'heal-touch-mouseover': 'Хил друида',
  'showtooltip-base': 'Основа',
  stopcasting: 'Стоп-каст',
  targetlasttarget: 'Прошлая цель',
  assist: 'Ассист',
  'eat-drink': 'Еда и питьё',
  'targettarget-heal': 'Хил по цели',
  'weapon-swap': 'Смена оружия',
  reload: 'Перезагрузка',
  execute: 'Казнь',
  taunt: 'Провокация',
  sunder: 'Раскол брони',
  'bubble-hearth': 'Бабл+ХС',
  freedom: 'Свобода',
  judgement: 'Правосудие',
  'frost-trap-self': 'Ловушка',
  'aspect-cheetah': 'Аспект',
  'aimed-shot': 'Прицельный',
  'blind-focus': 'Ослепление',
  'kick-focus': 'Пинок',
  'stealth-opener': 'Открывашка',
  'dispel-mouseover': 'Рассеивание',
  'renew-mouseover': 'Обновление',
  'shackle-undead': 'Сковывание',
  'ghost-wolf': 'Волк',
  'earth-shock-focus': 'Земной шок',
  'tremor-totem': 'Тотем трепета',
  'ice-block': 'Глыба',
  'remove-curse': 'Снятие проклятия',
  'blink-stopcast': 'Скачок',
  'fear-focus': 'Страх',
  'curse-tongues-focus': 'Проклятие',
  'shadow-bolt-pet': 'Стрела тьмы',
  'bear-form': 'Медведь',
  'faerie-fire': 'Волшебный огонь',
  'rejuv-mouseover': 'Омоложение',
};

export default { generalMacros, classMacros, macroClasses, macroNames };
