import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { Input } from 'react-native-elements';

export default class PayInput extends React.Component {
  render() {
    return (
            <View style={styles.input_box}>
                        <Input
                          placeholder='Họ và tên'
                          inputContainerStyle={styles.inputstyle}
                          inputStyle={{fontSize:13,marginLeft:20,}}
                          containerStyle={{height:50,}}
                        />
             </View>
    );
  }
}

const styles = StyleSheet.create({
  grid:{
    flexDirection:'row',
    flexWrap:'wrap',
  },
  input_box:{
    marginLeft:10,
    marginRight:10,
    marginTop:15,
  },
  inputstyle:{
    borderWidth:1,
    borderRadius:30,
    borderColor:'#D8D8D8',
  },
});

