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
