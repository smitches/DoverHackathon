import React , {useState} from 'react'
import { Button, View, Text, ScrollView} from 'react-native'
import Card from '../components/Card'

const StoreScreen = props => {
    const [loading, setLoading] = useState(true)
    const [storeProducts, setStoreProducts] = useState([])
    // const [cart, setCart] = useState([])
    console.log(props)
    const store = props.navigation.getParam('store')
    const cart = props.navigation.state.params.cart
    
    function getProductsFromStoreAsync(){
        let url = `https://dfscstore.azurewebsites.net/getproducts/${store.store_id}`
        return fetch(url)
          .then((response) => response.json())
          .then((responseJson) => { 
            console.log(responseJson)
            setStoreProducts(responseJson)
            console.log('got store products')
            setLoading(false)
          })
          .catch((error) => {
            console.error(error);
          });
      }
    
      if (loading){
          getProductsFromStoreAsync()
      }
    //   props.navigation.setParams({'cart':cart})
    return (
              <ScrollView>
                <View style={{flex:1, justifyContent:'center'}}>
                  <Text style={{textAlign:'center'}}>Store: {store.fuel_company + "'s " + store.name}</Text>
                  <Text style={{textAlign:'center'}}>Store Address: {store.address}</Text>
                </View>
                {storeProducts.map(product => (
                  <View style={{borderColor:'#000',borderWidth:2}}>
                  <Card
                  key={product.sku}
                  imageUri={product.imageurl}
                  title={product.product}
                  description={`$${product.price} (max discount ${product.discount}%)`}
                />
                  <Button title='Add to cart' onPress={((productObject) => {
                    console.log(cart, 'is cart')
                    console.log(props.navigation.state,'is state')
                    props.navigation.setParams({cart: [...cart, productObject]})
                  }).bind(this,product)}      
                />
                  </View>
                ))}
              </ScrollView>
            )
          
}

StoreScreen.navigationOptions = navigationData => {
    console.log("NAVIGATIONDATA FAM")
    console.log(navigationData)
    console.log('navigation DAT DONE')
    const cart = navigationData.navigation.getParam('cart')
    const store = navigationData.navigation.getParam('store')
    return {
        title: 'Products at your C-Store',

        headerRight: <Button style={{marginRight:10}} title={`Cart(${cart.length})`} onPress={()=>{
            console.log('pushed button')
            console.log('cart')
            console.log(cart)
            navigationData.navigation.navigate({routeName: 'Cart', params: {cart: cart, store:store}})
        }}/>,
    }
    
    
    // headerRight: <NavButton onPress={() => {
    //     console.log('pushed button')
    //     this.props.navigation.navigate('Cart')
    // }} />
  };

export default StoreScreen