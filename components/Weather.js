import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { weatherConditions } from "../utils/WeatherConditions";

const Weather = ({ temperature, weatherCondition, country, name }) => {
  const fallbackWeather = {
    color: "#fff",
    icon: "weather-not-available",
    title: "Unknown",
    subtitle: "Sorry, weather information unavailable.",
  };

  const currentWeather = weatherConditions[weatherCondition] || fallbackWeather;

  const weatherIconUrl = `http://openweathermap.org/img/w/${currentWeather.icon}.png`;

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.temperatureText}>{temperature}°C</Text>
        <Text style={styles.nameText}>{name}</Text>
        <Text style={styles.countryText}>{country}</Text>
        <Image source={{ uri: weatherIconUrl }} style={styles.weatherIcon} />
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
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  headerContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  temperatureText: {
    fontSize: "15%",
    color: "#fff",
  },
  nameText: {
    fontSize: "15%",
    color: "#fff",
    marginBottom: "5%",
  },
  countryText: {
    fontSize: "15%",
    color: "#fff",
  },
  weatherIcon: {
    width: 75,
    height: 75,
  },
  bodyContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "10%",
  },
  title: {
    fontSize: "15%",
    color: "#fff",
    textAlign: "center",
    marginBottom: "10%",
  },
  subtitle: {
    fontSize: "15%",
    color: "#fff",
    textAlign: "center",
  },
});

export default Weather;
