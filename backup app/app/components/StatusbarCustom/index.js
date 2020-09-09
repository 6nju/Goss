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
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { ActionCreators } from '../../redux/ActionCreators'
const mapStateToProps = (state) => ({
	user_login: state.user_login
})



class StatusbarCustom extends Component {
  constructor(props) {
    super(props);
	this.state = {
            
    }
  }
	
  render() {
    

    return (
       
		<View>
        <StatusBar
                    barStyle="light-content"
                    backgroundColor='#fc5b31'
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
  topnav:{
    backgroundColor:'#fc5b31',
  },
  tn_left:{
  	width:width*0.24,
  	justifyContent:'center',
  	alignItems:'center',
    paddingTop:5,
    paddingBottom:10,
  },
  tn_middle:{
  	width:width*0.61,
  	justifyContent:'center',
  	alignItems:'flex-end',
    paddingTop:5,
    paddingBottom:10,
  },
  tn_right:{
  	width:width*0.15,
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
    header_text:{
      color:'red',
    },
    header_banner:{
		width: width,
		height: 112*width/375
	},
    header_left:{
      paddingLeft:15,
      width:width*0.33,
      alignItems:'flex-start',
    },
    header_middle:{
      width:width*0.33,
      alignItems:'center',
    },
    header_end:{
      paddingRight:15,
      width:width*0.33,
      alignItems:'flex-end',
    },
    header_image_section:{
      flexDirection:'row',
      flexWrap: 'wrap',
      position: 'absolute',
      top:50,
    },
    input:{
      marginLeft:20,
      marginRight:20,
      width:width*1-40,
      backgroundColor:'#fff',
      height: 40,
      borderRadius:5,
      borderColor:'#fff',
      borderWidth:1, 
	  paddingLeft: 10,
	  width: width - 140,
    },
    search_section:{
		flexDirection:'row',
		position:'absolute',
		width: width - 100,
		zIndex:10,
		left: 70,
		top: 8,
    },
    search_icon:{
      justifyContent:'center',
      alignItems:'center',
      marginLeft:-50,
    },
    
});
export default connect(mapStateToProps)(StatusbarCustom)