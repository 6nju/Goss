import React from 'react';
import { StyleSheet, Text,Alert, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Header from './components/Header';
import Navbar from './components/navbar';
import WebView from 'react-native-webview';
import { connect } from 'react-redux'
import LoadingCircular from './components/Loading';
import StatusbarCustom from './components/StatusbarCustom';
import Logo from './components/logo';

import { ActionCart } from './redux/ActionCart'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
class Detail extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      sonCategories: [],
      related: [],

      product: this.props.navigation.state.params.product,
      type:0,
      cSize:0,
      cColor:0,
      cCodeColor:0,
      value:1,
      size:[],
      color:[],
      araay_:[],
      araay_:[],
      code:[],
      ccode:[],
      codeColor:[],
      progess:true,
      link:'',
      
      cart: (this.props.cart) ? this.props.cart : [], 
      navigation: this.props.navigation,
    };
	let id = (this.state.product.product_id != null) ? this.state.product.product_id : this.state.product.id 
	
	apis.getProductInfo(id).then(res => {
			let size = res.data.product.size
			size = size.replace("',]", "']"); 
			size = size.replace(/'/g, '"') 
			size = size.replace(/ /g, '') 
			let code = JSON.parse(res.data.product.code_by)
			let codeItem = JSON.parse(res.data.product.code_item)
			
			
			let araay_ = []
			for(let i = 0; i < code.length; i++){
				let item = codeItem[i]
				item = item.replace(/------/g, '-') 
				item = item.replace(/-----/g, '-') 
				item = item.replace(/----/g, '-') 
				item = item.replace(/---/g, '-') 
				item = item.replace(/--/g, '-') 
				araay_[item] = code[i]
			}
			let color = JSON.parse(res.data.product.color)
			let codeColor = JSON.parse(res.data.product.color_name)
			let sizeA = JSON.parse(size)
			let str = codeColor[0];
			
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        str = str.replace(/ + /g," ");
        str = str.trim(); 
        let stra
		if(sizeA.length == 0){
			stra = ''
		}else{
			stra = sizeA[0];
			stra = stra.toLowerCase();
        stra = stra.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        stra = stra.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        stra = stra.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        stra = stra.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        stra = stra.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        stra = stra.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        stra = stra.replace(/đ/g,"d");
        stra = stra.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        stra = stra.replace(/ + /g," ");
        stra = stra.trim(); 
		}
			
		this.setState({
			
			cSize:stra,
			ccode:code[0],
			cColor:color[0],
			cCodeColor:str,
			size:sizeA,
			araay_:araay_,
			color:color,
			codeColor:codeColor,
			related: res.data.items,
			product: res.data.product,
			
		})	
			
	})
  }
  _minus = () => {
		let value = this.state.value
		if(this.state.value > 1){
			value = value - 1;
			this.setState({
				value:value
			})
		}
	}
	_plus = () => {
		
		let value = this.state.value
		
			value = value + 1;
			this.setState({
				value:value
			})
		
	}
	_add = () => {
		
		let product = []
		let key = 0;
		if(typeof this.state.cart == 'undefined' || this.state.cart.length == 0){
			product = []
			product.push({product: this.state.product, value: this.state.value, code: this.state.ccode})	
			
		}else{
			product = this.state.cart
			
			for(let i = 0; i < product.length; i++){
				if(product[i].product.id == this.state.product.id){
					key = 1;
				}
			}
			if(key == 0){
			product.push({product: this.state.product, value: this.state.value})	
			}
		}
		Alert.alert("Thông báo", "Đã thêm sản phẩm vào giỏ hàng");
		this.props.dispatch(ActionCart.set_cart(product))
		
	}
	onWebViewMessage = (event: WebViewMessageEvent) => {
		
		this.setState({webViewHeight: Number(event.nativeEvent.data), progess:false})
	  }
	  
	  onWebViewMessageTow = (event: WebViewMessageEvent) => {
		
		this.setState({webViewHeightTow: Number(event.nativeEvent.data)})
	  }
  render() {
    const {goBack, progess} = this.props.navigation;
	
	
    return (
      <View style={[styles.wrapper,{flex: 1}]}>
          
          <Logo navigation={this.props.navigation} />
		  {
			  (this.state.progess) ? <View style={{width: width, height: height, top:0, left: 0, zIndex: 1000, background: 'red', justifyContent: 'center'}}>
				<LoadingCircular />
				</View>: null
		  }
          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#fff', height: height - 75 - (height*0.095),}}>

              {/* Home Header Logo */}
              
              
              <View style={styles.slide_wrapper}>
                <WebView
		style={{ height: this.state.webViewHeight, backgroundColor: '#fff',marginTop:-9 }}
		onMessage={this.onWebViewMessage}
          
          injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'

         source={{ uri: 'http://103.237.144.246/api/get-product-slider/'+this.state.product.id }} />
             
              </View>
              <View style={styles.item_info_section}>
                 
                          
                  
                  <View style={[styles.item_quantity, {top: -55}]}>
                        <TouchableOpacity style={styles.minus} onPress={this._minus}>
                            <Image
                                source={require('./images/minus.png')}
                            />
                        </TouchableOpacity>
                        <View style={styles.quantity}>
                          <Text>{this.state.value}</Text>
                        </View>
                        <TouchableOpacity style={styles.plus}  onPress={this._plus}>
                            <Image
                                source={require('./images/plus.png')} 
                            />
                        </TouchableOpacity>
                  </View>
              </View>
			  
			  <ScrollView horizontal={true} style={{marginTop: 15}}>
			  
			  {
									this.state.size.map((val, index_) => {
										if(this.state.cSize == val){
										return (
						<TouchableOpacity style={{paddingBottom: 10, paddingTop:10, backgroundColor: '#f7f7f7', marginLeft: 15, width:40, borderWidth: 1}}>
						<Text style={[styles.normal_i_title,{width: 40, textAlign: 'center'}]}>{val}</Text>
						
						</TouchableOpacity>
					)
										}else{
											return (
						<TouchableOpacity style={{paddingBottom: 10, paddingTop:10, backgroundColor: '#f7f7f7', marginLeft: 15, width:40}} onPress={() => {
							let stra = val;
			stra = stra.toLowerCase();
        stra = stra.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        stra = stra.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        stra = stra.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        stra = stra.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        stra = stra.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        stra = stra.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        stra = stra.replace(/đ/g,"d");
        stra = stra.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        stra = stra.replace(/ + /g," ");
        stra = stra.trim();
							this.setState({cSize: stra})
							let code = this.state.cSize + ' ' + this.state.cCodeColor
							code = code.replace(/ /g, '-')
							this.setState({ccode: this.state.araay_[code]})
							}}>
						<Text style={[styles.normal_i_title,{width: 40, textAlign: 'center'}]}>{val}</Text>
						
						</TouchableOpacity>
					)
										}
									})
					}
			  </ScrollView>
			  
			  <ScrollView horizontal={true} style={{marginTop: 5}}>
			  
			  {
									this.state.color.map((val, index_) => {
										if(this.state.cColor == val){
										return (
						<TouchableOpacity style={{height: 30, backgroundColor: '#f7f7f7', marginLeft: 15, width:30, borderWidth: 1}}>
						<Text style={[styles.normal_i_title,{width: 20, marginLeft: 4, height: 20, marginTop: 4, backgroundColor: val}]}></Text>
						
						</TouchableOpacity>
					)
										}else{
											return (
						<TouchableOpacity style={{height: 30, backgroundColor: '#f7f7f7', marginLeft: 10, width:30}} onPress={() => {
							let str = this.state.codeColor[index_];
			
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
        str = str.replace(/ + /g," ");
        str = str.trim(); 
							this.setState({cColor: val, cCodeColor: str})
							
							let code = this.state.cSize + ' ' + this.state.cCodeColor
							code = code.replace(/ /g, '-')
							
							this.setState({ccode: this.state.araay_[code]})
							
							
							
							}}>
						<Text style={[styles.normal_i_title,{width: 20, marginLeft: 4, height: 20, marginTop: 4, backgroundColor: val}]}></Text>
						
						</TouchableOpacity>
					)
										}
									})
					}
			  </ScrollView>
			  <Text style={{marginLeft: 15, marginTop:10}}>Mã sản phẩm: {this.state.product.code}<Text style={{fontWeight: 'bold'}}>{this.state.ccode}</Text></Text>
			  
			  <WebView
		style={{ height: this.state.webViewHeightTow, backgroundColor: '#f5f5f5' }}
		onMessage={this.onWebViewMessageTow}
          
          injectedJavaScript='window.ReactNativeWebView.postMessage(document.body.scrollHeight)'

         source={{ uri: 'http://103.237.144.246/api/get-product-content/'+this.state.product.id }} />
              <Text style={[styles.item_h2, {backgroundColor: '#fc5b31'}]}>Sản phẩm liên quan</Text>
              <ScrollView 
                         horizontal={true}
                         showsHorizontalScrollIndicator={false}
                        
						 
                  > 
				  { (this.state.related.length) ?
				  <View  style={[styles.similar_image_mg, { flexDirection:'row',flexWrap:'wrap'}]}>
				  {
									this.state.related.map((val, index_) => {
										
										return (
						<TouchableOpacity style={styles.item_ymn} onPress={() => {
							this.setState({
								progess: true,
							})
							apis.getProductInfo(val.id).then(res => {
			
								this.setState({
									
									
									progess: false,
									related: res.data.items,
									product: res.data.product,
									
								})	
									
							})
							
						}} >
                     
                          <View style={styles.ymn_image}>
                              <Image 
												 source={{uri: 'http://103.237.144.246/'+  val.image,width: (width-10)*0.35, height: (width-10)*0.35}}/>
                          </View>
                          <Text style={styles.ymn_title}>{val.title}</Text>
                          
                          { (val.promotion != null) ?
							<View style={styles.item_price}>
	       					<Text style={styles.sale_price}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]}₫</Text>
	       					<Text style={styles.normal_price}>{(parseFloat(val.promotion).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]}₫</Text>
							</View>
							:
							<View style={styles.item_price}>
							<Text style={styles.normal_price}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]}₫</Text>
							<Text style={styles.sale_price}>{(parseFloat(val.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')).split('.')[0]}₫</Text>
							
							</View>
							}
                      </TouchableOpacity>
                      )
									})
				  }
				  </View> : null
				  }
                  </ScrollView>
          </ScrollView>
                <View style={styles.bottom_button}>
                        <TouchableOpacity style={styles.leftbutton} onPress={this._add}>
                              <Text style={styles.lefttext}>Thêm giỏ hàng</Text>
                        </TouchableOpacity>
                         <TouchableOpacity style={styles.rightbutton} onPress={() => this.props.navigation.navigate('Pay', {products : [{product: this.state.product, value: this.state.value, code: this.state.ccode}]})}>
                              <Text style={styles.righttext}>Mua ngay</Text>
                        </TouchableOpacity>
                </View>
          
      </View>
	  <Navbar navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollview_section:{
    backgroundColor:'#F7F7F7',
    marginBottom:100,
  },
  header_section:{
    flexDirection:'row',
    flexWrap:'wrap',
    backgroundColor:'#fff',
    paddingTop:5,
    paddingBottom:5,
  },
  header_left:{
    alignItems:'center',
    width:width*0.1,
  },
  header_right:{
    alignItems:'flex-start',
    width:width*0.1,
  },
  header_middle:{
    width:width*0.7,
  },
  item_slide_wrapper:{
      height:height*0.68,
      
  },
  slide1:{
    width:width-15,
  },
  slide_wrapper:{
    
  },
  item_info_section:{
    marginLeft:15,
  },  
  item_title:{
      
      textTransform: 'uppercase',
      color:'#0f1738',
      fontSize:18,
  },
  item_price:{
     
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
      fontSize:16,
  },
  item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
     
      marginTop:10,
  },
  item_quantity:{
      flexDirection:'row',
      flexWrap:'wrap',
      position: 'absolute',
      right:10,
      bottom:10,
  },
  quantity:{
    alignItems:'center',
    justifyContent:'center',
    marginLeft:8,
    marginRight:8,
  },
  item_code:{
    justifyContent:'center',
    backgroundColor:'#FFC400',
    height:45,
  },
  item_code_download:{
    position: 'absolute',
    right:10,
  },
  code:{
    marginLeft:20,
    fontSize:14,
    color:'#0F1738',
    fontWeight:'normal',
  },
  item_h1:{
    paddingLeft:15,
    fontSize:15,
    fontWeight:'700',
    backgroundColor:'#DDDDDD',
    color:'#0F1738',
    paddingTop:10,
    paddingBottom:10,
  },
  item_p1:{
    paddingLeft:20,
    paddingRight:20,
    color:'#707070',
    marginTop:25,
    marginBottom:25,
  },
  red:{
    color:'#DB0D0D'
  },
  green:{
    color:'#079D1E',
  },
  similar_item:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop:10,
    paddingBottom:10,
    borderBottomWidth:1,
    borderBottomColor:'#dddddd'
  },
  si_left:{
    width:width*0.3,
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:15,
    paddingRight:15,
  },
  si_item_title:{
    fontSize:14,
  },
  si_center:{
    width:width*0.35,
  },
  si_right:{
    width:width*0.35,
    paddingRight:7,
    paddingLeft:7,
  },
  cart_button:{
    borderWidth:1,
    borderColor:'#3191cf',
    backgroundColor:'#d0ecff',
    borderRadius:20,
    paddingTop:5,
    paddingBottom:5,
    alignItems:'center',
    marginTop:5,
  },
  buynow_button:{
    borderWidth:1,
    borderColor:'#ffc400',
    backgroundColor:'#ffc400',
    borderRadius:20,
    paddingTop:7,
    paddingBottom:7,
    alignItems:'center',
    marginTop:5,
  },
  bn_text:{
    color:'#fff',
    fontSize:16,
  },
  item_technical:{
    paddingLeft:15,
    paddingRight:15,
    marginTop:10,
    marginBottom:10,
  },
  t_text:{
    color:'#8d8d8d'
  },
  language:{
    width:112,
    height:32,
    borderWidth:1,
    borderColor:'#3191cf',
    backgroundColor:'#d0ecff',
    borderRadius:20,
    paddingTop:5,
    paddingBottom:5,
    alignItems:'center',
    marginTop:10,
    marginBottom:10,
    marginLeft:15,
  },
  similar_image_mg:{
    marginTop:15,
    marginLeft:10,
    marginBottom:15,
  },
  similar_image:{
    marginLeft:10,
    width:width*0.35,
    alignItems:'center',
  },
  discuss:{
    alignItems:'center',
    paddingBottom:50,
  },
  discuss_rate:{
    flexDirection:'row',
    flexWrap:'wrap',
    marginTop:25,
  },
  mgl_15:{
    marginLeft:15,
  },
  rate_text:{
    color:'#ffc711',
    fontSize:17,
    marginTop:20,
  },
  textArea:{
    borderColor:'#e6e6e6',
    borderWidth:1,
    backgroundColor:'#fff',
  },
  textAreaContainer:{
    marginTop:15,
    width:width-30,
  },
  send_box:{
    alignItems:'center',
    backgroundColor:'#3191cf',
    width:50,
    borderRadius:25,
    paddingTop:5,
    paddingBottom:5,
    position:'absolute',
    right:15,
    marginTop:10,
    bottom:10,
  },
  send:{
    color:'#fff',
  },
  item_h2:{
    paddingLeft:15,
    fontSize:15,
    fontWeight:'700',
    backgroundColor:'#3191cf',
    color:'#fff',
    paddingTop:10,
    paddingBottom:10,
  },
  item_ymn:{
    width:width*0.35,
    borderColor:'#ececec',
    borderWidth:1,
    backgroundColor:'#fff',
    marginLeft:10,
    marginBottom:40,
  },
  ymn_image:{
    alignItems:'center',
  },
  ymn_fit:{
    width:(width-10)*0.35,
  },
  ymn_title:{
    marginLeft:0,
    textTransform: 'uppercase',
    color:'#0f1738',
	fontSize: 14,
  },
  ymn_price:{
    marginLeft:15,
    textTransform: 'uppercase',
    color:'#0c6dac',
    marginTop:8,
    marginBottom:10,
  },
  ymn_rate:{
    flexDirection:'row',
    flexWrap: 'wrap',
    marginLeft:15,
    marginTop:6,
  },
  bottom_bar:{
    flexDirection:'row',
    flexWrap:'wrap',
    borderTopColor:'#e6e6e6',
    borderTopWidth:2,
    position:'absolute',
    bottom:0,
    backgroundColor:'#f8f8f8',
    height:90,
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
  bottom_button:{
    flexDirection:'row',
    flexWrap:'wrap',
    backgroundColor:'#fc5b31',
    position:'absolute',
    bottom:-16,
    width:width,
  },
  leftbutton:{
    width:(width-40)*0.5,
    alignItems:'center',
    backgroundColor:'#d0ecff',
    marginLeft:15,
    marginRight:5,
    marginRight:5,
    paddingTop:6,
    paddingBottom:6,
    marginTop:10,
    marginBottom:10,
    borderRadius:25,
  },
  lefttext:{
    color:'#0f1738',
    textTransform: 'uppercase',
  },
  righttext:{
    color:'#0f1738',
    textTransform: 'uppercase',
  },
  rightbutton:{
    width:(width-40)*0.5,
    alignItems:'center',
    backgroundColor:'#ffc400',
    marginLeft:5,
    paddingTop:6,
    paddingBottom:6,
    right:15,
    position: 'absolute',
    marginTop:10,
    marginBottom:10,
    borderRadius:25,
  },
  item_price:{
      marginLeft:15,
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
    },
	item_image:{
  	width:width*0.5 - 20,
  },
  normal_price:{
  	position:'absolute',
  	right:0,
  	color:'#A8A8A8',
  	fontSize:13,
  },
  sale_price:{
  	color:'#FF0000',
  	fontSize:13,
  },
  item_price:{
  	marginTop:3,
    paddingBottom:5,
  },
});
export default connect(mapStateToProps)(Detail)