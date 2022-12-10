import { Dimensions, Platform, ScaledSize } from 'react-native';

export const { width, height } = Dimensions.get('window');

export const getScreenSight = (): number => {
  return getScreenSize().height;
};

export const getScreenSize = (): ScaledSize => {
  return Dimensions.get('screen');
};

export const isIOS = (): boolean => {
  return Platform.OS === 'ios';
};

export const isAndroid = (): boolean => {
  return Platform.OS === 'android';
};
