/**
 * Галерея скриншотов.
 * Чтобы поставить свой кадр — положите файл в public/images/ и укажите путь
 * так: { src: '/images/elv-sunwell.jpg', caption: '...', art: 'nightelf' }.
 * Пока src нет, рисуется SVG-заглушка.
 */
export interface Shot {
  src?: string;
  art: string;
  caption: string;
}

export const shots: Shot[] = [
  { art: 'nightelf', caption: 'Ночная эльфийка в лунном свете — мой первый кадр из нового патча' },
  { art: 'orc', caption: 'Орк-воин на выходе из подземелья' },
  { art: 'undead', caption: 'Андед: тот самый момент, когда город ещё спит' },
  { art: 'bloodelf', caption: 'Кровавая эльфийка и её солнечный клинок' },
  { art: 'tauren', caption: 'Таурен-друид в Награнде' },
  { art: 'troll', caption: 'Тролль-шаман: молнии, дым и немного хаоса' },
  { art: 'banner', caption: 'Панорама Азерота с высоты полёта' },
  { art: 'gallery', caption: 'Закат над морем — любимый скриншот из поездки по континенту' },
];
