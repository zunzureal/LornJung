import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import * as Location from "expo-location";
import { API_KEY } from "./utils/WeatherAPIKey";
import Weather from "./components/Weather";

const image = {
  uri: "https://docs.expo.dev/static/images/tutorial/splash.png",
};

export default class App extends React.Component {
  state = {
    isLoading: false,
    temperature: 0,
    weatherCondition: null,
    error: null,
    country: null,
  };

  componentDidMount() {
    Location.requestForegroundPermissionsAsync()
      .then(({ status }) => {
        if (status === "granted") {
          Location.getCurrentPositionAsync()
            .then((position) => {
              this.fetchWeather(
                position.coords.latitude,
                position.coords.longitude
              );
            })
            .catch((error) => {
              console.error("Error Getting Weather Conditions:", error);
              this.setState({
                isLoading: false,
                error: "Error Getting Weather Conditions",
              });
            });
        } else {
          this.setState({
            isLoading: false,
            error: "Location permission not granted",
          });
        }
      })
      .catch((error) => {
        console.error("Error Getting Location Permission:", error);
        this.setState({
          isLoading: false,
          error: "Error Getting Location Permission",
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
        this.setState({
          isLoading: false,
          temperature: json.main.temp,
          weatherCondition: json.weather[0].main,
          country: json.sys.country,
          name: json.name,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ isLoading: false, error: "Error Fetching Weather" });
      });
  };

  render() {
    const { isLoading, temperature, weatherCondition, error, country, name } =
      this.state;

    return (
      <ImageBackground source={require("./sun.jpg")} style={styles.image}>
        <View style={styles.container}>
          <View style={styles.boxer}>
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
              />
            )}
          </View>

          <View style={styles.boxer}>
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
              />
            )}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 20,
    color: "rgba(236, 153, 95, 1)",
  },
  errorText: {
    fontSize: 20,
    color: "red",
  },
  boxer: {
    paddingTop: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    margin: 20,
    borderRadius: 10,
  },
});
