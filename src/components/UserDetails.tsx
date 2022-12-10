import React, { useCallback } from 'react';
import {
  Image,
  ImageStyle,
  Pressable,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { AppText } from '~/components/Text';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserStackRoutes, UserStackParamList } from '~/navigation/routes.types';
import { UserType } from '~/redux/slices/users/user.types';
import { width } from '~/utils/deviceUtils';
import { colorsPalette } from '~/theme/colorsPalette';

export const UserDetails: React.FC<{ user: UserType }> = React.memo(
  ({ user }) => {
    const navigation = useNavigation<StackNavigationProp<UserStackParamList>>();

    const handlePress = useCallback(() => {
      navigation.navigate(UserStackRoutes.UserDetail, { id: user.id });
    }, [navigation, user]);

    return (
      <Pressable onPress={handlePress} style={styles.container}>
        <Image source={{ uri: user.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <AppText style={styles.text} numberOfLines={2}>
            {user.firstName}, {user.age}
          </AppText>
        </View>
      </Pressable>
    );
  },
);

type Styles = {
  container: ViewStyle;
  image: ImageStyle;
  text: TextStyle;
  textContainer: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    width: width * 0.5,
    height: width * 0.33,
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  image: {
    flex: 1,
    width: width * 0.33,
    height: width * 0.33,
    resizeMode: 'cover',
  },
  textContainer: {
    backgroundColor: colorsPalette.white,
  },
  text: {
    padding: 5,
    fontSize: 18,
    color: colorsPalette.info,
  },
});
