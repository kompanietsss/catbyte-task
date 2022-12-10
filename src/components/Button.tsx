import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { FC, useCallback } from 'react';
import { AppText } from '~/components/Text';
import { useNavigation } from '@react-navigation/native';
import { colorsPalette } from '~/theme/colorsPalette';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserStackRoutes, UserStackParamList } from '~/navigation/routes.types';

export const FloatingButton: FC = () => {
  const navigation = useNavigation<StackNavigationProp<UserStackParamList>>();

  const AddUserHandler = useCallback(() => {
    navigation.navigate(UserStackRoutes.CreateUser);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={AddUserHandler} style={styles.buttonContainer}>
        <AppText style={styles.buttonText}>Create User</AppText>
      </TouchableOpacity>
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  buttonContainer: ViewStyle;
  buttonText: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    position: 'absolute',
    paddingBottom: 40,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: colorsPalette.info,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 80,
    paddingVertical: 20,
  },
  buttonText: {
    color: colorsPalette.white,
  },
});
