import { JSXElementConstructor, ReactElement } from 'react';
import { StackNavigationOptions } from '@react-navigation/stack';

export enum UserStackRoutes {
  UserList = 'UserList',
  UserDetail = 'UserDetail',
  CreateUser = 'CreateUser',
}

export type UserStackParamList = {
  [UserStackRoutes.UserList]: undefined;
  [UserStackRoutes.UserDetail]: {
    id: number;
  };
  [UserStackRoutes.CreateUser]: undefined;
};

export interface RoutesInterface {
  name: keyof UserStackParamList;
  options?: StackNavigationOptions;
  component: (
    arg0: any,
  ) => ReactElement<any, string | JSXElementConstructor<any>> | null;
  initialParams?: any;
}
