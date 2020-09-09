import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import Swiper from 'react-native-swiper'
import Header from './components/Header';
import StatusbarCustom from './components/StatusbarCustom';
import { Input, CheckBox } from 'react-native-elements';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import { connect } from 'react-redux'
import Axios from 'axios';
import { ActionCreators } from './redux/ActionCreators'
import { ActionCart } from './redux/ActionCart'
import Logo from './components/logo';
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
class Register extends React.Component {
	constructor(props) {
    super(props)
    this.state = { 
		address: '',
		phone: '',
		name: '',
		username: '',
		password: '',
		rePassword: '',
		email:'',
	}
	}
	_save = () => {
		
		
		const { username, password, email, address , rePassword, phone } = this.state
		
		if(password == '' || password == null){
		  Alert.alert("Thông báo", "Bạn chưa nhập mật khẩu");
		  return
		  }
		  if(phone == '' || phone == null){
			  Alert.alert("Thông báo", "Bạn chưa nhập số điện thoại");
			  return
		  }
		   if(email == '' || email == null){
			  Alert.alert("Thông báo", "Bạn chưa nhập email");
			  return
		  }
		  if(username == '' || username == null){
			  Alert.alert("Thông báo", "Bạn chưa nhập tài khoản");
			  return
		  }
			if(address == '' || address == null){
			  Alert.alert("Thông báo", "Bạn chưa nhập địa chỉ");
			  return
		  }
		
		apis.register(username, phone, password, email, address).then(res => {
			
			if(typeof res.data.user.id != 'undefined'){
				let user = {
					"name": username,
					"phone": phone,
					"address": address,
					"password": password,
					"email": email,
					"customerId": res.data.id,
				}
				
				
				Alert.alert("Thông báo", 'Bạn đã tạo tài khoản thành công');
                this.props.dispatch(ActionCreators.set_user_login(user))
				
                this.props.navigation.navigate('Home')
				
			}else{
				
				Alert.alert("Thông báo", "Đã tồn tại tài khoản hoặc số điện thoại, email");
				
			}
		}).catch(err => {
			Alert.alert("Thông báo", "Đã tồn tại tài khoản hoặc số điện thoại, email");
                   
		})
}
  render() {
    const {goBack} = this.props.navigation;
	const { username, password, email, address, phone, rePassword} = this.state
    return (
      <View style={styles.container}>
      {/* Statusbar components */}
      		<StatusbarCustom />
      {/* End Statusbar components */}
      {/* Content here */}
       <ScrollView style={{backgroundColor:'#fff'}}>
          <Logo navigation={this.props.navigation} />
          <Text style={styles.header}>Đăng ký</Text>
          <View style={{marginTop:20,}}>
          <Text style={styles.small_text}>Chào mừng bạn đến với</Text>
          <Text style={styles.small_text}>Siêu thị thời trang Goss</Text>
          </View>
          <View style={styles.form}>
                  <View style={styles.input_box}>
                          <Input
                            placeholder='Họ Tên'
                            inputContainerStyle={styles.inputstyle}
                            inputStyle={{fontSize:13,marginLeft:20,}}
                            containerStyle={{height:50,}}
							onChangeText={(username) => this.setState({ username })}
								value={username}
                          />
               </View>
			   <View style={styles.input_box}>
                          <Input
                            placeholder='Địa chỉ'
                            inputContainerStyle={styles.inputstyle}
                            inputStyle={{fontSize:13,marginLeft:20,}}
                            containerStyle={{height:50,}}
							onChangeText={(address) => this.setState({ address })}
								value={address}
                          />
               </View>
               <View style={styles.input_box}>
                          <Input
                            placeholder='Số điện thoại'
                            inputContainerStyle={styles.inputstyle}
                            inputStyle={{fontSize:13,marginLeft:20,}}
                            containerStyle={{height:50,}}
                            onChangeText={(phone) => this.setState({ phone })}
								value={phone}
                          />
               </View>
               <View style={styles.input_box}>
                          <Input
                            placeholder='Email'
                            inputContainerStyle={styles.inputstyle}
                            inputStyle={{fontSize:13,marginLeft:20,}}
                            containerStyle={{height:50,}}
                            onChangeText={(email) => this.setState({ email })}
								value={email}
                          />
               </View>
                <View style={styles.input_box}>
                          <Input
                            placeholder='Mật khẩu'
                            inputContainerStyle={styles.inputstyle}
                            inputStyle={{fontSize:13,marginLeft:20,}}
                            rightIconContainerStyle={{marginRight:10,}}
                            containerStyle={{height:50,}}
                            onChangeText={(password) => this.setState({ password })}
								value={password}
                            rightIcon={
                            <Image 
                                  source={require('./components/images/show_pw.png')}
                            />
                          }
                          />
               </View>
              
               <TouchableOpacity style={styles.bottom_button} onPress={this._save}>
                  <Text style={[styles.buy, {color: '#fff'}]}>Đăng Ký</Text>
             </TouchableOpacity>
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
  section3:{
    marginTop:10,
  },
});
export default connect(mapStateToProps)(Register)