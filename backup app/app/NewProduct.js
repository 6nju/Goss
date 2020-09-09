import React from 'react';
import { StyleSheet, Dimensions, StatusBar, Alert, ActivityIndicator, Text, View, Button, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Footer } from './components/index'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faHome,faArrowLeft,  faMinus, faPlus,faShoppingCart, faComment, faUser, faSearch,faCartPlus, faAngleDoubleRight, faAngleDoubleLeft  } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

import { ActionCart } from './redux/ActionCart'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
import Header from './components/Header';
import Navbar from './components/navbar';
import Logo from './components/logo';
import StatusbarCustom from './components/StatusbarCustom';
import ListOne from './components/ListOne';
import ListTow from './components/ListTow';
import LoadingCircular from './components/Loading';
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
class NewProduct extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            page:1,
            total_:0,
            count:0,
            type:0,
            array_page: [],



            progess: true,
            products: [],

        
        }
		apis.getNewProductPage(this.state.page).then(res => {
			
		let array_page = this.state.array_page
			for(let i = 0; i < res.data.items.last_page; i++){
				
				let key = i + 1;
				array_page.push(key)
			}
			this.setState({
				products: res.data.items.data,
				progess: false,
				array_page: array_page,
			})	
			
	})
		
	}
	componentWillUnmount() {
		
	}
	componentDidMount() {
	
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
   _showPage(id){
	  this.setState({
		 page: id,
		 progess: true,
	  })
	 
	  apis.getNewProductPage(id).then(res => {
		
		
		this.setState({
			products: res.data.items.data,
			
			progess: false,

			
			
		}) 
		
    });
  }
  componentWillReceiveProps(nextProps) {
		
		this.setState({
			search: this.props.navigation.state.params.val,
			products: [],
			progess: true,
		})
		apis.getNewProductPage(this.state.page).then(res => {
			this.setState({
				products: res.data.data,
				progess: false,
		
			})	
			
		})
  }
  _search = () => {
	
	this.setState({
		 page: 1,
		 progess: true,
	  })
	apis.getSearch(this.state.search, this.state.page).then(res => {
			
			this.setState({
				products: res.data.data,
				
				progess: false,
		
			})	
			
		})
		
}
   callbackSearch = (search) => {
       this.setState({
            search: search,
			progess: true,
       });
	   
	   apis.getSearch(this.state.search, this.state.page).then(res => {
			
			this.setState({
				products: res.data.data,
				
				progess: false,
		
			})	
			
		})
   }
  render() {
   
	const {search,progess } = this.state;
	if (progess) return <LoadingCircular />;
	else 

    return (
      <View style={styles.wrapper}>
      		<StatusbarCustom />
          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7'}}>
				<Logo navigation={this.props.navigation} />
				<View style={styles.soft}>
                  		<View>
			  <View style={[styles.countdown, {marginTop: 0}]}>
				<View style={styles.text}><Text style={[styles.text_color, {fontSize: 15, fontWeight: 'bold', width: 200, marginLeft: 20, marginTop: 5}]}>SẢN PHẨM MỚI</Text>
				</View>
				  
				  
				 </View>
				 
				 
				
				</View>			
                  	</View>
					{ 
						(this.state.products.length) ?
					<View>
					{ 
						(!this.state.type) ?
						<ListOne navigation={this.props.navigation} products={this.state.products}/>
						: <ListTow navigation={this.props.navigation} products={this.state.products}/>
					}
					</View>: null
					}
					{
				  (this.state.products.length > 0)?
				  <View style={[{alignItems: 'center',flexWrap: 'wrap', marginTop: - 60, marginBottom: 100, width: width}, {flexDirection: 'row',padding: 10}]}>
						<TouchableOpacity style={[styles.page, {height: 32}]} onPress={() => {
							let page = this.state.page
							if(page > 1){
								page = page - 1
								this.setState({page: page, progess: true})}
								apis.getNewProductPage(this.state.page).then(res => {
			
									this.setState({
										products: res.data.items.data,
										
										progess: false,
								
									})	
									
								})
							}
							}>
							  <View>
								  
									<Text style={[styles.ptext, {color: '#fff'}]}><FontAwesomeIcon icon={faAngleDoubleLeft} size={20} color={"#000"} /></Text>
									
							  </View>
							</TouchableOpacity>
				  {
						this.state.array_page.map((val_, key) => {
							if(key >= (this.state.page - 2) && key <= (this.state.page + 2)){
							if(this.state.page == val_){
							return (
							<TouchableOpacity style={[styles.page, {height: 32, backgroundColor:'#0c6dac'}]}  key={key} onPress={this._showPage.bind(this, val_)}>
							  <View>
								  
									<Text style={[styles.ptext, {color: '#fff'}]}>{val_}</Text>
									
							  </View>
							</TouchableOpacity>
					)
							}else{
								return (
							<TouchableOpacity style={[styles.page, {height: 32}]}  key={key} onPress={this._showPage.bind(this, val_)}>
							  <View>
								  
									<Text style={styles.ptext}>{val_}</Text>
									
							  </View>
							</TouchableOpacity>
					)
							}
							}
						})
					}
					<TouchableOpacity style={[styles.page, {height: 32}]} onPress={() => {
							let page = this.state.page
							if(page < this.state.array_page.length){
								page = page + 1
								this.setState({page: page, progess: true})}
								apis.getNewProductPage(this.state.page).then(res => {
			
									this.setState({
										products: res.data.items.data,
										
										progess: false,
								
									})	
									
								})
							}
							}>
							  <View>
								  
									<Text style={[styles.ptext, {color: '#000'}]}><FontAwesomeIcon icon={faAngleDoubleRight} size={20} color={"#000"} /></Text>
									
							  </View>
							</TouchableOpacity>
					 </View>
				  : null
				}
			</ScrollView>
          	
      </View>
	  <Navbar navigation={this.props.navigation} />
      </View>
	);
  }

}

const styles = StyleSheet.create({
	countdown:{

  	paddingBottom:10,
  	paddingTop:20,
	marginTop: -70,
  },
  page: {
    textAlign: 'center',

    marginTop: 10,
    marginBottom: 10,
    marginLeft:10,

    paddingBottom:5,
    paddingTop:5,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'#fff',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#fff',
  },
  normal_item_section:{
  	marginTop:25,
  },
  normal_i_title:{
  	color:'#000',
  	marginLeft:15,
  	fontSize:16,
  },
  normal_i_lmbox:{
  	position:'absolute',
  	right:15,
  	top:5,
  },
  normal_i_loadmore:{
  	color:'#A8A8A8',
  	fontSize:10,
  	textTransform: 'uppercase',
  	textDecorationLine: 'underline',
  	fontWeight:'bold',
  },
  text:{
  	alignItems:'center',
  	marginBottom:10,
	flexDirection:'row',
  		flexWrap:'wrap',
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
export default connect(mapStateToProps)(NewProduct)