import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Header from './components/Header';
import Navbar from './components/navbar';
import StatusbarCustom from './components/StatusbarCustom';

export default class Checkoutcomplete extends React.Component {
  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
      {/* Statusbar components */}
          <StatusbarCustom />
      {/* End Statusbar components */}
      {/* Content here */}
       <ScrollView style={{backgroundColor:'#fff'}}>
          <Header navigation={this.props.navigation} />
          <View style={styles.middle}>
                <Image 
                    source={require('./images/complete.png')}
                />
                <Text style={styles.tran_complete}>Giao dịch thành công</Text>
          </View>
       </ScrollView>
      {/* End Content here */} 
          <View style={styles.button_box}>
             <TouchableOpacity style={styles.bottom_button} onPress={() => this.props.navigation.navigate('Home')}>
                  <Text style={styles.buy}>Tiếp tục mua sắm</Text>
             </TouchableOpacity>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:height,
  },
  middle:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:height*0.1,
  },
  button_box:{
    height:80,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:10,
    borderTopWidth:1,
    borderColor:'#9B9B9B',
  },
  bottom_button:{
    borderRadius:20,
    backgroundColor:'#fc5b31',
  },
  buy:{
    paddingTop:10,
    paddingBottom:10,
    textAlign:'center',
  },
  tran_complete:{
    fontSize:16,
    textTransform:'uppercase',
  },
});