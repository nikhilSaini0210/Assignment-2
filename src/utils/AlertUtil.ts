import { Alert } from 'react-native';

interface AlertOptions {
  title?: string;
  message: string;
  onOkPress?: () => void;
  onCancelPress?: () => void;
  showCancel?: boolean;
  cancelText?: string;
  okText?: string;
}

export const showAlert = ({
  title = 'Error',
  message,
  onOkPress,
  onCancelPress,
  showCancel = false,
  cancelText = 'Cancel',
  okText = 'OK',
}: AlertOptions) => {
  const buttons = [];

  if (showCancel) {
    buttons.push({
      text: cancelText,
      style: 'cancel' as const,
      onPress: onCancelPress ?? (() => {}),
    });
  }

  buttons.push({
    text: okText,
    onPress: onOkPress ?? (() => {}),
  });

  Alert.alert(title, message, buttons);
};
