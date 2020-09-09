import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { ActionCreators } from '../../redux/ActionCreators'
const mapStateToProps = (state) => ({
	user_login: state.user_login
})
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCheckCircle,
  faHome,
  faShoppingCart,
  faUser,
} from '@fortawesome/free-solid-svg-icons';


class Navbarbottom extends Component {
  constructor(props) {
    super(props);
    this.state = {
        textNavbar:[
            {text:'Home'},
            {text:'Kiểm tra'},
            {text:'Khóa học'},
            {text:'Tài khoản'}
        ],
		action: (this.props.user_login) ? 'User' : 'Login' 
    };
	
  }

  render() {
      const textNavbar = this.state.textNavbar;
    return (
     <View style={[styles.grid,styles.footer_section]}>
      		<TouchableOpacity style={styles.col_20} onPress={() => this.props.navigation.navigate('Home')} >
      			<View style={styles.f_image}>
	      			<Icon name={'ios-home'} size={20} color='#fff' />
		       		
	       		</View>
	       		<View style={styles.aligncenter}>
	       			<Text style={styles.f_text}>Home</Text>
	       		</View>
      		</TouchableOpacity>
      		<TouchableOpacity style={styles.col_20} onPress={() => this.props.navigation.navigate('List', {id: 0})} >
      			<View style={styles.f_image}>
	      			<Icon name={'md-list'} size={20} color='#fff' />
		       		
	       		</View>
	       		<View style={styles.aligncenter}>
	       			<Text style={styles.f_text}>Sản phẩm</Text>
	       		</View>
      		</TouchableOpacity>
      		<TouchableOpacity style={styles.col_20} onPress={() => this.props.navigation.navigate('Sale')}>
      			<View style={styles.f_image}>
	      			<Icon name={'md-gift'} size={20} color='#fff' />
		       		
	       		</View>
	       		<View style={styles.aligncenter}>
	       			<Text style={styles.f_text}>Khuyến mại</Text>
	       		</View>
      		</TouchableOpacity>
      		<TouchableOpacity style={styles.col_20}  onPress={() => this.props.navigation.navigate('New')}>
      			<View style={styles.f_image}>
	      			<Icon name={'md-albums'} size={20} color='#fff' />
		       		
	       		</View>
	       		<View style={styles.aligncenter}>
	       			<Text style={styles.f_text}>Thông tin</Text>
	       		</View>
      		</TouchableOpacity>
      		<TouchableOpacity style={styles.col_20} onPress={() => this.props.navigation.navigate('Login')}>
      			<View style={styles.f_image}>
	      			<Icon name={'md-person'} size={20} color='#fff' />
		       		
	       		</View>
	       		<View style={styles.aligncenter}>
	       			<Text style={styles.f_text}>Tài khoản</Text>
	       		</View>
      		</TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  grid:{
  	flexDirection:'row',
    flexWrap:'wrap',
	width:width,
	position: 'absolute',
  },
  footer_section:{
	bottom:-20,
  	backgroundColor:'#fc5b31',
  	height:80,
  },
  col_20:{
  	width:width*0.2,
  },
  aligncenter:{
  	alignItems:'center',
  },
  f_image:{
  	marginTop:10,
  	alignItems:'center',
  },
  f_text:{
  	fontSize:10,
  	color:'#fff',
  	marginTop:5,
  },
});
 export default connect(mapStateToProps)(Navbarbottom)