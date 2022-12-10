import React, { useCallback, useMemo, useState } from 'react';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useAppDispatch } from '~/redux/hooks';
import { addUser } from '~/redux/slices/users/usersSlice';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { colorsPalette } from '~/theme/colorsPalette';
import { AppText } from '~/components/Text';
import { UserType } from '~/redux/slices/users/user.types';

export const CreateUserScreen: React.FC = () => {
  const insets: EdgeInsets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(insets), [insets]);

  const [form, setForm] = useState<UserType>({
    id: 0,
    firstName: '',
    lastName: '',
    image: '',
    age: '',
    company: {
      name: '',
      address: {
        address: '',
        state: '',
        city: '',
        postalCode: '',
      },
    },
  });

  const { firstName, lastName, image, company, age } = form;
  const { name, address } = company;

  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const handleCreateUser = useCallback(() => {
    dispatch(addUser(form)).then(() => {
      navigation.goBack();
    });
  }, [form, dispatch, navigation]);

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollViewContentContainer}>
        <TextInput
          placeholder={'First Name'}
          placeholderTextColor={colorsPalette.placeholder}
          value={firstName}
          style={styles.inputContainer}
          onChangeText={text =>
            setForm(prevState => {
              return {
                ...prevState,
                firstName: text,
              };
            })
          }
        />
        <TextInput
          placeholder={'Last Name'}
          placeholderTextColor={colorsPalette.placeholder}
          value={lastName}
          style={styles.inputContainer}
          onChangeText={text =>
            setForm(prevState => {
              return {
                ...prevState,
                lastName: text,
              };
            })
          }
        />
        <TextInput
          placeholder={'Age'}
          placeholderTextColor={colorsPalette.placeholder}
          value={age.toString()}
          keyboardType={'numeric'}
          style={styles.inputContainer}
          onChangeText={text =>
            setForm(prevState => {
              return {
                ...prevState,
                age: text,
              };
            })
          }
        />
        <TextInput
          placeholder={'Profile Picture'}
          placeholderTextColor={colorsPalette.placeholder}
          value={image}
          style={styles.inputContainer}
          onChangeText={text =>
            setForm(prevState => {
              return {
                ...prevState,
                image: text,
              };
            })
          }
        />
        <TextInput
          placeholder={'Company Name'}
          placeholderTextColor={colorsPalette.placeholder}
          value={name}
          style={styles.inputContainer}
          onChangeText={text =>
            setForm(prevState => {
              return {
                ...prevState,
                company: {
                  ...prevState.company,
                  name: text,
                },
              };
            })
          }
        />
        <TextInput
          placeholder={'Company Address'}
          placeholderTextColor={colorsPalette.placeholder}
          value={address.address}
          style={styles.inputContainer}
          onChangeText={text =>
            setForm(prevState => {
              return {
                ...prevState,
                company: {
                  ...prevState.company,
                  address: {
                    ...prevState.company.address,
                    address: text,
                  },
                },
              };
            })
          }
        />
        <TextInput
          placeholder={'Company Address - City'}
          placeholderTextColor={colorsPalette.placeholder}
          value={address.city}
          style={styles.inputContainer}
          onChangeText={text =>
            setForm(prevState => {
              return {
                ...prevState,
                company: {
                  ...prevState.company,
                  address: {
                    ...prevState.company.address,
                    city: text,
                  },
                },
              };
            })
          }
        />
        <TextInput
          placeholder={'Company Address - State'}
          placeholderTextColor={colorsPalette.placeholder}
          value={address.state}
          style={styles.inputContainer}
          onChangeText={text =>
            setForm(prevState => {
              return {
                ...prevState,
                company: {
                  ...prevState.company,
                  address: {
                    ...prevState.company.address,
                    state: text,
                  },
                },
              };
            })
          }
        />
        <TextInput
          placeholder={'Company Address - Postal Code'}
          placeholderTextColor={colorsPalette.placeholder}
          value={address.postalCode}
          style={styles.inputContainer}
          onChangeText={text =>
            setForm(prevState => {
              return {
                ...prevState,
                company: {
                  ...prevState.company,
                  address: {
                    ...prevState.company.address,
                    postalCode: text,
                  },
                },
              };
            })
          }
        />
        <TouchableOpacity
          onPress={handleCreateUser}
          style={styles.buttonContainer}>
          <AppText style={styles.buttonText}>Create User</AppText>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  scrollViewContentContainer: ViewStyle;
  inputContainer: ViewStyle;
  buttonContainer: ViewStyle;
  buttonText: TextStyle;
};

const createStyles = (insets: EdgeInsets) =>
  StyleSheet.create<Styles>({
    container: {
      flex: 1,
    },
    inputContainer: {
      borderBottomWidth: 1,
      borderBottomColor: colorsPalette.info,
      paddingBottom: 10,
      marginBottom: 10,
    },
    scrollViewContentContainer: {
      flexGrow: 1,
      paddingTop: 20,
      paddingBottom: insets.bottom,
      paddingHorizontal: 20,
    },
    buttonContainer: {
      marginVertical: 20,
      paddingHorizontal: 30,
      paddingVertical: 15,
      backgroundColor: colorsPalette.info,
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
