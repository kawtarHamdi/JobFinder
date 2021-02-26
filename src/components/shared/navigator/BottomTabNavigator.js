import React from 'react';
import { Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DisplayJobsAndDetails, JobsOnMap } from './StackNavigator';
import { listIcon, mapIcon } from '../Constants';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="DisplayJobsAndDetails"
        component={DisplayJobsAndDetails}
        options={{
          tabBarLabel: 'Available Jobs',
          tabBarIcon: () => (
            <Image
              source={listIcon}
              style={{
                width: 25,
                height: 25,
                borderRadius: 5,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="JobsOnMap"
        component={JobsOnMap}
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: () => (
            <Image
              source={mapIcon}
              style={{
                width: 30,
                height: 30,
                borderRadius: 5,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
