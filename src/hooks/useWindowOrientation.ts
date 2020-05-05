import { useWindowDimensions } from 'react-native';

export enum Orientation {
  Landscape = 'landscape',
  Portrait = 'portrait',
}

export default function useWindowOrientation(): Orientation {
  const windowDimensions = useWindowDimensions();
  const isLandscape = windowDimensions.height < windowDimensions.width;

  return isLandscape ? Orientation.Landscape : Orientation.Portrait;
}
