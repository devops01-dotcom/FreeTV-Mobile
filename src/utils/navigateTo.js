
import { CommonActions, NavigationContainerRef } from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef();

export function navigateTo(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function resetNavigation(routeName, params) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    })
  );
}



export function navigateBack() {
  navigationRef.current?.goBack();
}