import React from 'react'
import { ScrollView, View, Button, Text} from 'react-native'
import Card from '../components/Card'


const CartScreen = props => {
    const cart = props.navigation.getParam('cart')
    const store = props.navigation.getParam('store')
    
    const computeItemSalePrice = (product) => {
        return product.price * (100 - product.discount) / 100
    }
    const computeTotalSale = () => {
        var totalSale = 0
        cart.forEach( item => totalSale += computeItemSalePrice(item))
        return totalSale.toFixed(2)
    }

    
    return (
        <ScrollView>
                <View style={{flex:1, justifyContent:'center', marginVertical:10}}>
                  <Text style={{textAlign:'center', fontSize:24, fontWeight:'bold'}}>Store: {store.fuel_company + "'s " + store.name}</Text>
                  <Text style={{textAlign:'center', fontSize:18}}>Address: {store.address}</Text>
                </View>
                {cart.map(product => (
                  <View style={{borderColor:'#000',borderWidth:2}}>
                  <Card
                  key={product.sku}
                  imageUri={product.imageurl}
                  title={product.product}
                  description={`Was $${product.price} NOW $${computeItemSalePrice(product)}`}
                />
                  </View>
                ))}
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around', height:50, alignItems:'center'}}>
                    <Text><Text style={{fontWeight:'bold'}}>TOTAL SALE:</Text> ${computeTotalSale()}</Text>
                    <Button title='Buy Now' onPress={()=>{
                        var cartAugmented = []
                        cart.forEach( item => cartAugmented = [...cartAugmented, {...item, sales_price: computeItemSalePrice(item)}])
                        
                        props.navigation.navigate({routeName: 'Wallet', params: {cart: cartAugmented, store:store}})
                    }} />
                </View>
                
              </ScrollView>
    )
}

CartScreen.navigationOptions = navigationData => {
    
    console.log(navigationData)
    const cart = navigationData.navigation.getParam('cart')
    const store = navigationData.navigation.getParam('store')
    return {
        title: `CART: ${store.fuel_company} - ${store.name}`,

        // headerRight: <Button style={{marginRight:10}} title='Buy' onPress={()=>{
        //     navigationData.navigation.navigate({routeName: 'Wallet', params: {cart: cart, store:store}})
        // }}/>,
    }
}
export default CartScreen