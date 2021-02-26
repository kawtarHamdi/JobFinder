import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TextInput } from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polygon,
  Circle,
} from 'react-native-maps';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import { DataMock } from './shared/Constants';

export default function JobsMap() {
  const [jobs, setJobs] = useState(DataMock);
  const [initialPosition, setInitialPosition] = useState({
    latitude: 34.0071,
    longitude: -6.8457,
    latitudeDelta: 0.09,
    longitudeDelta: 0.035,
  });
  const [closeJobs, setCloseJobs] = useState(jobs);
  const [search, setSearch] = useState('');

  useEffect(() => {
    requestLocationPermission();
    //Reverse geocoding API: city name from coordinates MOCK , as the API key requires a billing account
    //Should Pass City's name from Current Position as Argument
    filterJobsByCity('Rabat');
  }, []);

  requestLocationPermission = async () => {
    //For Android
    var response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    console.log('Android: ' + response);

    if (response === 'granted') {
      locateCurrentPosition();
    }
  };

  //Retrieve current Coordinates
  locateCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        let currentPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.035,
        };
        setInitialPosition(currentPosition);
        console.log('current position : ' + JSON.stringify(initialPosition));
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 },
    );
  };

  //Filter Jobs by City
  filterJobsByCity = (cityName) => {
    const jobsByCity = jobs.filter((item) => {
      const itemCity = `${item.city.toUpperCase()}`;
      return itemCity.indexOf(cityName.toUpperCase()) > -1;
    });

    setCloseJobs(jobsByCity);
  };

  //Animate to coordinates' Region
  animateToRegion = (location, index) => {
    _map.animateToRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.09,
      longitudeDelta: 0.035,
    });
  };

  searchFilterFunction = (text) => {
    filterJobsByCity(text);
    setSearch(text);

    //Reverse geocoding of Address : Process needed : converting City name to coordinates MOCK
    //as the API key requires a billing account
    let city =
      text.toUpperCase() === 'CASABLANCA'
        ? { latitude: 33.5731, longitude: -7.5898 }
        : { latitude: 33.9716, longitude: -6.8498 };
    animateToRegion(city);
  };

  return (
    <View style={styles.containerView}>
      <MapView
        provider={PROVIDER_GOOGLE}
        ref={(map) => (_map = map)}
        showsUserLocation={true}
        style={styles.mapView}
        initialRegion={initialPosition}
      >
        <Polygon
          coordinates={closeJobs}
          fillColor={'rgba(100, 100, 200, 0.3)'}
        />
        <Circle
          center={initialPosition}
          radius={1000}
          fillColor={'rgba(200, 300, 200, 0.5)'}
        />
        <Marker description="My Location" coordinate={initialPosition}>
          <Callout>
            <Text>{'My Location'}</Text>
          </Callout>
        </Marker>

        {closeJobs.map((marker, index) => (
          <Marker
            key={marker.title}
            onPress={() => animateToRegion(marker, index)}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
          >
            <Callout>
              <Text>{marker.title}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <TextInput
        style={styles.searchCityTextInput}
        onChangeText={(text) => searchFilterFunction(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Search For City ..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
  searchCityTextInput: {
    marginRight: 100,
  },
});
