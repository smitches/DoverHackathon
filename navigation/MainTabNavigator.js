import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator, createTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HomeyScreen from '../screens/HomeyScreen';
import SearchScreen from '../screens/SearchScreen';


import CartScreen from '../screens/CartScreen'
import StoreScreen from '../screens/StoreScreen'
import WalletScreen from '../screens/WalletScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'} />
  ),
};

SettingsStack.path = '';


const HomeyStack = createStackNavigator(
  {
    Homey: HomeyScreen,
  },
  config
);

HomeyStack.navigationOptions = {
  tabBarLabel: 'Homey',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

HomeyStack.path = '';


const ProductStack = createStackNavigator(
  {
    Search: SearchScreen,
    Cart: CartScreen,
    Store: StoreScreen
  },
  config
);

ProductStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-search'
          : 'md-search'
      }
    />
  ),
};

ProductStack.path = '';

const WalletStack = createStackNavigator(
  {
    Wallet: WalletScreen,
  },
  config
);

WalletStack.navigationOptions = {
  tabBarLabel: 'Wallet',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-wallet'
          : 'md-wallet'
      }
    />
  ),
};

WalletStack.path = '';



const tabNavigator = createBottomTabNavigator({
  HomeStack,
  // LinksStack,
  // HomeyStack,
  ProductStack,
  WalletStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
