declare type PixabayCategory =
  | 'animals'
  | 'backgrounds'
  | 'buildings'
  | 'business'
  | 'computer'
  | 'education'
  | 'fashion'
  | 'feelings'
  | 'food'
  | 'health'
  | 'industry'
  | 'music'
  | 'nature'
  | 'people'
  | 'places'
  | 'religion'
  | 'science'
  | 'sports'
  | 'transportation'
  | 'travel';

declare type PixabayImage = {
  comments: number;
  downloads: number;
  favorites: number;
  id: number;
  imageHeight: number;
  imageSize: number;
  imageWidth: number;
  largeImageURL: string;
  likes: number;
  pageURL: string;
  previewHeight: number;
  previewURL: string;
  previewWidth: number;
  tags: string;
  type: string;
  user_id: number;
  user: string;
  userImageURL: string;
  views: number;
  webformatHeight: number;
  webformatURL: string;
  webformatWidth: number;
};

declare type PixabayImageQueryOptions = {
  category?: PixabayCategory;
  q?: string;
  sfw?: boolean;
};
