import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from './tabBarIcon/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import FavoriteScreen from '../screens/FavoriteScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

//Creates the homescreen
const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

//Creates the option to go to the homescreen in navigation at the bottom of the app
HomeStack.navigationOptions = {
  tabBarLabel: 'Hjem',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-search'}
    />
  ),
};

HomeStack.path = '';

//Creates favorite screen
const FavoriteStack = createStackNavigator(
  {
    Favorite: FavoriteScreen,
  },
  config
);

//Creates the option to go to favorites in navigation at the bottom of the app
FavoriteStack.navigationOptions = {
  tabBarLabel: 'Favoritter',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'} />
  ),
};

FavoriteStack.path = '';





const tabNavigator = createBottomTabNavigator({
  HomeStack,
  FavoriteStack,
});

tabNavigator.path = '';

export default tabNavigator;
