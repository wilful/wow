/** Curated game-world imagery for the fan gallery. */
export interface Shot {
  src: string;
  caption: string;
  place: string;
}

export const shots: Shot[] = [
  { src: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85', caption: 'Древний лес в лунном свете', place: 'Дорога через лес' },
  { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=85', caption: 'Вершины, которые касаются звёзд', place: 'Высокогорье' },
  { src: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=85', caption: 'Рассвет над золотыми равнинами', place: 'Новый день' },
  { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85', caption: 'Тропы, уходящие за горизонт', place: 'На краю карты' },
  { src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85', caption: 'Тихое озеро среди гор', place: 'Перед привалом' },
  { src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85', caption: 'Туман в сердце старого леса', place: 'Земли Калимдора' },
];
