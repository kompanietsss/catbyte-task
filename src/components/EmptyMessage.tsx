import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { AppText } from '~/components/Text';

export const EmptyMessage: FC<{
  message: string;
}> = ({ message }) => (
  <View style={styles.container}>
    <AppText style={styles.text}>{message}</AppText>
  </View>
);

type Styles = {
  container: ViewStyle;
  text: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});
