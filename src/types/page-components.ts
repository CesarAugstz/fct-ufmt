export interface Card {
  id: string;
  title: string;
  description?: string;
  content: string;
  icon: string;
  link?: string;
}

export interface CardGroup {
  id: string;
  type: 'cardGroup';
  title: string;
  description?: string;
  cards: Card[];
}

export interface Banner {
  id: string;
  type: 'banner';
  title: string;
  description?: string;
  imageUrl: string;
  link?: string;
}

// Union type for all possible components
export type Component = CardGroup | Banner;

export interface ComponentFormValues {
  type: string;
  title: string;
  description?: string;
}

export interface CardFormValues {
  title: string;
  description?: string;
  content: string;
  icon: string;
  link?: string;
}
