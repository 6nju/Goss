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




export default class ListOne extends Component {
  constructor(props) {
    super(props);
	this.state = {
		products:this.props.products,
    };
	
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
        <View style={styles.item_section}>
			{
									this.state.products.map((val, index_) => {
										let promotion = 0
										if(val.promotion != null){
											promotion = 100 - parseInt((100*val.promotion)/val.price)
										}
										let img = val.image
										return (
						<View style={styles.flashsale_item}>
	                	<TouchableOpacity style={styles.item_image_section}  onPress={() => this.props.navigation.navigate('Detail', {product: val} )}>
		                	
							<Image 
										style={styles.item_image}
									 source={{uri: 'http://103.237.144.246/'+ img,width: width*0.5, height: width*0.5}}/>
		       				<View style={styles.item_sale}>
	       						<View style={styles.item_sale1}><Text style={styles.item_sale2}>{promotion}%</Text></View>
	       					</View>
	       				</TouchableOpacity>
	       				<Text style={styles.item_title}>{val.title}</Text>
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
	       				
	                </View>
					 
						)
									})
			}
                 </View>
    );
  }
}

const styles = StyleSheet.create({
    item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
      marginLeft:15,
      marginTop:10,
    },
    item_section:{
  		
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginBottom:100,
  	},
	item_price:{
      marginLeft:15,
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
    },
  	item:{
      width:(width)*0.5,
      borderColor:'#e3e3e3',
      
      backgroundColor:'#fff',
    },
    item_image:{
      alignItems:'center',
      justifyContent:'center',
    },
    image_fit:{
      width:(width)*0.5,
    },
    item_title:{
      marginLeft:15,
      marginTop:15,
      textTransform: 'uppercase',
      color:'#0f1738',
    },fl_scrollview:{
  	marginTop:15,
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
  flashsale_item:{
  	width:width*0.5 - 20,
  	marginLeft: 10, marginRight: 10
  },
  item_sale:{
  	position:'absolute',
  	top:10,
  	left:10,
  },
  item_sale1:{
  	backgroundColor:'red',
  	borderRadius:40,
  },
  item_sale2:{
  	color:'#fff',
  	fontSize:13,
  	fontWeight:'bold',
  	paddingLeft:6,
  	paddingRight:6,
  },
  item_title:{
  	paddingRight:10,
  	marginTop:10,
    
	
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
