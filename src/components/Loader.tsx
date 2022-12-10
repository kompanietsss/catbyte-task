import { ActivityIndicator, StyleSheet, View, ViewStyle } from 'react-native';
import React, { FC } from 'react';

export const Loader: FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

type Styles = {
  container: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
