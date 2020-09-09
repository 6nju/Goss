import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default class CartItem extends React.Component {
  render() {
    return (
          <View style={[styles.grid,styles.box]}>
            <View style={styles.w20}>
                <Image 
                      source={require('./images/user_image.png')}
                />
            </View>
            <View style={styles.w70}>
              <Text style={styles.title}>T-Shirt Summer Vibes</Text>
                <View >
                    <View style={styles.line1}>
                        <Text style={styles.top_left_code}>#261311</Text>
                        <Text style={styles.top_right_color}>Trắng X1</Text>
                    </View>
                    <View style={styles.line1}>
                        <Text style={styles.bottom_left_date}>12/03/2020</Text>
                        <Text style={styles.right_bottom_price}>120.000đ</Text>
                    </View>
                </View>
            </View>
            <View style={styles.w10}>
                  <TouchableOpacity>
                    <Image 
                          source={require('./images/cancel.png')}
                    />
                  </TouchableOpacity>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box:{
    marginTop:20,
  },
  grid:{
    flexDirection:'row',
    flexWrap:'wrap',
  },
  w20:{
    alignItems:'center',
    width:width*0.2,
  },
  w70:{
    width:width*0.7,
    paddingLeft:10,
  },
  w10:{
    width:width*0.1,
    alignItems:'center',
  },
  title:{
    color:'#000',
    fontSize:15,
  },
  right_bottom_price:{
    position: 'absolute',
    fontSize:15,
    fontWeight:'bold',
    color:'red',
    right:10,
  },
  bottom_left_date:{
    color:'#A8A8A8',
    fontSize:13,
  },
  top_right_color:{
    position: 'absolute',
    fontSize:14,
    color:'#000',
    right:10,
  },
  top_left_code:{
    color:'#C4C4C4',
    fontSize:13,
  },
  line1:{
    marginTop:5,
    marginBottom:5,
  },
});

