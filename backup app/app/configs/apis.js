
import Axios from 'axios'

export default apis = {
	getSlider() {
		return Axios.get('api/get-slider')
	},
	
	getFlashSale() {
		return Axios.get('api/get-sale')
	},
	
	order(id, name, phone, address, coupon, promotion, products, values, total, ship, ma, hinhthucthanhtoan, thongtinvanchuyen) {
		
		return Axios.post('api/save-order', { 
			id: id,
			name: name,
			phone: phone,
			address: address,
			coupon: coupon,
			values: values,
			promotion: promotion,
			products: products,
			total: total,
			ship: ship,
			hinhthucthanhtoan: hinhthucthanhtoan,
			thongtinvanchuyen: thongtinvanchuyen,
			ma: ma,
			pay_m: '',

		})
	},
	
	getShip() {
		return Axios.get('api/get-ship')
	},
	
	getPromotion(page) {
		return Axios.get('api/get-promotion?page='+page)
	},
	getNewProductPage(page) {
		return Axios.get('api/get-new?page='+page)
	},
	getProductInfo(id) {
		return Axios.get('api/get-product-info/'+id)
	},
	getNewProduct() {
		return Axios.get('api/get-new')
	},
	getHomePage() {
		return Axios.get('api/get-home')
	},
	
	getMenu(id) {
		return Axios.get('api/get-categories/'+id)
	},
	
	getProductsMenu(id, page, type, ss) {
		return Axios.get('api/menu-child/'+id+'?page='+page+'&type='+type+'&ss='+ss)
	},
	getProducts(id, page, type, ss) {
		return Axios.get('api/category-child/'+id+'?page='+page+'&type='+type+'&ss='+ss)
	},
	
	
	
	getNew(page) {
		return Axios.get('news?page='+page)
	},
	getRecruitment(page) {
		return Axios.get('api/recruitment?page='+page)
	},
	
	coupon(coupon) {
		return Axios.post('api/get-coupon-code', { couponcode: coupon })
	},
	getWarrantyPolicy() {
		return Axios.get('api/policy/warranty')
	},
	getPolicyRetunExchange() {
		return Axios.get('api/policy/return-exchange')
	},
	getPaymentPolicy() {
		return Axios.get('api/policy/payment')
	},
	getShippingPolicy() {
		return Axios.get('api/policy/shipping')
	},
	forgot(email) {
		return Axios.post('api/customer/forgot-password', { email: email })
	},
	customer() {
		return Axios.get('api/customer')
	},
	
	getProduct(id) {
		return Axios.get('api/product/'+id)
	},
	
	getBestSale(page) {
		return Axios.get('api/best-sellers/products?page='+page)
	},
	
	getCatalog() {
		return Axios.get('api/document/catalog/')
	},
	getCategory() {
		return Axios.get('api/categories/')
	},
	login(username, password) {
		return Axios.post('api/login', { username: username, password: password })
    },
	getNewInfo(id) {
		return Axios.get('api/get-info/'+id)
	},
	register(username, phone, password, email, address) {
		return Axios.post('api/create-account-customer', {
			name: username,
			phone: phone,
			email: email,
			address: address,
			password: password,
		})
    },
	
	getCategorySon(id) {
		return Axios.get('api/category-child/'+id)
	},

	getSearchOption(from, to, category, catalog) {
		return Axios.get('api/products?price[from]='+from+'&price[to]='+to+'&category_id='+category+'&catalog='+catalog)
		
	},
	getProductList(id) {
		return Axios.get('api/products/'+id)
	},
    getSearch(search) {
		return Axios.get('api/products/search/'+search)
	},
    
}
