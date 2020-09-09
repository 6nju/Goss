import React from 'react';
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  BackHandler,
  View,
  Button,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  ScrollView,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {apis, settings, images} from './configs';
import {connect} from 'react-redux';
import Slideshow from './components/slideshow';
import Navbar from './components/navbar';
import Logo from './components/logo';
import StatusbarCustom from './components/StatusbarCustom';
import FlashSale from './components/FlashSale';
import Course from './components/CourseNew';
import Branch from './components/Branch';
import Banner from './components/Banner';
import News from './components/News';
import NewsTow from './components/NewsTow';
import LoadingCircular from './components/Loading';
import NewProducts from './components/NewProducts';
import Intro from './components/Intro';
import CountDown from 'react-native-countdown-component';

import { AsyncStorage } from 'react-native'; 

import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
const mapStateToProps = state => ({
  user_login: state.user_login,
  cart: state.cart,
});

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productNew: [],
      categories: [],
      search: '',
      cart: this.props.cart,
      news: [],
      user: this.props.user_login,
      length: this.props.cart ? this.props.cart.length : 0,
      statusFlashSale: 1,
      progessHomepage: true,
      progessNew: true,
      progessFlash: true,
      progessSlider: true,
      progess: true,
      end: 0,
      sliders: [],
      newProduct: [],
      flashSaleItem: [],
      showModal: false,
      images:images.homeSlider,
		search: '',
		bestSaler: [],
      bestSalerProgess: false,
    };
	
	apis.getSlider().then(res => {	
		this.setState({
			sliders: res.data.items,
			progessSlider: false,
		})		
	})
	
	apis.getNewProduct().then(res => {
			
		this.setState({
			productNew: res.data.items.data,
			progessNew: false,
		})	
			
	})
	apis.getFlashSale().then(res => {
		let date = res.data.item.date_start*1000;
		let now = (date - Date.now())/1000;  
		this.setState({
			flashSaleItem: res.data.items,
			progessFlash: false,
			statusFlashSale:0,
			end: now,
		}) 
		
    });
	
	
  }
  componentDidMount() {
    this.getData();
  }
	_facebook = () => {
	 
	  	Linking.openURL("fb-messenger://user-thread/673301269359074");
		
	 }
	 _zalo = () => {
		 Linking.openURL('tel:0986938883')
	 }
	 _phone = () => {
		 Linking.openURL('tel:19006503')
	 }
	 
  getData() {
	  this.setState({
		cart: this.props.cart,
		progess: true,
     
    });
	setTimeout( () => {
				     this.setState({progess: false})
				  },20);
    apis.getHomePage().then(res => {	
	
		this.setState({
			categories: res.data.items,
			progessHomepage: false,
			
		})	
			
	})
	
	 
	}
	showHome = (showIntro) => {
    this.setState({
		showModal: false
	})
	}
  componentWillMount(){
    this._subscribe = this.props.navigation.addListener('didFocus', () => {
     this.getData();
     //Put your Data loading function here instead of my this.LoadData()
    });}
	 
 
  async componentDidMount() {

    
    this.checkPermission();
    this.createNotificationListeners();
  };

  async checkPermission() {

    const enabled = await firebase.messaging().hasPermission();

    if (enabled) {
      this.getToken();
    }
    else {
      this.requestPermission();
    }
  }
  //Step 2: if not has permission -> process request
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
    a
      console.log('quyền bị từ chối');
    }
  }
  //Step 3: if has permission -> process get Token
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    if (fcmToken == null) {
      
      fcmToken = await firebase.messaging().getToken();
    
      console.log('token = ', fcmToken);
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //For Listenning Notification
  async createNotificationListeners() {

    //Tạo channel
    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');
      console.log('my chanel id = ', channel);
    firebase.notifications().android.createChannel(channel);

    //Vietnamese explain: khi đang ở foreground => show alert khi có noti
    this.notificationListener = firebase.notifications().onNotification((noti) => {
      const { title, body } = noti;
      Alert.alert(title, body);
    });
  }
  render() {
    const {search,progess,showModal} = this.state;


    if (progess) return <LoadingCircular />;
	if (showModal) return (	
		<View>
          <Intro showHome={this.showHome} params={settings.Intro} sliders={this.state.sliders} showModal={showModal} navigation={this.props.navigation} />
		</View>
	)
    return (
	
        <View style={styles.wrapper}>
          <Logo navigation={this.props.navigation} length={this.state.cart} homeu ={'home'}/>
		
          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7'}}>

              {/* Home Header Logo */}
			
			
              {/* Home Slideshow */}
			  {
					(this.state.progessSlider) ? <LoadingCircular /> : 
              <Banner navigation={this.props.navigation} params={this.state.sliders}/>
			  }
			  {
					(this.state.statusFlashSale) ? <LoadingCircular /> : 
					<View>
			  { (this.state.flashSaleItem.length > 0) ?
			   <View>
			  <View style={[styles.countdown, {marginTop: 0}]}>
				<View style={styles.text}><Text style={[styles.text_color, {fontSize: 15, fontWeight: 'bold', width: 100, marginLeft: 20, marginTop: 5}]}>FLASHSALE</Text>
				<CountDown
					until={this.state.end}
					size={12}
					
					digitStyle={{backgroundColor: '#000', borderWidth: 2, borderColor: '#000'}}
					digitTxtStyle={{color: '#fff'}}
					timeToShow={['D','H','M', 'S']}
					timeLabels={{d:'Ngày',h:'Giờ',m: 'Phút', s: 'Giây'}}
					timeLabelStyle={{color: '#A8A8A8', fontWeight: 'bold'}}
				  /><TouchableOpacity style={{position: 'absolute', right: 20, top: 5}} onPress={() => {this.props.navigation.navigate('FlashsaleTow', {end: this.state.end, products: this.state.flashSaleItem})}}>
					 <Text style={{fontWeight: 'bold'}}>
							Xem thêm
					</Text>
					  </TouchableOpacity></View>
				  
				  
				 </View>
				 
				 
				<FlashSale navigation={this.props.navigation} products={this.state.flashSaleItem} progess={this.state.progessFlash}/>
				</View>
						  
					: null
				}
				</View>
			  }
		
				<View style={styles.normal_item_section}>
						<View><Text style={styles.normal_i_title}>Danh Mục</Text></View>
						<ScrollView horizontal={true} style={{marginTop: 15}}>
						{
							this.state.categories.map((val, index_) => {
									return (
						<View style={styles.flashsale_item}>
	                	<TouchableOpacity style={styles.item_image_section}   onPress={() => this.props.navigation.navigate('List', {id: val.id} )}>
						
		                	<Image 
										style={[styles.h_banner_image, {borderRadius: ((width/3.5) - 20) / 2}]}
									 source={{uri: 'http://103.237.144.246/'+val.image,width: (width/3.5) - 20, height: (width/3.5) - 20}}/>
		       				
	       				</TouchableOpacity> 
	       				<Text style={[styles.item_title, {textAlign: 'center', marginTop: 8, fontSize: 11, fontWeight: 'bold', color: '#fc5b31'}]}>{val.name}</Text>
						</View>
						)
							})
						}
						
						</ScrollView>
						</View>
              {
					(this.state.progessNew) ? <LoadingCircular /> : 
					<View style={styles.normal_item_section}>
	       			<View><Text style={styles.normal_i_title}>Sản phẩm mới</Text></View>
	       			<TouchableOpacity style={styles.normal_i_lmbox} onPress={() => this.props.navigation.navigate('NewProduct')}><Text style={styles.normal_i_loadmore}>Xem thêm</Text></TouchableOpacity>
					<NewProducts navigation={this.props.navigation} params={this.state.productNew}/>
					</View>
					
			  }
			  {
					(this.state.progessHomepage) ? <LoadingCircular /> : 
					<View>
					{
									this.state.categories.map((val, index_) => {
										
										return (
						<View style={styles.normal_item_section}>
						<View><Text style={styles.normal_i_title}>{val.name}</Text></View>
						<TouchableOpacity style={styles.normal_i_lmbox} onPress={() => this.props.navigation.navigate('List', {id: val.id} )}><Text style={styles.normal_i_loadmore}>Xem thêm</Text></TouchableOpacity>
						<NewProducts navigation={this.props.navigation} params={val.products}/>
						</View>
					)
									})
					}
					</View>
					
			  }
              </ScrollView>
			   
            </View>

          {/*  Navbar Bottom */}
		
          <Navbar navigation={this.props.navigation} />
        </View>
    );
  }
}

const styles = StyleSheet.create({
	countdown:{
  	backgroundColor:'#f7f7f7',
  	paddingBottom:10,
  	paddingTop:20, 

  },
  normal_item_section:{
  	marginTop:25,
  },
  flashsale_item:{
  	width:width*0.25,
  	marginLeft:7.5,
  	marginRight:7.5,
	alignItems: 'center'
  },
  normal_i_title:{
  	color:'#fc5b31',
  	marginLeft:15,
  	fontSize:16,
	textTransform: 'uppercase',
	fontWeight: 'bold',

  },
  normal_i_lmbox:{
  	position:'absolute',
  	right:15,
  	top:5,
  },
  item_section:{
  		
  		flexDirection:'row',
  		flexWrap:'wrap',
  		
  },
  normal_i_loadmore:{
  	color:'#A8A8A8',
  	fontSize:10,
  	textTransform: 'uppercase',
  	textDecorationLine: 'underline',
  	fontWeight:'bold',
  },
  text:{
	flexDirection:'row',
  		flexWrap:'wrap',
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
export default connect(mapStateToProps)(Home);
