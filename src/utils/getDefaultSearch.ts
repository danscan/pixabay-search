const DEFAULT_SEARCHES = [
  'animals',
  'backgrounds',
  'buildings',
  'business',
  'computer',
  'education',
  'fashion',
  'feelings',
  'food',
  'health',
  'industry',
  'music',
  'nature',
  'people',
  'places',
  'religion',
  'science',
  'sports',
  'transportation',
  'travel',
];

export default function getDefaultSearch(): string {
  const index = Math.floor(Math.random() * DEFAULT_SEARCHES.length);

  return DEFAULT_SEARCHES[index];
}
