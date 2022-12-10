import React, { useEffect, useMemo } from 'react';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import {
  getUsers,
  getUsersError,
  getUsersStatus,
  selectAllUsers,
} from '~/redux/slices/users/usersSlice';
import { Loader } from '~/components/Loader';
import { ErrorView } from '~/components/Error';
import { EmptyMessage } from '~/components/EmptyMessage';
import { USER_LIST_EMPTY } from '~/constants/texts';
import { UserDetails } from '~/components/UserDetails';
import { FloatingButton } from '~/components/Button';
import { UserType } from '~/redux/slices/users/user.types';

const renderItem = ({ item }: { item: UserType }) => {
  return <UserDetails user={item} />;
};

export const UsersListScreen: React.FC = () => {
  const insets: EdgeInsets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(insets), [insets]);

  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);
  const status = useAppSelector(getUsersStatus);
  const error = useAppSelector(getUsersError);

  useEffect(() => {
    if (status === 'pending') {
      dispatch(getUsers());
    }
  }, [dispatch, status]);

  if (status === 'pending' || status === 'loading') {
    return <Loader />;
  }

  if (error) {
    return <ErrorView error={error} />;
  }

  const renderEmptyComponent = () => {
    return <EmptyMessage message={USER_LIST_EMPTY} />;
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={users}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        bounces={false}
        estimatedItemSize={10}
        ListEmptyComponent={renderEmptyComponent}
        numColumns={2}
        keyExtractor={({ id }) => id.toString()}
      />
      <FloatingButton />
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  contentContainer: ViewStyle;
};

const createStyles = (insets: EdgeInsets) =>
  StyleSheet.create<Styles>({
    container: {
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },

    contentContainer: {
      paddingBottom: 80,
    },
  });
