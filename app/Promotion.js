import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import  CartItem  from './components/CartItem'
import Header from './components/Header';
import StatusbarCustom from './components/StatusbarCustom';
import Navbar from './components/navbar';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { Input } from 'react-native-elements';

export default class Promotion extends React.Component {
	
  render() {
    return (
      <View style={styles.container}>
      {/* Statusbar components */}
      		<StatusbarCustom />
      {/* End Statusbar components */}
      {/* Content here */}
       <ScrollView style={{backgroundColor:'#fff'}}>
          <Header navigation={this.props.navigation} />
          <View style={styles.sale_box}>
              <View style={styles.wrap}>
                    <Text style={styles.text}>Chào mừng 30/4 giảm giá 20%</Text>
              </View>
              <View style={styles.wrap_yellow}>
                    <Text style={styles.sale}>20%</Text>
                    <TouchableOpacity><Text style={styles.code}>Lấy mã</Text></TouchableOpacity>
              </View>
          </View>
          <View style={styles.sale_box}>
              <View style={styles.wrap}>
                    <Text style={styles.text}>Chào mừng 30/4 giảm giá 20%</Text>
              </View>
              <View style={styles.wrap_yellow}>
                    <Text style={styles.sale}>20%</Text>
                    <TouchableOpacity><Text style={styles.code}>Lấy mã</Text></TouchableOpacity>
              </View>
          </View>
          <View style={styles.sale_box}>
              <View style={styles.wrap}>
                    <Text style={styles.text}>Chào mừng 30/4 giảm giá 20%</Text>
              </View>
              <View style={styles.wrap_yellow}>
                    <Text style={styles.sale}>20%</Text>
                    <TouchableOpacity><Text style={styles.code}>Lấy mã</Text></TouchableOpacity>
              </View>
          </View>
       </ScrollView>
      {/* End Content here */} 
         <Navbar navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:height,
  },
  sale_box:{
    marginLeft:10,
    marginRight:10,
    marginTop:10,
  },
  wrap:{
    backgroundColor:'#F9F9FC',
    borderColor:'#E2E2E2',
    borderWidth:1,
    borderRadius:30,
    paddingTop:15,
    paddingBottom:15,
  },
  text:{
    textAlign:'right',
    paddingRight:35,
    color:'#000',
    fontSize:13,
  },
  wrap_yellow:{
    width:width*0.3,
    backgroundColor:'#fc5b31',
    borderColor:'#E2E2E2',
    borderWidth:1,
    borderRadius:30,
    position: 'absolute',
    paddingTop:5,
    paddingBottom:5,
  },
  sale:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:14,
    color:'#fff',
  },
  code:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:14,
    color:'#000',
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: "#000"
  },
  countdown:{
  	backgroundColor:'#fc5b31',
  	paddingBottom:30,
  	paddingTop:20,
	marginTop: -70,
  },
  normal_item_section:{
  	marginTop:25,
  },
  normal_i_title:{
  	color:'#000',
  	marginLeft:15,
  	fontSize:16,
  },
  normal_i_lmbox:{
  	position:'absolute',
  	right:15,
  	top:5,
  },
  normal_i_loadmore:{
  	color:'#A8A8A8',
  	fontSize:10,
  	textTransform: 'uppercase',
  	textDecorationLine: 'underline',
  	fontWeight:'bold',
  },
  text:{
  	alignItems:'center',
  	marginBottom:10,
  },
  text_color:{
  	color:'red',
  },
	section_flashsale:{
      marginTop:-15,
    },
	wrapper:{
		flex: 1
	},
	hot_fuction:{
      flexDirection:'row',
      flexWrap: 'wrap',
      paddingTop:7,
      paddingBottom:7,
      backgroundColor:'#3191cf',
    },
    hot_left_fuction:{
      width:width*0.5,
      alignItems:'flex-start',
      paddingLeft:25,
    },
	hot_title:{
      textTransform:'uppercase',
      color:'#fff'
    },
    hot_right_fuction:{
      width:width*0.5,
      alignItems:'flex-end',
      paddingRight:25,
    },
    hot_text:{
      fontSize:13,
    },
	bottom_bar:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopColor:'#e6e6e6',
    borderTopWidth:2,
    position:'absolute',
    bottom:0,
    backgroundColor:'#f8f8f8',
    paddingBottom:20,
  },
  width25:{
    width:width*0.25,
    alignItems:'center',
    marginTop:5,
  },
	 about_section:{
      alignItems:'center',
      paddingTop:20,
      paddingBottom:30,
      marginBottom:80,
    },
    contact_me:{
      flexDirection:'row',
      flexWrap: 'wrap',
    },
    mg_8x8:{
      marginLeft:8,
      marginRight:8,
    },
    mg_top25:{
      marginTop:25,
    },
    conpany:{
      textTransform:'uppercase',
      marginTop:10,
      fontSize:13,
      color:'#0f1738'
    },
    dash:{
      height:2,
      backgroundColor:'#e5e5e5',
      width:width-60,
      marginTop:5,
      marginBottom:8,
    },
    address:{
      fontSize:13,
      color:'#0f1738'
    },
  bottom_bar:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopColor:'#e6e6e6',
    borderTopWidth:2,
    position:'absolute',
    bottom:0,
    backgroundColor:'#f8f8f8',
    paddingBottom:20,
  },
  width25:{
    width:width*0.25,
    alignItems:'center',
    marginTop:5,
  },
  bottom1:{
    color:'#8d8d8d',
    fontSize:12,
  },
  popup:{
    width:width*0.85,
    position:'absolute',
    backgroundColor:'#fff',
    zIndex:100,
  },
  popup_box:{
    height:height,
  },
  popup_logo:{
    alignItems:'center',
    marginTop:50,
    marginBottom:20,
  },
  exit_button:{
    bottom:50,
    position:'absolute',
    right:20,
  },
  popup_naviga:{
    marginLeft:20,
  },
  popup_naviga_text:{
    paddingTop:5,
    paddingBottom:5,
    textTransform:'uppercase',
    marginTop:10,
  },
    flashsale_fuction:{
      flexDirection:'row',
      flexWrap: 'wrap',
      paddingTop:7,
      paddingBottom:7,
      backgroundColor:'#ededed',
    },
    flashsale_left_fuction:{
      width:width*0.33,
      alignItems:'flex-start',
      paddingLeft:25,
    },
    flashsale_center_fuction:{
      width:width*0.33,
      alignItems:'center',
    },
    flashsale_right_fuction:{
      width:width*0.33,
      alignItems:'flex-end',
      paddingRight:25,
    },
    fl_text:{
      fontSize:13,
    },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontal: {
    marginTop: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  itemcenter: {
    position: 'relative',
    alignItems: 'center'
  },
  banner: {
    width: '100%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#fff',
  },

  textCategory: {
    position: 'absolute',

    textAlign: 'center',
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    color: '#fff',
    backgroundColor: '#ff5c00',
    top: ((width - 40) / 344) * 64 - 5,
    fontSize: 18,
  },

  ctimg: {
    borderRadius: 10,
    width: width - 40,
    height: ((width - 40) / 344) * 128,
    marginTop: 25,
  },
});