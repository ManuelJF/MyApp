/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import Analytics from 'mobile-center-analytics'
import Crashes from 'mobile-center-crashes'
import CodePush from 'react-native-code-push'


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      logs: []
    }
  }
  sendEvent () {
    Analytics.trackEvent('My Custom Event', {
      prop1: new Date().getSeconds()
    })
  }
  naviteCrash () {
    Crashes.generateTestCrash()
  }
  jsCrash () {
    this.func1()
  }
  func1 () {
    this.func2()
  }
  func2 () {
    this.func3()
  }
  func3 () {
    this.func4()
  }
  func4 () {
    this.func5()
  }
  func5 () {
    throw new Error('JS Exception!!!!')
  }
  codepushSync () {
    this.setState({ logs: ['Started at' + new Date().getTime()] })
    CodePush.sync({
      updateDialog: true,
      installMode: CodePush.InstallMode.INMEDIATE
    }, status => {
      for (var key in CodePush.SyncStatus) {
        if (status === CodePush.SyncStatus[key]) {
          this.setState(prevState => ({ logs: [...prevState.logs, key.replace(/_/g, ' ')] }))
        }
      }
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.codepush}>ADDED WITH CODE PUSH!!!</Text>
        <Button
          title='Send Event'
          onPress={() => this.sendEvent()}
        />
        <Button
          title='Native Crash'
          onPress={() => this.naviteCrash()}
        />
        <Button
          title='JS Crash'
          onPress={() => this.jsCrash()}
        />
        <Button
          title='Code Push'
          onPress={() => this.codepushSync()}
        />
        <Text>{JSON.stringify(this.state.logs)}</Text>
      </View>
    );
  }
}

export default CodePush({
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  installMode: CodePush.InstallMode.ON_NEXT_RESUME
})(App)

const styles = StyleSheet.create({
  codepush: {
    fontSize: 25,
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
