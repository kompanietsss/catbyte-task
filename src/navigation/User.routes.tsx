import { RouteProp } from '@react-navigation/native';
import { CreateUserScreen } from '~/screens/users/CreateUser';
import { UserDetailsScreen } from '~/screens/users/UserDetails';
import { UsersListScreen } from '~/screens/users/UsersList';

import {
  UserStackRoutes,
  UserStackParamList,
  RoutesInterface,
} from './routes.types';

export type UserDetailRouteProps = RouteProp<
  UserStackParamList,
  UserStackRoutes.UserDetail
>;

export const usersRoutes: RoutesInterface[] = [
  {
    name: UserStackRoutes.UserList,
    component: UsersListScreen,
    options: { headerShown: false },
  },
  {
    name: UserStackRoutes.UserDetail,
    component: UserDetailsScreen,
    options: {
      headerShown: true,
      title: 'User Details',
    },
  },
  {
    name: UserStackRoutes.CreateUser,
    component: CreateUserScreen,
    options: {
      headerShown: true,
      title: 'Create User',
    },
  },
];
