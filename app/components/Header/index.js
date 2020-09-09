import React, {Component} from 'react';
import {
  StyleSheet,View,
  TextInput,
  Text,
  TouchableOpacity, StatusBar, Image, Dimensions,
} from 'react-native';
import { Button,ThemeProvider } from 'react-native-elements';

import {colors,images} from '../../configs/index';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;




export default class Header extends Component {
  constructor(props) {
    super(props);
	 this.state = {
          search: this.props.params,
          
     }
	
	
  }
  render() {
    const { navigate, search } = this.props.navigation;

    return (
        <View style={[styles.topnav,styles.grid]}>
            <TouchableOpacity style={styles.tn_left} onPress={() => this.props.navigation.pop()}>
                <Image
                    source={require('../images/back.png')}
                />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tn_middle}>
              <Image
                source={require('../images/logo.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.tn_right} onPress={() => this.props.navigation.navigate('Cart')}>
              <View style={styles.tn_number}>
                <Text style={styles.tn_text}>10</Text>
              </View>
                <Image
                  source={require('../images/bag.png')}
                />
            </TouchableOpacity>
          </View>
    );
  }
}

const styles = StyleSheet.create({
   grid:{
    flexDirection:'row',
    flexWrap:'wrap',
  },
  topnav:{
    backgroundColor:'#FC5B31',
  },
  tn_left:{
    width:width*0.20,
    justifyContent:'center',
    alignItems:'flex-start',
    paddingTop:5,
    paddingBottom:10,
    paddingLeft:10,
  },
  tn_middle:{
    width: width*0.6,
    justifyContent:'center',
    alignItems:'center',
    paddingTop:5,
    paddingBottom:10,
	 
  },
  tn_right:{
    width:width*0.2,
    justifyContent:'center',
    alignItems:'center',
    paddingTop:5,
    paddingBottom:10,
    paddingLeft:7,
  },
  tn_number:{
    borderRadius:50,
    backgroundColor:'#000',
    position: 'absolute',
    right:12,
    top:12,
  },
  tn_text:{
    color:'#fff',
    fontSize:8,
    paddingTop:2,
    paddingRight:2,
    paddingLeft:2,
    paddingBottom:2, 
  },
});
