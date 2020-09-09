import React from 'react';
import { StyleSheet, Dimensions,Linking, StatusBar, Alert, ActivityIndicator, Text, View, Button, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Footer } from './components/index'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCoffee, faHome,faArrowLeft,  faMinus, faPlus,faShoppingCart, faComment, faUser, faSearch,faCartPlus  } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

import { ActionCart } from './redux/ActionCart'
const mapStateToProps = (state) => ({
	user_login: state.user_login, 
	cart: state.cart,
})
import Header from './components/Header';
import Navbar from './components/navbar';
import Icon from 'react-native-vector-icons/Ionicons'
import ListOne from './components/ListOne';
import StatusbarCustom from './components/StatusbarCustom';
import ListTow from './components/ListTow';
import LoadingCircular from './components/Loading';
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
class Search extends React.Component {
	constructor(props) {
        super(props)
        this.state = {
            page:1,
            total_:0,
            count:0,
            type:0,
            array_page: [],
			length: (this.props.cart == null) ? 0 : this.props.cart.length,


            progess: true,
            products: [],

            search: this.props.navigation.state.params.val,
        }
	
		apis.getSearch(this.state.search).then(res => {
			let array_page = this.state.array_page
			for(let i = 0; i < res.data.last_page; i++){
				
				let key = i + 1;
				array_page.push(key)
			}
			this.setState({
				products: res.data.data,
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
	 
	  apis.getSearch(id).then(res => {
		
		
		this.setState({
			products: res.data.data,
			
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
		apis.getSearch(this.state.search, this.state.page).then(res => {
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
   _facebook = () => {
	 
	  	Linking.openURL("fb-messenger://user-thread/847849025591113");
		
	 }
  render() {
   
	const {search,progess } = this.state;
	if (progess) return <LoadingCircular />;
	else 

    return (
      <View style={styles.wrapper}>
      		<StatusbarCustom />
          	      <View>
      <View style={{backgroundColor:'#fc5b31',height:height*0.05,marginBottom:-16,}}></View>
      <View style={[styles.topnav,styles.grid]}>
            <TouchableOpacity style={styles.tn_left}>
              <Image
                source={require('./components/images/logo.png')}
              />
            </TouchableOpacity>
            <View style={styles.tn_middle}>
              
            </View>
            <TouchableOpacity style={[styles.tn_right, {marginRight: 10, position: 'absolute', right: 25, top: 4}]}   onPress={() =>{this.props.navigation.navigate('Cart')}}>
              <Text style={[styles.tn_text,{fontSize: 13,color:'#fc5b31', width: 20, height: 20, position:'absolute', top: 7, right: 10, zIndex: 1000, fontWeight: 'bold'}]}>{this.state.length}</Text>
              <Icon name={'md-cart'} size={40} color='#fff' />
            </TouchableOpacity>
        <TouchableOpacity style={[styles.tn_right, {marginRight: 10, position: 'absolute', right: -12, top: 6}]}   onPress={this._facebook}>
              
              <Icon name={'ios-chatbubbles'} size={35} color='#fff' />
            </TouchableOpacity>
        <View style={styles.search_section}>
                  <TextInput style = {styles.input}
                     placeholder = "Tìm kiếm sản phẩm"
                     placeholderTextColor = "#8D8D8D"
           
           onChangeText={(search) => this.setState({ search })}
           value={this.state.search}
                     autoCapitalize = "none"
                  />
                  <TouchableOpacity style={styles.search_icon} onPress={() => {
              this.setState({
                    products: [],
                    
                    progess: true,
                
                  })  
                 apis.getSearch(this.state.search, this.state.page).then(res => {
      
                  this.setState({
                    products: res.data.data,
                    
                    progess: false,
                
                  })  
                  
                })
               
              }}>
                    <Image
                          source={require('./images/search.png')}
                      />
                  </TouchableOpacity>
              </View>
              </View>
              </View>
          	<ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollview_section}>
      
				<View style={[styles.countdown, {marginTop: 0}]}>
				<View style={styles.text}><Text style={[styles.text_color, {fontSize: 15, fontWeight: 'bold', width: 200, marginLeft: 20, marginTop: 5}]}>Tìm kiếm: {this.state.search}</Text>
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
				  (this.state.array_page.length > 0)?
				  <View style={[{alignItems: 'center',flexWrap: 'wrap', marginTop: - 60, marginBottom: 100, width: width}, {flexDirection: 'row',padding: 10}]}>
				  {
						this.state.array_page.map((val_, key) => {
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
						})
					}
					 </View>
				  : null
				}
			</ScrollView>
          	<Navbar navigation={this.props.navigation} />
      </View>
	);
  }

}

const styles = StyleSheet.create({
text_color:{
  	color:'red',
  },
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
	wrapper:{
		flex: 1
	},
  	header_right:{
	    alignItems:'flex-start',
	    width:width*0.1,
  	},
  	header_middle:{
    	width:width*0.7,
  	},
  	scrollview_brand:{
  		backgroundColor:'#fff',
  	},
  	brand_title_box:{
  		marginLeft:30,
  		marginRight:15,
  		alignItems:'center',
  		marginTop:15,
  		paddingBottom:15,
  	},
  	brand_text:{
  		color:'#0f1738',
  		textTransform: 'uppercase',
  	},
  	scrollview_category:{
  		backgroundColor:'#5ab9f5',
  	},
  	category_title_box:{
  		marginLeft:30,
  		marginRight:15,
  		alignItems:'center',
  		paddingTop:7,
  		paddingBottom:7,
  	},
  	category_text:{
  		color:'#0f1738',
  	},
  	
    image_fit:{
      width:(width-40)*0.5,
    },
    item_title:{
      marginLeft:15,
      marginTop:15,
      textTransform: 'uppercase',
      color:'#0f1738',
    },
	scrollview_section:{
		height: height - 65
	},
    
    soft:{
    	paddingBottom:10,
    },
    
    left_soft:{
    	marginLeft:15,
    },
    right_soft:{
		top: 7,
    	marginLeft:15,
    	position:'absolute',
    	right:15,
		width: 110
    },
    bottom_bar:{
	    flexDirection:'row',
	    flexWrap:'wrap',
	    borderTopColor:'#e6e6e6',
	    borderTopWidth:2,
	    position:'absolute',
	    bottom:0,
	    backgroundColor:'#f8f8f8',
	    paddingBottom:40,
  	},
	input:{
      marginLeft:0,
      marginRight:60,
      width:width*1-120,
      backgroundColor:'#fff',
      height: 40,
      borderRadius:10,
	  marginTop: -8,
	  paddingLeft: 10,
	  backgroundColor: null,
	  
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
	  width: width - 180,
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
export default connect(mapStateToProps)(Search)