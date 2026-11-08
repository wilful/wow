// Данные гильдии для страницы заявки.
// Замени реалм и офицеров на реальные.
//
// name — имя офицера. Оно подставляется в команду /w как есть.
// code — короткий латинский код (2–6 символов). Он попадает в строку заявки
//        (DUR1-...-VIL-...) и в ссылку ?ref=VIL, поэтому меняй его вместе с аддоном.

export type Officer = {
  name: string;
  code: string;
};

export type RoleCode = 'TANK' | 'HEAL' | 'DD';

export type ApplicationClass = {
  code: string;
  label: string;
  roles: RoleCode[];
};

export const applicationRoles: { code: RoleCode; label: string }[] = [
  { code: 'TANK', label: 'Танк' },
  { code: 'HEAL', label: 'Хил' },
  { code: 'DD', label: 'ДД' },
];

// Доступные роли в заявке по классу для WoW: Forever.
export const applicationClasses: ApplicationClass[] = [
  { code: 'WAR', label: 'Воин', roles: ['TANK', 'DD'] },
  { code: 'PAL', label: 'Паладин', roles: ['TANK', 'HEAL', 'DD'] },
  { code: 'HUN', label: 'Охотник', roles: ['DD'] },
  { code: 'ROG', label: 'Разбойник', roles: ['DD'] },
  { code: 'PRI', label: 'Жрец', roles: ['HEAL', 'DD'] },
  { code: 'SHA', label: 'Шаман', roles: ['HEAL', 'DD'] },
  { code: 'MAG', label: 'Маг', roles: ['DD'] },
  { code: 'WLK', label: 'Чернокнижник', roles: ['DD'] },
  { code: 'DRU', label: 'Друид', roles: ['TANK', 'HEAL', 'DD'] },
];

export const guild: {
  name: string;
  realm: string;
  faction: string;
  officers: Officer[];
} = {
  name: 'Durotar',
  realm: 'Forever', // TODO: имя реалма, на котором играет гильдия
  faction: 'Орда',
  officers: [
    { name: 'Виллен Вилфул', code: 'VIL' },
    // { name: 'Имя Офицера', code: 'OFF' },
  ],
};

export default guild;
