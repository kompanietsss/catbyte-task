import React, { memo } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import {
  UserStackRoutes,
  UserStackParamList,
  RoutesInterface,
} from './routes.types';
import { usersRoutes } from './User.routes';

const Stack = createStackNavigator<UserStackParamList>();

export const MainNavigator: React.FC = () => {
  const Router = ({
    name,
    component,
    initialParams,
    options,
  }: RoutesInterface) => {
    return (
      <Stack.Screen
        key={name}
        name={name}
        component={memo(component)}
        initialParams={initialParams}
        options={options}
      />
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={UserStackRoutes.UserList}>
      {usersRoutes.map(Router)}
    </Stack.Navigator>
  );
};
