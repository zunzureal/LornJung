import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Location from 'expo-location';
import { API_KEY } from './utils/WeatherAPIKey';
import Weather from './components/Weather';

export default class App extends React.Component {
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null,
  };

  componentDidMount() {
    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {
        if (status === 'granted') {
          Location.getCurrentPositionAsync()
            .then((position) => {
              this.fetchWeather(
                position.coords.latitude,
                position.coords.longitude
              );
            })
            .catch((error) => {
              console.error('Error Getting Weather Conditions:', error);
              this.setState({
                isLoading: false,
                error: 'Error Getting Weather Conditions',
              });
            });
        } else {
          this.setState({
            isLoading: false,
            error: 'Location permission not granted',
          });
        }
      })
      .catch((error) => {
        console.error('Error Getting Location Permission:', error);
        this.setState({
          isLoading: false,
          error: 'Error Getting Location Permission',
        });
      });
  }

  fetchWeather = (lat = 25, lon = 25) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          isLoading: false,
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false, error: 'Error Fetching Weather' });
      });
  };

  render() {
    const { isLoading, temperature, weatherCondition, error } = this.state;

    if (isLoading) {
      return (
        <View style={styles.container}>
          <Text style={styles.loadingText}>Fetching The Weather</Text>
        </View>
      );
    } else if (error) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Weather
            temperature={temperature}
            weatherCondition={weatherCondition}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 20,
    color: '#000',
  },
  errorText: {
    fontSize: 20,
    color: 'red',
  },
});
