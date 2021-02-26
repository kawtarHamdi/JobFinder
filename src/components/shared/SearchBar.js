import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function SearchBar(props) {
  const { jobs, component, search, handleSearch } = props;

  searchFilterFunction = (text) => {
    let newData = jobs.filter((item) => {
      let itemData = `${item.title.toUpperCase()} ${item.description.toUpperCase()} ${item.city.toUpperCase()}`;
      let textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    handleSearch(newData, text);
  };

  return (
    <TextInput
      style={
        component === 'DisplayJobs'
          ? styles.searchBarTextInput
          : styles.searchCityTextInput
      }
      onChangeText={(text) => searchFilterFunction(text)}
      value={search}
      underlineColorAndroid="transparent"
      placeholder={
        component === 'DisplayJobs' ? 'Search Here ...' : 'Search For City ...'
      }
    />
  );
}

const styles = StyleSheet.create({
  searchBarTextInput: {
    height: 40,
    flexGrow: 1,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  searchCityTextInput: {
    width: 150,
  },
});
