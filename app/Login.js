import React from 'react';
import { StyleSheet, Text, View, Button,Alert, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
import Header from './components/Header';
import Logo from './components/logo';
import StatusbarCustom from './components/StatusbarCustom';
import { Input, CheckBox } from 'react-native-elements';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { LoginManager } from 'react-native-fbsdk'
import {  faFacebookF, faGooglePlusG  } from '@fortawesome/free-brands-svg-icons';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux'
import Axios from 'axios';
import { ActionCreators } from './redux/ActionCreators'
const mapStateToProps = (state) => ({
	user_login: state.user_login
})

class Login extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
        textNavbar:[
            {text:'Home'},
            {text:'Kiểm tra'},
            {text:'Khóa học'},
            {text:'Tài khoản'}
        ],
		username: '',
		password: '' 
    };
	if(this.props.user_login){this.props.navigation.navigate('User')}
  }
  
  _login = () => {
        const { username, password } = this.state
		
        if (username == '')Alert.alert("Thông báo", 'Bạn Chưa Nhập Email');
        if (password == '') Alert.alert("Thông báo", 'Bạn Chưa Nhập Mật Khẩu');
        this.setState({ process: true }, () => {
            apis.login(username, password)
                .then(res => {
					 
					
                    if (res.data.status) {
                        
                       
                       
						let user = {
							"id": res.data.user.id,
							"name": res.data.user.name,
							"phone": res.data.user.phone,
							"address": res.data.user.address,
			
							"email": res.data.user.email,
							"customerId": res.data.user.id,
						}
				
				
				Alert.alert("Thông báo", 'Bạn đã đăng nhập thành công');
                this.props.dispatch(ActionCreators.set_user_login(user))
				
                this.props.navigation.navigate('Home')
						
                    } else {
                        this.setState({ process: false })
                       Alert.alert("Thông báo", 'Có lỗi khi đăng nhập');
                    }
                })
                .catch(err => {
                    this.setState({ process: false })
                    console.log(err.response)
                   Alert.alert("Thông báo", 'Có lỗi khi đăng nhập');
                })
        })     
    }
handleFacebookLogin () {
    LoginManager.logInWithPermissions(['public_profile', 'email', 'user_friends']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled')
        } else {
          console.log('Login success with permissions: ' + result.grantedPermissions.toString())
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error)
      }
    )
  }
  render() {
    const {goBack} = this.props.navigation;
	const { username, password} = this.state
    return (
      <View style={styles.container}>
      {/* Statusbar components */}
          <StatusbarCustom />
      {/* End Statusbar components */}
      {/* Content here */}
       <ScrollView style={{backgroundColor:'#fff'}}> 
          <Logo navigation={this.props.navigation} />
          <Text style={styles.header}>Đăng nhập</Text>
          <View style={{marginTop:20,}}>
          <Text style={styles.small_text}>Chào mừng bạn đến với</Text>
          <Text style={styles.small_text}>Siêu thị thời trang Goss</Text>
          </View>
          <View style={styles.form}>
                  <View style={styles.input_box}>
                          <Input
                            placeholder='Số điện thoại hoặc Email'
                            inputContainerStyle={styles.inputstyle}
                            inputStyle={{fontSize:13,marginLeft:20,}}
                            containerStyle={{height:50,}}
                            onChangeText={username => this.setState({username})}
                            value={username}
                          />
               </View>
                <View style={styles.input_box}>
                          <Input
                            placeholder='Mật khẩu'
                            inputContainerStyle={styles.inputstyle}
                            inputStyle={{fontSize:13,marginLeft:20,}}
                            rightIconContainerStyle={{marginRight:10,}}
                            containerStyle={{height:50,}}
                            onChangeText={password => this.setState({password})}
                            value={password}
                            rightIcon={
                            <Image 
                                  source={require('./components/images/show_pw.png')}
                            />
                          }
                          />
               </View>
               <View style={styles.section2}>
                   
                      <TouchableOpacity style={styles.forgot_pw}><Text style={styles.f_pw_text}>Quên mật khẩu ?</Text></TouchableOpacity>
               </View>
               
               <TouchableOpacity style={styles.bottom_button} onPress={this._login}>
                  <Text style={[styles.buy, {color: '#fff'}]}>Đăng nhập</Text> 
             </TouchableOpacity>
             <View style={styles.register_box}>
                  <Text style={styles.re_text}>Bạn chưa có tài khoản</Text>
                  <TouchableOpacity style={styles.re_button} onPress={() => this.props.navigation.navigate('Register')}><Text style={styles.re_button_text}>Đăng ký ngay</Text></TouchableOpacity>
             </View>
          </View>
       </ScrollView>
      {/* End Content here */} 
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
    height:height,
  },
  grid:{
    flexDirection:'row',
    flexWrap:'wrap',
  },
  header:{
    fontSize:20,
    fontWeight:'bold',
    color:'#000',
    textAlign:'center',
    marginTop:20,
  },
  small_text:{
    color:'#A8A8A8',
    fontSize:13,
    textAlign:'center',
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
  form:{
    marginTop:height*0.01,
  },
  forgot_pw:{
    position: 'absolute',
    right:20,
    top:18,
  },
  f_pw_text:{
    color:'#A8A8A8',
    fontSize:13,
  },
  gmail:{
    position: 'absolute',
    right:10,
  },
  facebook:{
    marginLeft:10,
  },
  bottom_button:{
    borderRadius:30,
    backgroundColor:'#fc5b31',
    marginLeft:10,
    marginRight:10,
    marginTop:10,
  },
  buy:{
    paddingTop:15,
    paddingBottom:15,
    textAlign:'center',
  },
  register_box:{
    marginTop:15,
  },
  re_text:{
    color:'#A8A8A8',
    fontSize:13,
    marginLeft:width*0.15,
  },
  re_button:{
    position: 'absolute',
    right:35,
  },
  re_button_text:{
    color:'#000',
    fontSize:13,
    fontWeight:'bold',
  },
});
 export default connect(mapStateToProps)(Login)