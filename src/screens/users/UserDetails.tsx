import React, { useCallback, useMemo } from 'react';
import {
  Image,
  ImageStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import { UserDetailRouteProps } from '~/navigation/User.routes';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { deleteUser, selectUserById } from '~/redux/slices/users/usersSlice';
import { AppText } from '~/components/Text';

import { ErrorView } from '~/components/Error';
import { UserType } from '~/redux/slices/users/user.types';
import { USER_NOT_FOUND } from '~/constants/texts';
import { width } from '~/utils/deviceUtils';
import { colorsPalette } from '~/theme/colorsPalette';

export const UserDetailsScreen: React.FC = () => {
  const insets: EdgeInsets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(insets), [insets]);
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const route = useRoute<UserDetailRouteProps>();
  const { id } = route.params;

  const userData: UserType | undefined = useAppSelector(state =>
    selectUserById(state, id),
  );

  const handleDeleteUser = useCallback(() => {
    dispatch(deleteUser(id)).then(() => {
      navigation.goBack();
    });
  }, [id, dispatch, navigation]);

  if (!userData) {
    return <ErrorView error={USER_NOT_FOUND} />;
  }

  return (
    <View style={styles.container}>
      {userData.image && (
        <Image source={{ uri: userData.image }} style={styles.profilePicture} />
      )}
      <AppText style={styles.userName}>{userData.firstName}</AppText>
      <View style={styles.companyContainer}>
        <AppText style={styles.companyInfo}>Company Info</AppText>
        <AppText style={styles.companyName}>{userData.company?.name}</AppText>
        <AppText style={styles.companyDetailText}>
          Address: {userData.company?.address?.address}
        </AppText>
        <AppText style={styles.companyDetailText}>
          Postal Code: {userData.company?.address?.postalCode}
        </AppText>
        <AppText style={styles.companyDetailText}>
          City: {userData.company?.address?.city}
        </AppText>
        <AppText style={styles.companyDetailText}>
          State: {userData.company?.address?.state}
        </AppText>
      </View>
      <TouchableOpacity
        onPress={handleDeleteUser}
        style={styles.buttonContainer}>
        <AppText style={styles.buttonText}>Delete User</AppText>
      </TouchableOpacity>
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  profilePicture: ImageStyle;
  userName: TextStyle;
  companyContainer: ViewStyle;
  companyName: TextStyle;
  companyInfo: TextStyle;
  companyDetailText: TextStyle;
  buttonContainer: ViewStyle;
  buttonText: TextStyle;
};

const createStyles = (insets: EdgeInsets) =>
  StyleSheet.create<Styles>({
    container: {
      flex: 1,
      paddingBottom: insets.bottom,
      paddingTop: 20,
    },
    profilePicture: {
      width: width * 0.5,
      height: width * 0.5,
      alignSelf: 'center',
      marginBottom: 10,
    },
    userName: {
      fontSize: 18,
      textAlign: 'center',
    },
    companyContainer: {
      backgroundColor: colorsPalette.white,
      margin: 10,
      padding: 10,
      borderRadius: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 5,
    },
    companyInfo: {
      fontSize: 18,
      marginBottom: 10,
    },
    companyName: {
      fontSize: 16,
      marginBottom: 10,
    },
    companyDetailText: {
      fontSize: 16,
      marginBottom: 10,
    },
    buttonContainer: {
      marginVertical: 20,
      paddingHorizontal: 30,
      paddingVertical: 15,
      backgroundColor: colorsPalette.danger,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      borderRadius: 25,
    },
    buttonText: {
      color: colorsPalette.white,
      fontSize: 18,
    },
  });
