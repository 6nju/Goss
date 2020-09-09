import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Header from './components/Header';
import Navbar from './components/navbar';
import CountDown from 'react-native-countdown-component';
import ListOne from './components/ListOne';
import Logo from './components/logo';
import StatusbarCustom from './components/StatusbarCustom';
import ListTow from './components/ListTow';
export default class FlashsaleTow extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      type:0,
      products:this.props.navigation.state.params.products,
      end:this.props.navigation.state.params.end,
      navigation: this.props.navigation,
	  progessFlash: true,
	 
    };
	
  }
  render() {
    const {goBack} = this.props.navigation;
    return (
      <View style={styles.wrapper}>
          
		<StatusbarCustom />
          <View style={[styles.itemcenter,{marginBottom: 60}]}>

            <ScrollView contentInsetAdjustmentBehavior="automatic" style={{backgroundColor: '#f7f7f7'}}>

              {/* Home Header Logo */}
              <Logo navigation={this.props.navigation} />
		          	
		              
                    
             		<View style={[styles.soft, {marginTop: 25}]}>
                  		<View>
			  <View style={[styles.countdown, {marginTop: 0}]}>
				<View style={styles.text}><Text style={[styles.text_color, {fontSize: 15, fontWeight: 'bold', width: 100, marginLeft: 10, marginTop: 5}]}>FLASHSALE</Text>
				<View style={{position: 'absolute', right: 10, top: -5}}>
				<CountDown
					until={this.state.end}
					size={12}
					onFinish={() => alert('Finished')}
					digitStyle={{backgroundColor: '#000', borderWidth: 2, borderColor: '#000'}}
					digitTxtStyle={{color: '#fff'}}
					timeToShow={['D','H','M', 'S']}
					timeLabels={{d:'Ngày',h:'Giờ',m: 'Phút', s: 'Giây'}}
					timeLabelStyle={{color: '#A8A8A8', fontWeight: 'bold'}}
				  /></View></View>
				  
				  
				 </View>
				 
				 
				
				</View>
                  		
					{ 
						(!this.state.type) ?
						<ListOne navigation={this.props.navigation} products={this.state.products}/>
						: <ListTow navigation={this.state.navigation} products={this.state.products}/>
					}
                  	</View>
                  	
                 
		    </ScrollView>
			</View>
		    <Navbar navigation={this.props.navigation} />     
      </View>
    );
  }
}

const styles = StyleSheet.create({
text_color:{
  	color:'red',
	fontWeight: 'bold',
  },
	wrapper:{
		flex: 1
	},
 	header_section:{
	    flexDirection:'row',
	    flexWrap:'wrap',
	    backgroundColor:'#fff',
	    paddingTop:5,
	    paddingBottom:5,
  	},
	scrollview_section:{
		height: height - 65
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
  	soft:{
    	paddingBottom:10,
    },
    item_rate:{
      flexDirection:'row',
      flexWrap: 'wrap',
      marginLeft:15,
      marginTop:10,
    },
    left_soft:{
    	marginLeft:0,
		width: 150
    },
    right_soft:{
		top: -30,
    	marginLeft:15,
    	position:'absolute',
    	right:15,
		width: 110
    },
    item_section:{
  		marginLeft:15,
  		marginRight:15,
  		flexDirection:'row',
  		flexWrap:'wrap',
  		marginBottom:100,
  	},
  	item:{
      width:(width-30)*0.5,
      borderColor:'#e3e3e3',
      borderWidth:1,
      backgroundColor:'#fff',
    },
    item_image:{
      alignItems:'center',
      justifyContent:'center',
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
    item_price:{
      marginLeft:15,
      textTransform: 'uppercase',
      color:'#0c6dac',
      marginTop:12,
      marginBottom:10,
    },
	countdown:{
  	backgroundColor:'#f7f7f7',
  	paddingBottom:10,
  	paddingTop:20,
	marginTop: -20
	
  },
  text:{
  flexDirection:'row',
  		flexWrap:'wrap',
  	alignItems:'center',
  	marginBottom:10,
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
  	width25:{
	    width:width*0.25,
	    alignItems:'center',
	    marginTop:5,
  	},
  	bottom1:{
	    color:'#8d8d8d',
	    fontSize:12,
  	},
});