import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import { DataMock } from './shared/Constants';
import IconBar from './shared/IconBar';

export default function DisplayJobs({ navigation }) {
  const [jobs, setJobs] = useState(DataMock);
  const [searchData, setSearchData] = useState(jobs);
  const [search, setSearch] = useState('');

  flatListSeparator = () => {
    return <View style={styles.flatListSeparator} />;
  };

  handleItem = (item) => {
    let appliedFor = item;
    appliedFor.applied = !item.applied;
    setJobs({ ...jobs, appliedFor });
  };

  itemOnClick = (itemSelected) => {
    navigation.navigate('JobDetails', {
      item: itemSelected,
      itemHandler: handleItem,
    });
  };

  listItem = ({ item }) => {
    return (
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => itemOnClick(item)}
      >
        <View style={styles.itemStyle}>
          <Text style={{ fontWeight: 'bold' }}>{item.title.toUpperCase()}</Text>
          <Text>{item.city}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  searchFilterFunction = (text) => {
    console.log('aaaa text', text);
    console.log('aaaa job', jobs);
    let newData = jobs.filter((item) => {
      let itemData = `${item.title.toUpperCase()} ${item.description.toUpperCase()} ${item.city.toUpperCase()}`;
      let textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    setSearchData(newData);
    setSearch(text);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.searchBarView}>
        <IconBar />
        <TextInput
          style={styles.searchBarTextInput}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="Search Here ..."
        />
      </View>
      <View style={styles.containerView}>
        <FlatList
          contentContainerStyle={{ justifyContent: 'space-between' }}
          data={searchData}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={flatListSeparator}
          renderItem={listItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchBarView: {
    flexDirection: 'row',
  },
  containerView: {
    marginTop: 10,
  },
  itemStyle: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flatListSeparator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
  },
  searchBarTextInput: {
    height: 40,
    flexGrow: 1,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
});
