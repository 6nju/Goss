import React from 'react';
import { StyleSheet, Dimensions,LayoutAnimation,StatusBar, Alert, Picker, Text, View, Button, TextInput, ScrollView, TouchableOpacity, Image,Platform, UIManager } from 'react-native';
import {Divider, Input , ThemeProvider} from 'react-native-elements';
import { Footer } from './components/index'
const width = Dimensions.get('window').width
import {colors, globalStyles} from './configs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faExclamationCircle, faTruck, faCommentDollar, faMinus, faPlus, faCommentDots, faTimes } from '@fortawesome/free-solid-svg-icons'
const height = Dimensions.get('window').height
import {settings, images} from './configs';
import Logo from './components/logo';
import StatusbarCustom from './components/StatusbarCustom';
import { connect } from 'react-redux'
import Axios from 'axios';
import { apis } from './configs/index'
import { ActionCart } from './redux/ActionCart'
import Header from './components/Header';
import Navbar from './components/navbar';
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
const formLogin = {
  loginByPhone: 'Sử Dụng Coupon',

};
class Pay extends React.Component {
	constructor(props) {
    super(props)
    this.state = { 
		expandedOne: false,
		expandedTow: false,
		expandedFour: false,
		ships: [],
		ship: 0,

		citys: [],
		coupon: '',
		guild: '',

		pay: '',
		districts: [],
		price_reduced: 0,
		guilds: [],
		shipCost: 0,
		expandedThree: false,
		total_: 0,
		all_: 0,
		products: props.navigation.state.params.products,
		user_info: this.props.user_login,
		address: (this.props.user_login) ? this.props.user_login.address : '',
		phone: (this.props.user_login) ? this.props.user_login.phone : '',
		name: (this.props.user_login) ? this.props.user_login.name : '',
		district: (this.props.user_login) ? this.props.user_login.district : '',
		city: (this.props.user_login) ? this.props.user_login.city : '',
		id: (this.props.user_login) ? this.props.user_login.customerId : '',

	}
	apis.getShip().then(res => {
		
		this.setState({
			ships: res.data.items,
			shipCost: res.data.items[0].price
			
		})	
			
	})
	if(this.state.user_info){
		Axios.defaults.headers = {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'token': this.state.user_info.token
                        }
	
    }
	if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
	
	
	
	
    
	
  }
	/*static navigationOptions = {
	
    headerRight: () => (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#ddd"
		style={{ }}

        hardwareAccelerated
      />
    ),
  };*/

  
  _coupon = () => {
	  const { coupon } = this.state
	  apis.coupon(coupon).then(res => {
		if(res.data.error || res.data.status != 1){
			  Alert.alert("Thông báo", "Mã khách hàng không thể sử dụng");
		  }else{
			  
			  this.setState({
						  price_reduced: parseInt(res.data.item.percen)
					  })
		  }
		  
		  }).catch(err => {
			Alert.alert("Thông báo", "Không tồn tại mã khách hàng này");
                   
		})
  }
  _save = () => {
	  if(this.state.name == '' || this.state.name == null){
		  Alert.alert("Thông báo", "Bạn chưa nhập tên");
		  return
	  }
	  if(this.state.phone == '' || this.state.phone == null){
		  Alert.alert("Thông báo", "Bạn chưa nhập số điện thoại");
		  return
	  }
	  if(this.state.address == '' || this.state.address == null){
		  Alert.alert("Thông báo", "Bạn chưa nhập địa chỉ");
		  return
	  }
	  const { username, password, name, email, address, phone, city, district } = this.state
	  let products = []
	  let ma = []
	  let values = []
	  for(let i = 0; i < this.state.products.length; i++){
		  let p = this.state.products[i];
		  products.push(
			  p.product.id
			  
		  )
		  ma.push(
			  p.code
			  
		  )
		  values.push(
			  p.value
			  
		  )
	  }
	  
	  let thongtinvanchuyen = this.state.ships[this.state.ship].name
	  
	  let hinhthucthanhtoan
	  if(this.state.pay){
		  hinhthucthanhtoan = 'Thanh toán chuyển khoản'
	  }else{
		  hinhthucthanhtoan = 'Nhận hàng và thanh toán'
	  }
	  
	  let total = parseFloat(((this.state.all_ + parseFloat(this.state.shipCost))- ((this.state.all_ + parseFloat(this.state.shipCost)) * this.state.price_reduced)/100))
	  let promotion = parseFloat(((this.state.all_ + parseFloat(this.state.shipCost)) * this.state.price_reduced)/100)
		
		apis.order(this.state.id, this.state.name, this.state.phone, this.state.address, this.state.coupon, promotion, products, values, total, this.state.shipCost, ma, hinhthucthanhtoan, thongtinvanchuyen).then(res => {
			
			
			
			
				
		
		
				if(res.data.status == 1){
			

				this.props.dispatch(ActionCart.set_cart([]))
                
				this.props.navigation.navigate('Checkoutcomplete')
				}else{
					alert('Có lỗi xảy ra')
				}
			
		});
	  
  }
  componentDidMount() {
	let ps = this.state.products
	let total = 0
	for(let i = 0; i < this.state.products.length; i++){
		let price = (ps[i].product.promotion == null) ? ps[i].product.price : ps[i].product.promotion
		total = total + ps[i].value*price
	}
	let all_ = total + this.state.shipCost
       this.setState({
				total_:total,
				all_:all_
		})
    }
	_plus(id) {
		let value = this.state.products
			value[id].value = value[id].value + 1;
			this.setState({
				products:value
			})
let ps = this.state.products
	let total = 0
	for(let i = 0; i < this.state.products.length; i++){ 
		let price = (ps[i].product.promotion == null) ? ps[i].product.price : ps[i].product.promotion
		total = total + ps[i].value*price
		
	}
       let all_ = total + this.state.shipCost
       this.setState({ 
				total_:total,
				all_:all_
		})
    }
	_delete(id) {
	 let products = this.state.products
	 products.splice(id, 1);
	 let total = 0
	 for(let i = 0; i < products.length; i++){
		total = total + products[i].value*ps[i].product.price
	}
       let all_ = total + this.state.shipCost
       this.setState({
				total_:total,
				all_:all_
		})
 
	 this.setState({
				products:products
			})
	this.props.dispatch(ActionCart.set_cart(products))
 }
	_minus(id) {
	  let value = this.state.products
		if(value[id].value > 1){
			value[id].value = value[id].value - 1;
			this.setState({
				products:value
			})
		}
		let ps = this.state.products
		let total = 0
		for(let i = 0; i < this.state.products.length; i++){
		let price = (ps[i].product.promotion == null) ? ps[i].product.price : ps[i].product.promotion
		total = total + ps[i].value*price
	}
       let all_ = total + this.state.shipCost
       this.setState({
				total_:total,
				all_:all_
		})
    }
	payClick(id) {
		 this.setState({
		  pay: id
		})
	 }
	 payShip(id) {
		 this.setState({
		  ship: id, shipCost: this.state.ships[id].price
		})
	 }
  changeLayoutOne = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandedOne: !this.state.expandedOne }); 
  }
  changeLayoutTow = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandedTow: !this.state.expandedTow }); 
  }
  changeLayoutThree = () => {
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandedThree: !this.state.expandedThree }); 
  }
  changeLayoutFour = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ expandedFour: !this.state.expandedFour });
  }
  render() {
    const { username, password, name, email, address, phone, city, district, coupon } = this.state
    const pays = [{
			id: 0,
			text: 'Nhận hàng và thanh toán'
		},
		{
			id: 1,
			text: 'Thanh toán chuyển khoản'
		}
	];
    return (
      <View style={[styles.wrapper,{flex: 1}]}>
          <Logo navigation={this.props.navigation} />
          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#fff', height: height - 75}}>

              {/* Home Header Logo */}
              
                                                    <View style={styles.section1}>
                                                      <View style={styles.btnTextHolder}>
                                                                  <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayoutOne} style={styles.Btn}>
                                                                    <View style={[styles.btnText, {width: '100%', height: 20, position:'relative'}]}>
                                                                          <FontAwesomeIcon icon={ faExclamationCircle } size={15} style={[{left: 0, position: 'absolute',top: 2}]} color={'#fc5b31'} />
                                                                          <Text style={[styles.s1text, {left: 15, position: 'absolute',top: 0}]}>Thông tin giao hàng</Text>
                                                                    </View>
                                                                  </TouchableOpacity>
                                                                  <View style={{ height: this.state.expandedOne ? null : 0, overflow: 'hidden', }}>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.extext}>Tên</Text></View>
                                                                              <View><TextInput 
																			  style={styles.fill} 
																			  placeholder = 'Điền tên'
																			  autoCorrect={false}
																			  returnKeyType='done'
																				onChangeText={(name) => this.setState({ name })}
																				value={name}
																			  /></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.extext}>Số điện thoại</Text></View>
                                                                              <View>
																			  <TextInput 
																			  style={styles.fill} 
																			  placeholder = 'Điền số điện thoại'
																			  autoCorrect={false}
																			  returnKeyType='done'
																				onChangeText={(phone) => this.setState({ phone })}
																				value={phone}
																			  /></View>
                                                                        </View>
                                                                        
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={[styles.centertext, {marginTop: 15}]}><Text style={styles.extext}>Địa chỉ cụ thể</Text></View>
                                                                              <View><View>
																					
																					  <TextInput 
																			  style={[styles.fill, {width: width, marginTop: 15, marginLeft: 5}]}
																			  placeholder = 'Nhập địa chỉ cụ thể'
																			  autoCorrect={false}
																			  returnKeyType='done'
																				onChangeText={(address) => this.setState({ address })}
																				value={address}
																			  />
																					 
																					</View></View>
                                                                        </View>
                                                                  </View>
                                                      </View>
                                                    </View>
                                                    <View style={styles.section1}>
                                                      <View style={styles.btnTextHolder}>
                                                                  <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayoutTow} style={styles.Btn}>
                                                                    <View style={[styles.btnText, {width: '100%', height: 20, position:'relative'}]}>
                                                                          <FontAwesomeIcon icon={ faTruck } size={15} style={[{left: 0, position: 'absolute',top: 2}]} color={'#fc5b31'} />
                                                                          <Text style={[styles.s1text, {left: 15, position: 'absolute',top: 0}]}>Hình thức vận chuyển</Text>
                                                                    </View>
                                                                  </TouchableOpacity>
                                                                  <View style={{ height: this.state.expandedTow ? null : 0, overflow: 'hidden', }}>
                                                                        
																		<View style={[styles.expand,styles.container]}>
                                                                                {
			this.state.ships.map((val, index) => {
				return (
					<View style={ [styles.formGroup, {height: 40, position: 'relative'}] }>
					<TouchableOpacity  style={ [styles.itemInput, {position: 'relative', marginTop: 10,height: 30, width: width}] } key={val.id} onPress={this.payShip.bind(this, index)}>
					<View style={{
					  height: 20,
					  width: 20,
					  borderRadius: 10,
					  borderWidth: 1,
					  borderColor: '#757F8C',
					  alignItems: 'center',
					  justifyContent: 'center',
					  position: 'absolute',
					  bottom: 7,
					  left: 10
					}}>
					  {
						index == this.state.ship ?
						  <View style={{
							height: 14,
							width: 14,
							borderRadius: 7,
							backgroundColor: '#fc5b31',
						  }} />
						  : null
					  }
					</View>
					<Text style={[styles.title, {color: '#757F8C', fontSize: 14, bottom: -2, left: 40}]}>
						{val.name}
					</Text>
				  </TouchableOpacity>
				  
				
				  </View>
				)
			  })
			}
                                                                        </View>
                                                                  </View>
                                                      </View>
                                                    </View>
                                                    <View style={styles.section1}>
                                                      <View style={styles.btnTextHolder}>
                                                                  <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayoutThree} style={styles.Btn}>
                                                                    <View style={[styles.btnText, {width: '100%', height: 20, position:'relative'}]}>
                                                                          <FontAwesomeIcon icon={ faCommentDollar } size={15} style={[{left: 0, position: 'absolute',top: 2}]} color={'#fc5b31'} />
                                                                          <Text style={[styles.s1text, {left: 15, position: 'absolute',top: 0}]}>Hình thức thanh toán</Text>
                                                                    </View>
                                                                  </TouchableOpacity>
                                                                  <View style={{ height: this.state.expandedThree ? null : 0, overflow: 'hidden', }}>
                                                                        {
			pays.map((val) => {
				return (
					<View style={ [styles.formGroup, {height: 40, position: 'relative'}] }>
					<TouchableOpacity  style={ [styles.itemInput, {position: 'relative', marginTop: 10,height: 30, width: width}] } key={val.id} onPress={this.payClick.bind(this, val.id)}>
					<View style={{
					  height: 20,
					  width: 20,
					  borderRadius: 10,
					  borderWidth: 1,
					  borderColor: '#757F8C',
					  alignItems: 'center',
					  justifyContent: 'center',
					  position: 'absolute',
					  bottom: 7,
					  left: 10
					}}>
					  {
						val.id == this.state.pay ?
						  <View style={{
							height: 14,
							width: 14,
							borderRadius: 7,
							backgroundColor: '#fc5b31',
						  }} />
						  : null
					  }
					</View>
					<Text style={[styles.title, {color: '#757F8C', fontSize: 14, bottom: -2, left: 40}]}>
						{val.text}
					</Text>
				  </TouchableOpacity>
				  
				
				  </View>
				)
			  })
			}
                                                                  </View>
                                                      </View>
                                                    </View>
                                                    <View style={styles.section1}>
                                                      <View style={styles.btnTextHolder}>
                                                                  <TouchableOpacity activeOpacity={0.8} onPress={this.changeLayoutFour} style={styles.Btn}>
                                                                    <View style={[styles.btnText, {width: '100%', height: 20, position:'relative'}]}>
                                                                          <FontAwesomeIcon icon={ faCommentDollar } size={15} style={[{left: 0, position: 'absolute',top: 2}]} color={'#fc5b31'} />
                                                                          <Text style={[styles.s1text, {left: 15, position: 'absolute',top: 0}]}>Thông tin tài khoản hưởng</Text>
                                                                    </View>
                                                                  </TouchableOpacity>
                                                                  <View style={{ height: this.state.expandedFour ? null : 0, overflow: 'hidden',width: width }}>
																	<View style={{borderTopWidth:1,borderColor:'#e9edf2',}}>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Tên ngân hàng</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>MB Bank </Text></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Chi nhánh</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>Hoàn KIếm Hà Nội</Text></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Tên chủ tài khoản</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>VI THỊ HUYỀN</Text></View>
                                                                        </View>
                                                                        <View style={[styles.expand,styles.container]}>
                                                                              <View style={styles.centertext}><Text style={styles.infotext}>Số tài khoản</Text></View>
                                                                              <View style={styles.centertext}><Text style={styles.userinfotext}>0570.110.668.668</Text></View>
                                                                        </View>
                                                                   </View>
																  
                                                                  </View>
                                                      </View>
													  
													 
                                                    </View>
                                                    
														{
				this.state.products.map((val, index) => {
						

				return(
									<View style={[styles.container,styles.cartitem]}>
                              <View style={styles.csection1}>
                                  <View style={styles.cimage}>
                                   
                                        <Image 
												 style={{marginLeft: width*0.01}}
									 source={{uri: settings.ServiceAddress+'/' + val.product.image,width: width*0.36, height: width*0.36}}/>
                                    
                                  </View>
                              </View>
                              <View style={styles.csection2}>
                                    <TouchableOpacity style={styles.cdelete}  onPress={this._delete.bind(this, index)}>
                                          <FontAwesomeIcon icon={ faTimes } size={15} color={'#909090'} />
                                    </TouchableOpacity>
                                    <Text style={styles.ctext}>{val.product.title}</Text>
                                      <View style={[styles.cnumber,styles.container]}>
									  
                                            
											 {
														 (val.product.promotion != null) ?
                                                 <Text style={styles.price}>{(parseFloat(val.product.promotion).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} đ</Text>
												 : 
												 <Text style={styles.price}>{(parseFloat(val.product.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]} đ</Text>
												 
													 }
                                            <TouchableOpacity style={styles.mgleft}>
                                                  <FontAwesomeIcon icon={ faPlus } size={20} color={'#909090'}  key={index} onPress={this._plus.bind(this, index)}/>
                                            </TouchableOpacity>
                                            <View>
                                                  <Text style={styles.camouth}>{val.value}</Text>
                                            </View>
                                            <TouchableOpacity>
                                                  <FontAwesomeIcon icon={ faMinus } size={20} color={'#909090'}  key={index} onPress={this._minus.bind(this, index)}/>
                                            </TouchableOpacity>
                                      </View>
                              </View>
                        </View>
														)
  })}
                                                    
                                                    <View style={styles.section3}>
                                                        <View style={styles.container}>
                                                              <Text style={styles.servicestext}>Tổng tiền</Text>
                                                              <Text style={styles.services}>{parseFloat(this.state.total_).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ</Text>
                                                        </View>
                                                        <View style={[styles.container,styles.margin12]}>
                                                              <Text style={styles.servicestext}>Phí vận chuyển</Text>
                                                              <Text style={styles.services}>{parseFloat(this.state.shipCost).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ</Text>
                                                        </View>
														<View style={[styles.container,styles.margin12]}>
                                                              <Text style={styles.converttext}>Giảm</Text>
                                                              <Text style={styles.convert}>{parseFloat(((parseFloat(this.state.all_) + parseFloat(this.state.shipCost)) * this.state.price_reduced)/100).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ</Text>
                                                        </View>
                                                        <View style={[styles.container,styles.margin12]}>
                                                              <Text style={styles.converttext}>Thành tiền</Text>
                                                              <Text style={styles.convert}>{parseFloat(((parseFloat(this.state.all_) + parseFloat(this.state.shipCost))-((parseFloat(this.state.all_)+parseFloat(this.state.shipCost)) * this.state.price_reduced)/100)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} đ</Text>
                                                        </View>
                                                    </View>
													<ThemeProvider >

											  <Input
												  placeholder='Nhập mã khách hàng'
												  inputStyle={{fontSize:16,fontStyle:'italic'}}
												  inputContainerStyle={globalStyles.inputStyle}
												  onChangeText={(coupon) => this.setState({ coupon })}
												value={coupon}
											  />

											 <View style={[styles.sectionbutton,styles.container, {marginBottom: 10, backgroundColor: '#fc5b31'}]}>
											<TouchableOpacity style={[styles.Cpay, {backgroundColor: '#5bc8ac', color: '#fff'}]}  onPress={this._coupon}>
                                                                    <Text style={{color: '#fff', fontSize: 20}}>Sử  dụng mã khách hàng</Text>
                                                        </TouchableOpacity>
											</View>
										  </ThemeProvider>
													
                                                    <View style={[styles.sectionbutton,styles.container, {marginBottom: 200, backgroundColor: '#fc5b31'}]}>
                                                        
                                                              <TouchableOpacity style={[styles.Cpay, {backgroundColor: '#fc5b31', color: '#fff'}]} onPress={this._save}>
                                                                    <Text style={{color: '#fff', fontSize: 20}}>Thanh toán</Text>
                                                        </TouchableOpacity>
                                                    </View>
                  </ScrollView>
				  
           </View>
			  <Navbar navigation={this.props.navigation} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
	cart_box:{
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginLeft:15,
	    marginRight:15,
	    backgroundColor:'#fff',
	    shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,
		elevation: 2,
		marginBottom:10,
		marginTop:10,
  	},
  	item_title:{
      marginLeft:15,
      marginTop:15,
      textTransform: 'uppercase',
      color:'#0f1738',
    },
    item_price:{
      marginLeft:15,
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
    },
    item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
      marginLeft:15,
      marginTop:10,
    },
    cart_item_image:{
    	width:(width-30)*0.35,
    	alignItems:'center',
    	justifyContent:'center',
    },
    cart_item_title:{
    	width:(width-30)*0.35,
    },
    cart_item_quantity:{
      flexDirection:'row',
      flexWrap:'wrap',
      position: 'absolute',
      right:10,
      bottom:10,
      zIndex:1000,
  	},
	 quantity:{
	    alignItems:'center',
	    justifyContent:'center',
	    marginLeft:8,
	    marginRight:8,
	},
	exit:{
		position: 'absolute',
      	right:10,
      	top:10,
	},
  container:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
	width: width,
  },
  section1: {
    marginTop:15,
  },
  s1text:{
	  fontSize: 16,
    marginLeft:10,
  },
  text: {
    fontSize: 17,
    color: 'black',
  },
  btnTextHolder: {
    backgroundColor:'#fff',
   
   
  },
  Btn: {
    marginLeft:16,
    marginRight:16,
    backgroundColor: '#fff',
  },
  expand:{
    
	width: width,
  },
  btnText: {
    marginLeft:7,
    color: '#2f3657',
    marginTop:7,
    marginBottom:7,
  },
  fill:{
	height: 40,
    width:width*0.60,
    marginLeft: 10,
	fontSize: 13,
	
  },
  extext:{
	fontSize: 16,
    marginLeft:8,
    width:width*0.35,
    color:'#909090',
  },
  tranfertext:{
    marginLeft:8,
    color:'#909090',
    marginTop:7,
    marginBottom:7,
  },
  infotext:{
   
    color:'#909090',
    marginTop:7,
    width:width*0.5 - 20, 
	marginLeft: 20,
    marginBottom:7,
  },
  userinfotext:{

    color:'#fc5b31',
    marginTop:7,
    width:width*0.5 - 20, 
	marginRight: 20,
    textAlign:'right',
  },
  centertext:{
    justifyContent: 'center',
  },
  section2:{
    marginLeft:16,
    marginRight:16,
    marginTop:15,
    backgroundColor:'#fff',
    borderRadius:10,
  },
  payitem:{
    width:width*0.4,
  },
  payiteminfo:{
    width:width*0.5,
  },
  payitemimage:{
    width:width*0.4,
    height:width*0.4,
  },
  pinfotext1:{
    marginLeft:9,
    color:'#2f3657',
    marginTop:10,
    fontSize:15,
  },
  pinfotext2:{
    marginLeft:9,
    marginTop:8,
    color:'#fc5b31',
    fontSize:17,
  },
  pamount:{
    width:width*0.07,
    backgroundColor:'#ffc0a8',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height:width*0.07,
    marginTop:4,
  },
  patext:{
    width:width*0.10,
    color: '#2f3657',
    alignItems: 'center',
    fontWeight: '600',
  },
  pmiddletext:{
    color: '#2f3657',
    fontSize: 20,
    fontWeight:'bold',
  },
  floatbot:{
    justifyContent: 'flex-end',
    marginBottom:9,
    marginLeft:8,
  },
  delete:{
    width:width*0.15,
    alignItems: 'flex-end',
  },
  wrapper:{
		flex: 1
	},
  deletetext:{
    color:'#2f3657',
  },
  section3:{
    marginLeft:16,
    marginRight:16,
    marginTop:15,
  },
  servicestext:{
    width:width*0.4,
    color:'#2f3657',
    fontSize:15, 
  },
  services:{
    width:width*0.5,
    textAlign:'right',
    color:'#fc5b31',
    fontSize:17,
  },
  margin12:{
    marginTop:12,
  },
  scrollview_section:{
		height: height - 65
	},
    
  converttext:{
    width:width*0.4,
    color:'#2f3657',
    fontSize:15, 
  },
  blockDivider: {
        position:'relative',

    },
    textDivider:{
       padding:10,
        textTransform:'uppercase',
        position:'absolute',
        zIndex:5,
        top:50,
        textAlign:'center',
        color:'#a0a0a0',
        backgroundColor:'#f2f2f2',
    },
    lineDivider:{
        backgroundColor:'#e3e3e3',
        height:1,
        marginTop:70,
        marginBottom:80,
    },
  convert:{
    width:width*0.5,
    textAlign:'right',
    color:'#fc5b31',
    fontSize:19,
  },
  sectionbutton:{
      backgroundColor:'#fc5b31',
      marginTop:15,
    },
    Cmess:{
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft:15,
      
    },
    Cpay:{
    backgroundColor: '#fc5b31',
    width:width*0.76,
	
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:7,
    marginBottom:7,
    marginLeft:width*0.12,
    height:width*0.1,
  },
  item_price:{
      marginLeft:15,
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
    },
    cart_box:{
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginLeft:15,
	    marginRight:15,
	    backgroundColor:'#fff',
	    shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.20,
		shadowRadius: 1.41,
		elevation: 2,
		marginBottom:10,
		marginTop:10,
  	},
  	item_title:{
      marginLeft:15,
      marginTop:15,
      textTransform: 'uppercase',
      color:'#0f1738',
    },
    item_price:{
      marginLeft:15,
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
    },
    item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
      marginLeft:15,
      marginTop:10,
    },
    cart_item_image:{
    	width:(width-30)*0.35,
    	alignItems:'center',
    	justifyContent:'center',
    },
    cart_item_title:{
    	width:(width-30)*0.35,
    },
    cart_item_quantity:{
      flexDirection:'row',
      flexWrap:'wrap',
      position: 'absolute',
      right:10,
      bottom:10,
      zIndex:1000,
  	},
	 quantity:{
	    alignItems:'center',
	    justifyContent:'center',
	    marginLeft:8,
	    marginRight:8,
	},
	exit:{
		position: 'absolute',
      	right:10,
      	top:10,
	},
	buy_now:{
		marginLeft:15,
		marginRight:15,
		alignItems:'center',
		backgroundColor:'#fc5b31',
		borderRadius:10,
		marginTop:25,
		marginBottom:90,
	},
	buy_now_text:{
		paddingBottom:10,
		paddingTop:10,
		color:'#fff',
		fontSize:18,
		textTransform:'uppercase',
		fontWeight:'bold',
	},
	bottom_bar:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopColor:'#e6e6e6',
    borderTopWidth:2,
    position:'absolute',
    bottom:0,
    backgroundColor:'#f8f8f8',
    paddingBottom:30,
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
  container:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  header:{
    backgroundColor:'#fc5b31',
    paddingTop:30,
  },
  hsection1:{
    width:width*0.1,
    alignItems:'center',
    justifyContent: 'center',
  },
  hsection2:{
    width:width*0.8,
  },
  hsection3:{
    width:width*0.1,
    alignItems:'center',
    justifyContent: 'center',
  },
  cartitem:{
    backgroundColor:'#fff', 
    paddingBottom:15,
    marginTop:15,
  },
  cimage:{
    alignItems:'center',
    marginTop:15,
  },
  csection1:{
    width:width*0.4,
  },
  csection2:{
    width:width*0.6,
  },
  price:{
    color:'#fc5b31',
    fontWeight:'bold',
  },
  cnumber:{
    alignItems:'center',
  },
  camouth:{
   paddingLeft:10,
   paddingRight:10,
   paddingTop:5,
   paddingBottom:5,
   borderWidth:1,
   borderColor:'#909090',
   textAlign:'center',
   marginLeft:15,
   marginRight:15,
  },
  mgleft:{
    marginLeft:50,
    marginTop:50,
  },
  ctext:{
    fontSize:18,
    color:'#363636',
  },
  cdelete:{
    alignItems:'flex-end',
    marginRight:10,
    marginTop:5,
  },
  totalsection:{
    marginTop:15,
    marginBottom:50,
  },
  totaltext:{
    width:width*0.5,
    color:'#363636',
    fontWeight:'bold',
    paddingLeft:15,
  },
  total:{
    width:width*0.5,
    color:'#fc5b31',
    fontWeight:'bold',
    textAlign:'right',
    paddingRight:15,
  },
  buynow:{
    backgroundColor:'#5bc8ac',
    marginLeft:15,
    marginRight:15,
    justifyContent:'center',
    alignItems:'center',
    height:width*0.1,
    marginBottom:10,
  },
  bntext:{
    color:'#fff',
    textTransform: 'uppercase',
  }, 
});
export default connect(mapStateToProps)(Pay)