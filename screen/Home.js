import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import OrderHistoryNew from './orderhistorynew';
import NewOrder from './neworder';
import PriceList from './pricelist';

const Tab = createBottomTabNavigator();

export default function BottomStack() {
  return (
      <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name="OrderHistory" component={OrderHistoryNew} options={{
      tabBarLabel: 'Order History',
      tabBarIcon: ({ color, size }) => (
        <Icon name="history" color={color} size={size} />
      ),
    }} />
        <Tab.Screen name="NewOrder" component={NewOrder} options={{
      tabBarLabel: 'New Order',
      tabBarIcon: ({ color, size }) => (
        <Icon name="plus" color={color} size={size} />
      ),
    }} />
        <Tab.Screen name="PriceList" component={PriceList} options={{
      tabBarLabel: 'Price List',
      tabBarIcon: ({ color, size }) => (
        <Icon name="list" color={color} size={size} />
      ),
    }}  />
      </Tab.Navigator>
  );
}