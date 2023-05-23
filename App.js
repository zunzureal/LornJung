import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { API_KEY } from './utils/WeatherAPIKey';
import Weather from './components/Weather';
import { format } from 'date-fns';

export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error: null,
    country: null,
    localTime: null,
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
    this.setState({ isLoading: true });
  
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
  
        const timestamp = json.dt;
        const timezoneOffset = json.timezone;
        const cel = json.main.temp;
        const humidity = json.main.humidity;

        const date = new Date((timestamp + timezoneOffset) * 1000); // Convert timestamp and offset to milliseconds

        const fahrenheit = cel * (9/5) + 32;
        const heatindex = -42.379 + (2.04901523 * fahrenheit) + (10.14333127 * humidity) - (0.22475541 * (fahrenheit * humidity)) - (0.00683783 * (fahrenheit ** 2)) - (0.05481717 * (humidity ** 2)) + (0.00122874 * ((fahrenheit ** 2) * humidity)) + (0.00085282 * (fahrenheit * (humidity ** 2))) - (0.00000199 * (fahrenheit ** 2) * (humidity ** 2));

  
        const options = {
          hour: 'numeric',
          minute: 'numeric',
          hour12: false,
        };
  
        const localTime = date.toLocaleTimeString('en-US', options);
  
        console.log(localTime);
  
        this.setState({
          isLoading: false,
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          country: json.sys.country,
          name: json.name,
          heatindex,
          localTime,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false, error: 'Error Fetching Weather' });
      });
  };
  
  render() {
    const { isLoading, temperature, weatherCondition, error, country, name, heatindex, localTime } =
      this.state;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <Text style={styles.loadingText}>Fetching The Weather</Text>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <Weather
            temperature={temperature}
            weatherCondition={weatherCondition}
            country={country}
            name={name}
            heatindex={heatindex}
            localTime={localTime}
          />
        )}
      </View>
    );
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
