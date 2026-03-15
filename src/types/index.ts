export type EventCategory = 'siege' | 'battle' | 'other';

export interface WarEvent {
  id: number;
  date: string;
  name: string;
  location: string;
  coords: [number, number];
  wikipedia: string;
  category: EventCategory;
}
