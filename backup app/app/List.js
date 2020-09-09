import React from 'react';
import { StyleSheet, Text, View, Button,LayoutAnimation, Dimensions, StatusBar, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import StatusbarCustom from './components/StatusbarCustom';
import Header from './components/Header';
import Navbar from './components/navbar';
import ListOne from './components/ListOne';
import CasItem from './components/CasItem';
import ListTow from './components/ListTow';
import LoadingCircular from './components/Loading';
import Logo from './components/logo';
import { Input, CheckBox } from 'react-native-elements';
import RangeSlider from 'rn-range-slider';
export default class List extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
      sonCategories: [],
      categories: [],
      key:-1,
      
      
      cas:[],
      products:[],
      categorySonId:0,
      sonId: this.props.navigation.state.params.id,
      caId:0,
      show:-1,
      title_:'',
      showS: false,
      showFilter: false,
	  type:'menu',
      progess: true,
      progessCategory: false,
      
      navigation: this.props.navigation,
    };
	
	apis.getHomePage().then(res => {
	
		
		if(res.data.items.length > 0){
		let categories = res.data.items
		
			this.setState({
			categories: categories,
			progessCategory: false,
			sonId:  (!this.state.sonId) ? res.data.items[0].id : this.state.sonId
		}) 
		 
		apis.getProductsMenu(this.state.sonId, 1,'','').then(res => {
			
			this.setState({
				products: res.data.items,
				progess: false,
				
			}) 
		});
		}else{
			this.setState({
				
				progess: false,
				
			}) 
		}
    });
  }
	componentDidMount() {
		
    
  }

  _promisAll = () => {
    

    /*
     * API getCategoryCode
     * @param
     *       categoryCode : string
     * */
	
    apis.getCategory().then(res => {
		this.setState({
			categories: res.data,
			
			categoryId:(this.props.categoryId) ? this.props.categoryId : res.data[0].id
		}) 
		
		apis.getCategorySon(res.data[0].id).then(res => {
			this.setState({
				sonCategories: res.data,
				categorySonId:res.data[0].id,
				title_:res.data[0].title,
			}) 
			
			apis.getCategorySon(res.data[0].id).then(res_ => {

					this.setState({
						cas: res_.data,
						progess: false,
					})
				
				
				
			})
			
			apis.getCategorySon(res.data[0].id).then(res_ => {

					this.setState({
						cas: res_.data,
						progess: false,
					})
				
				
				
			})		
				
		
		});
		
		
    });
	
	
  };
  _showSubSon(id){
	   let sub = []
		  this.setState({
			  categorySonId: this.state.sonCategories[id].id,
			  title_:this.state.sonCategories[id].title,
			  progess: true,
		  }) 
		  apis.getCategorySon(this.state.sonCategories[id].id).then(res_ => {

					this.setState({
						cas: res_.data,
						progess: false,
					})
				
				
				
			})
		
  }
  _sonCategory_(id){
	
	  let show = !this.state.showFilter
	
    this.setState({ showFilter: show }); 
		this.setState({ 
			progess: true,
			products: [],
			caId: id,
			sonId: 0,
		}); 	
		
		
  
	  
		apis.getProducts(id, 1, '', '').then(res => {
			
			this.setState({
				products: res.data.items,
				progess: false,
				
			}) 
		});
  }
  _sonCategorySon(id, key){
	  
	  let categories = this.state.categories
	  if(this.state.key != -1)categories[id].categories[this.state.key].show = !categories[id].categories[this.state.key].show
	  categories[id].categories[key].show = !categories[id].categories[key].show
	  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ categories: categories, key: key }); 	
  }
  _showFilterF = () => {
	let show = !this.state.showFilter
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ showFilter: show }); 	
  }
  _showSearch = () => {
	let show = !this.state.showS
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ showS: show }); 	
  }
  _showHight = () => {
	  this.setState({
				
				progess: true,
				
			}) 
			if(this.state.type=='ca'){
	  apis.getProducts(this.state.sonId, 1,'price', 'DESC').then(res => {
			
			this.setState({
				products: res.data.items,
				progess: false,
				
			}) 
	  });
			}
			else{
			apis.getProductsMenu(this.state.sonId, 1,'price', 'DESC').then(res => {
			
			this.setState({
				products: res.data.items,
				progess: false,
				
			}) 	
			});
			}
		
	let show = !this.state.showS
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ showS: show }); 	
  }
  _showLow = () => {
	  
	  this.setState({
				
				progess: true,
				
			})
	  if(this.state.type=='ca')
	  apis.getProducts(this.state.sonId, 1,'price', 'ASC').then(res => {
			
			this.setState({
				products: res.data.items,
				progess: false,
				
			}) 
			});
			else
			apis.getProductsMenu(this.state.sonId, 1,'price', 'ASC').then(res => {
			
			this.setState({
				products: res.data.items,
				progess: false,
				
			}) 
			
		});
	let show = !this.state.showS
	LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ showS: show }); 	
  }
  _sonCategory(id){
	let categories = this.state.categories
	
	let show = !this.state.showFilter
	
    this.setState({ showFilter: show }); 
		this.setState({
			progess: true,
			products: [],
			progessCategory: false,
			sonId: categories[id].id
		}) 
		
		apis.getProductsMenu(categories[id].id, 1,'','').then(res => {
			
			this.setState({
				products: res.data.items,
				progess: false,
				progessCategory: false,
				
			}) 
		});	
  }
  _showSub(id){
	  let sub = []
	  
	  this.setState({
		  categoryId: this.state.categories[id].id,
		  title_:this.state.categories[id].title,
		  progess:true,
	  })
	 apis.getCategorySon(this.state.categories[id].id).then(res => {
			this.setState({
				sonCategories: res.data,
				categorySonId:res.data[0].id,
				title_:res.data[0].title,
			}) 
			
			apis.getCategorySon(res.data[0].id).then(res_ => {

					this.setState({
						cas: res_.data,
						progess: false,
					})
				
				
				
			})
			
					
				
		
		
	  
			
					
				
		
		});
	  apis.getCategorySon(this.state.categories[id].id).then(res => {
		this.setState({
			sonCategories: (res.data) ? res.data: [],
			categorySonId:res.data[0].id,
			title_:res.data[0].title,
			
		}) 
		
    });
	  }
  render() {
    const {goBack} = this.props.navigation;
	const {search,progess } = this.state;
	if (progess) return <LoadingCircular />;
	else 
    return (
      <View style={styles.wrapper}>
      		<StatusbarCustom />
          	<ScrollView style={{backgroundColor:'#fff',}}>
          <Logo navigation={this.props.navigation} />
       			{/* category */}
				
       	    <ScrollView 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{backgroundColor:'#fff', marginTop: 20}}>  
				
				{
									this.state.categories.map((val, index_) => {
										if(val.id == this.state.sonId){ 
										 
										return (
										<View style={styles.flashsale_item}>
	                	<TouchableOpacity style={styles.item_image_section}    key={index_} onPress={this._sonCategory.bind(this, index_)}>
						
		                	<Image 
										style={[styles.h_banner_image, {borderRadius: ((width/5) - 20) / 2}]}
									 source={{uri: 'http://103.237.144.246/'+val.image,width: (width/5) - 20, height: (width/5) - 20}}/>
		       				
	       				</TouchableOpacity> 
	       				<Text style={[styles.item_title, {textAlign: 'center', marginTop: 8, fontSize: 13, fontWeight: 'bold', color: '#fc5b31'}]}>{val.name}</Text>
						</View>
										
                  
				  )
									}else{
										return (
										<View style={styles.flashsale_item}>
	                	<TouchableOpacity style={styles.item_image_section}    key={index_} onPress={this._sonCategory.bind(this, index_)}>
						
		                	<Image 
										style={[styles.h_banner_image, {borderRadius: ((width/5) - 20) / 2}]}
									 source={{uri: 'http://103.237.144.246/'+val.image,width: (width/5) - 20, height: (width/5) - 20}}/>
		       				
	       				</TouchableOpacity> 
	       				<Text style={[styles.item_title, {textAlign: 'center', marginTop: 8, fontSize: 13, fontWeight: 'bold', color: '#000'}]}>{val.name}</Text>
						</View>
				  )
									}
				})
				}
                 
				  
                  
				  
            </ScrollView>
			{
									this.state.categories.map((val, index_) => {
										
										return (
			<View style={{ height: val.show ? (height - 150) : 0, overflow: 'hidden', }}>
			<ScrollView style={{backgroundColor:'#fff', height:(height - 150)}}>
				{
									val.categories.map((ca, index_ca) => {
										
										return (
										<View style={{width: width, position:'relative'}}>
										
										<TouchableOpacity style={{width: width - 60, position:'relative'}} onPress={this._sonCategory_.bind(this, ca.id)}>
										<Text style={{width: width, position:'relative', fontWeight: 'bold', textAlign: 'center', marginTop:10, marginBottom: 10}}>
										{ca.name}
										</Text>
										
										
										</TouchableOpacity>
										{
											(ca.son.length) ?
										
											(!ca.show) ? 
										<TouchableOpacity style={{position:'absolute',  width: 60, paddingBottom:10, paddingTop:8, top: 0, right:0}}  onPress={this._sonCategorySon.bind(this, index_, index_ca)}>
										<Text style={{width: 60, fontWeight: 'bold', textAlign: 'center'}}>
										-
										</Text>
										</TouchableOpacity>
											:
											<TouchableOpacity style={{position:'absolute',  width: 60, paddingBottom:10, paddingTop:8, top: 0, right:0}}  onPress={this._sonCategorySon.bind(this, index_, index_ca)}>
										<Text style={{width: 60, fontWeight: 'bold', textAlign: 'center'}}>
										+
										</Text>
										</TouchableOpacity>
										: null
										}
										{
											(ca.son.length) ?
											<View style={{ height: ca.show ? null : 0, overflow: 'hidden', }}>
												{
									ca.son.map((son, index_son) => {
										
										return (
										<View style={{width: width, position:'relative'}}>
										
										<TouchableOpacity style={{width: width, position:'relative'}} onPress={this._sonCategory_.bind(this, son.id)}>
										<Text style={{width: width, position:'relative',textAlign: 'center', marginTop:10, marginBottom: 10}}>
										{son.name}
										</Text>
										
										
										</TouchableOpacity>
										</View>
											)
									})
												}
											</View>
											: null
											}
										
										</View>
										)
									})
				}
				</ScrollView>
			</View>
			)
										})
									}
			
            {/* category */}
            {/* filter */}
			
            <View style={[styles.filter, {borderTopWidth: 1, borderColor: '#000'}]}>
                <TouchableOpacity style={[styles.filer_left,{flexDirection:'row',flexWrap:'wrap'}]} onPress={this._showSearch}>
                    <Text style={[styles.sort_style,{marginTop:7,}]}>Sắp xếp</Text>
                    <View style={{marginTop:3,}}><Image source={require('./components/images/sort_style.png')}/></View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.filer_right,{flexDirection:'row',flexWrap:'wrap'}]} onPress={this._showFilterF} >
                    <Text style={[styles.sort_style,{marginTop:3,}]}>Bộ lọc </Text>
                    <View style={{marginTop:3,}}><Image source={require('./components/images/sort.png')}/></View>
                </TouchableOpacity>
            </View>
			
			<View style={{height: this.state.showS ? (height - 150) : 0, overflow: 'hidden',width: width, position:'relative'}}>
										
				<TouchableOpacity style={{width: width, position:'relative'}} onPress={this._showHight}>
					<Text style={{width: width, position:'relative',textAlign: 'center', marginTop:10, marginBottom: 10}}>
				Giá cao
			</Text>
										
										
			</TouchableOpacity>
			<TouchableOpacity style={{width: width, position:'relative'}} onPress={this._showLow}>
					<Text style={{width: width, position:'relative',textAlign: 'center', marginTop:10, marginBottom: 10}}>
				Giá Thấp
			
			</Text>
										
										
			</TouchableOpacity>
			</View>
			<View style={{height: this.state.showFilter ? null : 0, overflow: 'hidden',width: width, position:'relative'}}>
										
				<ScrollView style={{backgroundColor:'#fff'}}>
          
       			<View style={styles.box}>
                <View style={styles.mg_top}>
                      <View style={styles.text_box_left}><Text style={styles.text}>Tất cả sản phẩm</Text></View>
                      <View style={styles.text_box_right}><Image source={require('./components/images/up_arrow.png')}/></View>
                </View>
                <View styles={styles.option}>
					{
									this.state.categories.map((val, index_) => {
										
										return (
                  <View style={styles.check_box}>
				  <TouchableOpacity onPress={this._sonCategory.bind(this, index_)}>
                    <CheckBox
                      checkedIcon={<Image source={require('./components/images/checked.png')} />}
                      uncheckedIcon={<Image source={require('./components/images/unchecked.png')} />}
                      checked={(this.state.sonId == val.id) ? true : false}
                      
                    />
                    <Text style={[styles.tag_text, {fontSize: 14, fontWeight: 'bold', marginTop: 5, marginBottom: 5, color: (this.state.sonId == val.id) ? '#fc5b31' : '#000'}]}>{val.name}</Text> 
						</TouchableOpacity>
					 <View style={styles.option_box}>
							{
									val.categories.map((ca, index_ca) => {
										
										return (
										<View>
                            <TouchableOpacity style={{width: width, position:'relative'}} onPress={this._sonCategory_.bind(this,ca.id)}><Text style={[styles.obox_title, {fontSize: 13, fontWeight: 'bold', marginTop: 5, marginBottom: 5, color: (this.state.caId == ca.id) ? '#fc5b31' : '#000'}]}>{ca.name}</Text></TouchableOpacity>
							{
									ca.son.map((son, index_son) => {
										
										return (
										<TouchableOpacity style={{width: width, position:'relative'}} onPress={this._sonCategory_.bind(this,son.id)}><Text style={[styles.obox_title, {fontSize: 13, fontWeight: 'bold', marginTop: 5, marginBottom: 5, color: (this.state.caId == son.id) ? '#fc5b31' : '#000'}]}>{son.name}</Text></TouchableOpacity>
											)
									})
												}
							</View>
							)
									})
							}
                            
                      </View>
                    </View>
                   )
									})
					}
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.mg_top}>
                      <View style={styles.text_box_left}><Text style={styles.text}>Giá</Text></View>
                      <View style={styles.text_box_right}><Image source={require('./components/images/up_arrow.png')}/></View>
                </View>
                <View style={{marginLeft:10,}}>
                    <RangeSlider
                          style={{width: width-40, height: 80}}
                          gravity={'center'}
                          min={200}
                          max={1000}
                          step={20}
                          selectionColor="#3df"
                          blankColor="#f618"
                          
                      />
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.mg_top}>
                      <View style={styles.text_box_left}><Text style={styles.text}>Kích thước</Text></View>
                      <View style={styles.text_box_right}><Image source={require('./components/images/up_arrow.png')}/></View>
                </View>
                <View style={[styles.size,styles.grid]}>
                      <TouchableOpacity style={styles.size_text}><Text>XS</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.size_text}><Text>S</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.size_text}><Text>M</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.size_text}><Text>L</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.size_text}><Text>XL</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.size_text}><Text>XXL</Text></TouchableOpacity>
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.mg_top}>
                      <View style={styles.text_box_left}><Text style={styles.text}>Màu Sắc</Text></View>
                      <View style={styles.text_box_right}><Image source={require('./components/images/up_arrow.png')}/></View>
                </View>
                <View style={[styles.color,styles.grid]}>
                      <View style={styles.color_box}>
                           <Text style={{height:60,}}><Image source={require('./components/images/black.png')} />  <Text>Đen</Text></Text>
                      </View>
                      <View style={styles.color_box}>
                           <Text style={{height:60,}}><Image source={require('./components/images/red.png')} />  <Text>Đỏ</Text></Text>
                      </View>
                      <View style={styles.color_box}>
                          <Text style={{height:60,}}><Image source={require('./components/images/white.png')} />  <Text>Trắng</Text></Text>
                      </View>
                      <View style={styles.color_box}>
                          <Text style={{height:60,}}><Image source={require('./components/images/blue.png')} />  <Text>Xanh Lam</Text></Text>
                      </View>
                      <View style={styles.color_box}>
                          <Text style={{height:60,}}><Image source={require('./components/images/green.png')} />  <Text>Xanh Lục</Text></Text>
                      </View>
                      <View style={styles.color_box}>
                          <Text style={{height:60,}}><Image source={require('./components/images/yellow.png')} />  <Text>Vàng</Text></Text>
                      </View>
                </View>
            </View>
            <View style={styles.box}>
                <View style={styles.mg_top}>
                      <View style={styles.text_box_left}><Text style={styles.text}>Vị trí cửa hàng</Text></View>
                      <View style={styles.text_box_right}><Image source={require('./components/images/up_arrow.png')}/></View>
                </View>
                                      <View styles={styles.option}>
                   <View style={styles.check_box}>
                    <CheckBox
                      checkedIcon={<Image source={require('./components/images/checked.png')} />}
                      uncheckedIcon={<Image source={require('./components/images/unchecked.png')} />}
                      checked={this.state.checked}
                      onPress={() => this.setState({checked: !this.state.checked})}
                    />
                    <Text style={styles.tag_text}>Hà Nội</Text>
                    </View>
                    <View style={styles.check_box}>
                    <CheckBox
                      checkedIcon={<Image source={require('./components/images/checked.png')} />}
                      uncheckedIcon={<Image source={require('./components/images/unchecked.png')} />}
                      checked={this.state.checked}
                      onPress={() => this.setState({checked: !this.state.checked})}
                    />
                    <Text style={styles.tag_text}>TP Hồ Chí Minh</Text>
                    </View>
                    <View style={styles.check_box}>
                    <CheckBox
                      checkedIcon={<Image source={require('./components/images/checked.png')} />}
                      uncheckedIcon={<Image source={require('./components/images/unchecked.png')} />}
                      checked={this.state.checked}
                      onPress={() => this.setState({checked: !this.state.checked})}
                    />
                    <Text style={styles.tag_text}>Huế</Text>
                    </View>
                </View>
            </View>
			<View style={styles.complete}>
                <TouchableOpacity style={styles.left_button}>
                    <Text>Áp dụng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.right_button}>
                    <Text>Bỏ qua</Text>
                </TouchableOpacity>
            </View>
       </ScrollView>
										
										
			
			</View>
			
          {/* filter */}
        {/* item */}
            <View style={{marginBottom: 100}}>
                <View style={[styles.grid,styles.content]}>
				
				{
									this.state.products.map((val, index_) => {
										let promotion = 0
										if(val.promotion != null){
											promotion = 100 - parseInt((100*val.promotion)/val.price)
										}
										return (
                      <View style={styles.container}>
      				<View style={styles.flashsale_item_}>
	                	<TouchableOpacity style={styles.item_image_section}   onPress={() => this.props.navigation.navigate('Detail', {product: val} )}>
		                	<Image 
										style={styles.item_image}
									 source={{uri: 'http://103.237.144.246/'+val.image,width: width*0.5 - 20, height: width*0.5 - 20}}/>
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
            </View>
			)
				})
				}
			
			
                      
                </View>
            </View>
        {/* item */}
       </ScrollView>
          	<Navbar navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
  	height:height,
  },
  wrapper:{
	flex: 1  
  },
  grid:{
  	flexDirection:'row',
    flexWrap:'wrap',
  },
  category_hover:{
    paddingLeft: 15,
	paddingRight: 15,
    borderBottomWidth:2,
    borderBottomColor: '#fc5b31',
  },
  category:{
    paddingLeft: 15,
	paddingRight: 15,
    borderBottomWidth:1,
    borderBottomColor: '#A8A8A8',
  },
  category_grid:{
    marginTop:5,
    marginBottom:5,
    justifyContent:'center',
    alignItems:'center',
  },
  category_text:{
    fontSize:15,
  },
  filer_left:{
    marginLeft:15,
  },
  filer_right:{
    position: 'absolute',
    right:15,
    top:7,
  },
  container:{
    marginLeft:10,
    marginRight:10,
    marginTop:25,
  },
  flashsale_item_:{
  	width:width*0.5-20,
  },
  item_sale:{
  	position:'absolute',
  	top:10,
  	left:10,
  },
    flashsale_item:{
  	width:width*0.25, 
  	marginLeft:7.5,
  	marginRight:7.5, 
	alignItems: 'center'
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
    fontSize:15,
  },
  item_image:{
  	width:width*0.5-20,
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
 
  grid:{
  	flexDirection:'row',
    flexWrap:'wrap',
  },
  mg_top:{
    marginTop:25,
  },
  box:{
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    borderWidth:1,
    borderColor:'#f0f0f0',
  },
  text_box_left:{
    marginLeft:25,
  },
  text:{
    fontSize:11,
    
    textTransform: 'uppercase',
  },
  text_box_right:{
    position: 'absolute',
    right:25,
    top:5,
  },  
  tag_text:{
    position:'absolute',
    left:width*0.15,
    top:16,
  },
  tag_number:{
    color:'#C4C4C4'
  },
  obox_title:{
    fontSize:11,
    marginTop:3,
  },
  option_box:{
    marginLeft:width*0.18,
  },
  size:{
    marginLeft:25,
    marginTop:20,
    marginBottom:20,
  },
  size_text:{
    width:40,
    height:40,
    borderWidth:1,
    borderColor:'#C4C4C4',
    justifyContent:'center',
    alignItems:'center',
  },
  color:{
    marginLeft:25,
    marginTop:20,
    marginBottom:20,
  },
  color_box:{
    paddingBottom:20,
    width:width*0.4,
  },
  left_button:{
    width:width*0.5-20,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#fc5b31',
    backgroundColor:'#fc5b31',
    borderRadius:30,
    marginLeft:10,
  },
  complete:{
    height:80,
    paddingTop:10,
    backgroundColor:'#fff',
  },
  right_button:{
    width:width*0.5-20,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderWidth:1,
    borderColor:'#fc5b31',
    backgroundColor:'#fff',
    borderRadius:30,
    position:'absolute',
    right:10,
    top:10,
  },
});