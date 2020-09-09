import React, {Component} from 'react';
import {
  StyleSheet,View,
  TextInput,
  Linking,
  Text,
  TouchableOpacity, StatusBar, Image, Dimensions,
} from 'react-native';
import { Button,ThemeProvider } from 'react-native-elements';

import {colors,images} from '../../configs/index';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import Icon from 'react-native-vector-icons/Ionicons'
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import { ActionCreators } from '../../redux/ActionCreators'
const mapStateToProps = (state) => ({
	user_login: state.user_login,
	cart: state.cart,
})



class Logo extends Component {
  constructor(props) {
    super(props);
	this.state = {
            homeu:this.props.homeu,
            page:1,
            search: '',
			action: (this.props.user_login) ? 'User' : 'Login',
			length: (this.props.cart == null) ? 0 : this.props.cart.length,
    }
	
  }
  _search = () => {
	
	this.setState({
		 page: 1,
		 progess: true,
	  })
	apis.getSearch(this.state.search, this.state.page).then(res => {
			let array_page =[]
			let pages
			if((res.data.count % 50) != 0){
				pages = parseInt(res.data.count / 50) + 1;
			}else{
				pages = parseInt(res.data.count / 50);
			}
			for(let i = 0;  i < pages ; i++){
				let key = i + 1;
				array_page.push(key)
			}
			for(let a = 0 ; a < res.data.rows.length; a++){
				res.data.rows[a].value_ = 1
			}
			this.setState({
				products: res.data.rows,
				count: res.data.count,
				progess: false,
				array_page: array_page,
			})	
			
		})
  }
  _facebook = () => {
	 
	  	Linking.openURL("fb-messenger://user-thread/847849025591113");
		
	 }
  render() {
    const { navigate, search } = this.props.navigation;

    return (
    <View>
    <View style={{backgroundColor:'#fc5b31',height:height*0.05,marginBottom:-16,}}></View>
		<View style={[styles.topnav,styles.grid]}>
			{(this.state.homeu != null) ?
       			<TouchableOpacity style={styles.tn_left}>
       				<Image
       					source={require('../images/logo.png')}
       				/>
       			</TouchableOpacity>
				 : <TouchableOpacity style={styles.tn_left}  onPress={() =>{this.props.navigation.navigate('Home')}}>
				 <View style={{height: 40,paddingLeft:15,}}>
				 <Icon style={{marginTop: 5}} name={'ios-arrow-back'} size={35} color='#fff' />
				 
				 </View>
                
            </TouchableOpacity>
			}
       			<View style={styles.tn_middle}>
			
       				
       			</View>
       			<TouchableOpacity style={[styles.tn_right, {marginRight: 10, position: 'absolute', right: 37, top: 4}]}   onPress={() =>{this.props.navigation.navigate('Cart')}}>
       				<Text style={[styles.tn_text,{fontSize: 13,color:'#000', width: 20, height: 20, position:'absolute', top: 9, right: 1, zIndex: 1000, fontWeight: 'bold'}]}>{this.state.length}</Text>
	       			<Icon name={'md-cart'} size={40} color='#fff' />
       			</TouchableOpacity>
				<TouchableOpacity style={[styles.tn_right, {marginRight: 10, position: 'absolute', right: 2, top: 6}]}   onPress={this._facebook}>
       				
	       			<Icon name={'ios-chatbubbles'} size={35} color='#fff' />
       			</TouchableOpacity>
				{(this.state.homeu != null) ?
				<View style={styles.search_section}>
                  <TextInput style = {styles.input}
                     placeholder = "Tìm kiếm sản phẩm"
                     placeholderTextColor = "#8D8D8D"
					 onChangeText={(search) => this.setState({ search })}
					 value={this.state.search}
                     autoCapitalize = "none"
                  />
                  <TouchableOpacity style={styles.search_icon}  onPress={() =>{this.props.navigation.navigate('Search', {val: this.state.search})}}>
                    <Image
                          source={require('../../images/search.png')}
                      />
                  </TouchableOpacity>
              </View> : <View style={[styles.search_section, {}]}>
                  <TextInput style = {styles.input}
                     placeholder = "Tìm kiếm sản phẩm"
                     placeholderTextColor = "#8D8D8D"
					 onChangeText={(search) => this.setState({ search })}
					 value={this.state.search}
                     autoCapitalize = "none"
                  />
                  <TouchableOpacity style={styles.search_icon}  onPress={() =>{this.props.navigation.navigate('Search', {val: this.state.search})}}>
                    <Image
                          source={require('../../images/search.png')}
                      />
                  </TouchableOpacity>
              </View>
				}
       		</View>
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
  	
  	justifyContent:'center',
  	alignItems:'center',
    paddingTop:5,
    paddingBottom:10,
  },
  tn_middle:{
  	
  	justifyContent:'center',
  	alignItems:'flex-end',
    paddingTop:5,
    paddingBottom:10,
  },
  tn_right:{
  	
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
	  width: width - 150,
    },
    search_section:{
		flexDirection:'row',
		position:'absolute',
		width: width - 150,
		zIndex:10,
		left: 40,
		top: 8,
    },
    search_icon:{
      justifyContent:'center',
      alignItems:'center',
      marginLeft:-50,
    },
    
});
export default connect(mapStateToProps)(Logo)