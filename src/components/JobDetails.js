import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  Button,
  LogBox,
  SafeAreaView,
  ScrollView,
} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export default function JobDetails({ route, navigation }) {
  const [applied, setApplied] = useState(route.params.item.applied);
  const onPressApply = () => {
    setApplied(!applied);
    route.params.itemHandler(route.params.item);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.titleStyle}> {route.params.item.title}</Text>
        <Text style={styles.descriptionText}>
          {route.params.item.description}
        </Text>
        <Button
          onPress={onPressApply}
          title="Apply"
          color="#0000ff"
          disabled={applied}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    marginHorizontal: 20,
  },
  titleStyle: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingLeft: 10,
    margin: 5,
  },
  descriptionText: {
    fontSize: 20,
    paddingLeft: 10,
    marginTop: 20,
  },
});
