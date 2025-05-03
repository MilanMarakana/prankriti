import {BackHandler} from 'react-native';

export const disableHardwareBackButton = () => {
  const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
    return true; // This prevents the default back button behavior
  });

  return backHandler; // Return the handler so it can be removed when needed
};
