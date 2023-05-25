import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { weatherConditions } from '../utils/WeatherConditions';

const Weather = ({ temperature, weatherCondition, country, name , localTime }) => {
  const fallbackWeather = {
    color: '#fff',
    icon: 'weather-not-available',
    title: 'Unknown',
    subtitle: 'Sorry, weather information unavailable.',
  };

  const currentWeather = weatherConditions[weatherCondition] || fallbackWeather;

  const weatherIconUrl = `http://openweathermap.org/img/w/${currentWeather.icon}.png`;

  let titleText;
  let subtitleText;
  
  //ทำเกี่ยวกับ Notification แจ้งเตือน Heat Index
  switch (true) {
    case heatindex >= 40:
      titleText = 'Dangerous Heat';
      subtitleText = 'Stay indoors and keep cool.';
      break;
      
    case heatindex >= 30 && heatindex < 40:
      titleText = 'Extreme Heat';
      subtitleText = 'Take precautions to avoid heat-related illnesses.';
      break;

    case heatindex >= 25 && heatindex < 30:
      titleText = 'High Heat';
      subtitleText = 'Stay hydrated and find shade if possible.';
      break;

    case heatindex >= 0 && heatindex < 24:
      titleText = 'Low Heat';
      subtitleText = 'Low Heat Stay Safe';
      break;

    default:
      titleText = currentWeather.title;
      subtitleText = currentWeather.subtitle;
  }

  return (
    <View
      style={[
        styles.weatherContainer,
        { backgroundColor: currentWeather.color },
      ]}
    >
      <View style={styles.headerContainer}>
        <Text style={styles.temperatureText}>{temperature}°C</Text>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.countryText}>{country}</Text>
        <Text style={styles.countryText}>{localTime}</Text>
        <Image source={{ uri: weatherIconUrl }} style={styles.weatherIcon} />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{titleText}</Text>
        <Text style={styles.subtitle}>{subtitleText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temperatureText: {
    fontSize: 48,
    color: '#fff',
  },
  nameText: {
    fontSize: 37,
    color: '#fff',
    marginBottom: 5,
  },
  countryText: {
    fontSize: 24,
    color: '#fff',
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Weather;
