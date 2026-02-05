import { showMessage } from 'react-native-flash-message';

export const showToast = (message, type) => {
  const options = {
    message: message,
    type: type,
    icon: 'auto',
  };

  showMessage(options);
};
