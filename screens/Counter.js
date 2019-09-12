// Imports: Dependencies
import React, { Component } from 'react';
import { Button, Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { connect } from 'react-redux';

// Screen Dimensions
const { height, width } = Dimensions.get('window');

// Screen: Counter
class Counter extends React.Component {

  state = {
    newItem: ''
  }

  onChangeText(text) {
    this.setState({
      newItem: text
    })
  }
  /**
   * <Button
              title="Add user"
              onPress={() => this.props.addUser(this.state.newItem)}
              style={styles.loginButton}
            />
            {/*this.props.userlist.map((item, key) => (
              <Text>- {item}</Text>
            ))*/

  render() {
    return (
      <SafeAreaView style={styles.container}>

        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

          <Text style={styles.counterTitle}>{`Phone its: ${(this.props.isConnected) ? 'ONLINE' : 'OFFLINE'}`}</Text>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
            <Button
              title="Login Switch"
              onPress={this.props.loggedIn === false ? () => this.props.reduxLogin(true) : () => this.props.reduxLogin(false)}
              style={styles.loginButton}
            />
            <Text style={[styles.loggedInText, { marginLeft: 10 }]}>Logged In: {`${this.props.loggedIn}`}</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: 10 }}>
            <Button
              title="Login Test"
              onPress={() => this.props.login()}
              style={styles.loginButton}
            />
            <Text style={styles.loggedInText}>{`${(this.props.userData && this.props.userData.token) ? `Token: ${this.props.userData.token}` : 'Not logged'}`}</Text>
          </View>

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginTop: 10 }}>
            <Button
              title="Get Role"
              onPress={() => this.props.getRole()}
              style={styles.loginButton}
            />
            <Text style={[styles.loggedInText, { marginLeft: 10 }]}>{`${(this.props.role.name) ? this.props.role.name : 'Waiting role name...'}`}</Text>
          </View>

        </View>

        <Text style={styles.counterTitle}>Counter</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={() => this.props.reduxIncreaseCounter()}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{this.props.counter}</Text>
          <TouchableOpacity onPress={() => this.props.reduxDecreaseCounter()}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    )
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loggedInContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  loginButton: {
    marginTop: 20,
    paddingTop: 20,
  },
  counterContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loggedInText: {
    fontFamily: 'System',
    fontSize: 17,
    fontWeight: '400',
    color: '#000',
  },
  counterTitle: {
    fontFamily: 'System',
    fontSize: 32,
    fontWeight: '700',
    color: '#000',
  },
  counterText: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '400',
    color: '#000',
  },
  buttonText: {
    fontFamily: 'System',
    fontSize: 50,
    fontWeight: '300',
    color: '#007AFF',
    marginLeft: 40,
    marginRight: 40,
  },
});

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  console.log('State:');
  console.log(state);

  // Redux Store --> Component
  return {
    counter: state.counterReducer.counter,
    loggedIn: state.authReducer.loggedIn,
    userData: state.authReducer.response,
    role: state.roleReducer.role,
    userList: state.authReducer.userList,
    isConnected: state.networkConnectivityReducer.isConnected,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    // Increase Counter
    reduxIncreaseCounter: (payload) => dispatch({
      type: 'INCREASE_COUNTER',
      payload: payload,
    }),
    // Decrease Counter
    reduxDecreaseCounter: (payload) => dispatch({
      type: 'DECREASE_COUNTER',
      payload: payload,
    }),
    // Login
    reduxLogin: (payload) => dispatch({
      type: 'LOGGED_IN',
      payload: payload,
    }),
    login: () => dispatch({
      type: 'USER_LOGIN',
      username: "hansrasch",
      password: "Hrasch22..."
    }),
    getRole: () => dispatch({
      type: 'ROLE_GET'
    }),
    addUser: (userName) => dispatch({
      type: 'ADD_USER',
      user: userName
    })
  };
};

// Exports
export default connect(mapStateToProps, mapDispatchToProps)(Counter);