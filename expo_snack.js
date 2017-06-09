import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Constants } from 'expo';




class Timer extends Component {

  constructor() {
    super();
    this.state = {
      countDown : false,
      remainingSeconds : 25 * 60,
      interval : null,
    };
  }

  handleStart() {
    var ival = setInterval(() => {
      if ((this.state.remainingSeconds > 0) && this.state.countDown) {
        this.setState(prevState => {
          return {remainingSeconds : prevState.remainingSeconds - 1};
        });
      }
    }, 1000);

    this.setState(prevState => {
      return {
        remainingSeconds : prevState.remainingSeconds, 
        countDown : true,
        interval : ival,
      };
    });
  }

  handleStop() {
    clearInterval(this.state.interval);
    this.setState(prevState => {
      return {
        remainingSeconds : prevState.remainingSeconds,
        countDown : false,
        interval : null,
      };
    });
  }

  handleReset() {
    clearInterval(this.state.interval);
    this.setState(() => {
      return {
        remainingSeconds : 25 * 60, 
        countDown : false,
      };
    });
  }

  formatRemainingSeconds(remainingSeconds) {
    let numMinutes = Math.floor(remainingSeconds / 60);
    let numSeconds = remainingSeconds % 60;
    let formattedTime = "";

    if (numMinutes.toString().length == 1) {
      formattedTime += '0';
      formattedTime += numMinutes.toString();
    } else {
      formattedTime += numMinutes.toString();
    }

    formattedTime += ":";

    if (numSeconds.toString().length == 1) {
      formattedTime += '0';
      formattedTime += numSeconds.toString();
    } else {
      formattedTime += numSeconds.toString();
    }

    return formattedTime;
  }

  render() {
    return (
      <View>
        <Text style={styles.timer}> 
          {this.formatRemainingSeconds(this.state.remainingSeconds)} 
        </Text>
        <Button 
          title="Start" 
          color="green" 
          onPress={() => this.handleStart()}
        /> 
        <Button 
          title="Stop" 
          color="red" 
          onPress={() => this.handleStop()}
        /> 
        <Button 
          title="Reset" 
          color="gray" 
          onPress={() => this.handleReset()}
        /> 
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Modified Tomato Timer
        </Text>
        <Timer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  timer: {
    margin: 24,
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
