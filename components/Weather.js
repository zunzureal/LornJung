import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { weatherConditions } from '../utils/WeatherConditions';

const Weather = ({ temperature, weatherCondition }) => {
  const fallbackWeather = {
    color: '#fff',
    icon: 'weather-not-available',
    title: 'Unknown',
    subtitle: 'Sorry, weather information unavailable.',
  };

  const currentWeather =
    weatherConditions[weatherCondition] || fallbackWeather;

  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: currentWeather.color },
      ]}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.temperatureText}>{temperature}°C</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{currentWeather.title}</Text>
        <Text style={styles.subtitle}>{currentWeather.subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  temperatureText: {
    fontSize: 48,
    color: '#fff',
  },
  bodyContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: '10%',
    marginBottom: '10%',
  },
  title: {
    fontSize: 48,
    color: '#fff',
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
  },
});

export default Weather;
