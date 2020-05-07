import { useWindowDimensions } from 'react-native';

export default function useWindowIsLandscape(): boolean {
  const windowDimensions = useWindowDimensions();
  const isLandscape = windowDimensions.height < windowDimensions.width;

  return isLandscape;
}
