import React from 'react';
import AppNavigator from './AppNavigator';
import Axios from 'axios';
import { View, Alert } from 'react-native'
import { colors, settings } from './app/configs/index'
import { connect } from 'react-redux'
import { ActionCreators } from './app/redux/ActionCreators'
import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './app/redux/configureStore'
import { AsyncStorage } from 'react-native'; 

import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

import type { Notification } from 'react-native-firebase';
const { persistor, store } = configureStore()
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})

class App extends React.Component {
  constructor(props) {
        super(props)
        Axios.defaults.baseURL = settings.ServiceAddress
        Axios.defaults.timeout = 30000
        if (this.props.user_login) {
			
            Axios.defaults.headers = { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.props.user_login.token
            }
        } else {
            Axios.defaults.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        Axios.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            // console.log(error.response)
            // if (error.response.status === 401) {
            //     props.dispatch(ActionCreators.set_user_login(null))
            //     Actions.login({ type: ActionConst.REPLACE })
            // } else
            //     return Promise.reject(error);
        });
    } 


  async componentDidMount() {
  this.requestUserPermission();
  this.checkApplicationPermission();
}

  
async requestUserPermission() {
  const authorizationStatus = await messaging().requestPermission({
    sound: true,
    announcement: true,
    provisional: true,
    alert:true,
  });

  if (authorizationStatus) {
    console.log('Permission status:', authorizationStatus);
  }
}

async checkApplicationPermission() {
  const authorizationStatus = await messaging().requestPermission();

  if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
    console.log('User has notification permissions enabled.');
  } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
    console.log('User has provisional notification permissions.');
  } else {
    console.log('User has notification permissions disabled');
  }
}
  render() {
    return (
	<Provider store={store}>
        <PersistGate
          loading={<View />}
          persistor={persistor}>
          <AppNavigator store={store} />
        </PersistGate>
      </Provider>
     
	
    );
  }
}
export default App
