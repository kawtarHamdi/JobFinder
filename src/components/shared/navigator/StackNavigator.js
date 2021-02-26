import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DisplayJobs from '../../DisplayJobs';
import JobDetails from '../../JobDetails';
import JobsMap from '../../JobsMap';

const Stack = createStackNavigator();

const DisplayJobsAndDetails = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DisplayJobs"
        component={DisplayJobs}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="JobDetails"
        component={JobDetails}
        options={{
          title: 'Job Details',
          headerTitleStyle: { textAlign: 'center' },
        }}
      />
    </Stack.Navigator>
  );
};

const JobsOnMap = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="JobsMap"
        component={JobsMap}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export { DisplayJobsAndDetails, JobsOnMap };
