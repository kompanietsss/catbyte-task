import React, { FC } from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

export const AppText: FC<TextProps> = props => {
  return (
    <Text {...props} style={[styles.text, props.style]}>
      {props.children}
    </Text>
  );
};

type Styles = {
  text: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  text: {
    fontSize: 16,
  },
});
