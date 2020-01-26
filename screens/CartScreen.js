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
        return totalSale
    }

    
    return (
        <ScrollView>
                <View style={{flex:1, justifyContent:'center'}}>
                  <Text style={{textAlign:'center'}}>Store: {store.fuel_company + "'s " + store.name}</Text>
                  <Text style={{textAlign:'center'}}>Store Address: {store.address}</Text>
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
                <Text>TOTAL SALE: ${computeTotalSale()}</Text>
              </ScrollView>
    )
}

CartScreen.navigationOptions = navigationData => {
    
    console.log(navigationData)
    const cart = navigationData.navigation.getParam('cart')
    const store = navigationData.navigation.getParam('store')
    return {
        title: `CART: ${store.fuel_company} - ${store.name}`,

        headerRight: <Button style={{marginRight:10}} title='Buy' onPress={()=>{
            console.log('pushed button')
            console.log('cart')
            console.log(cart)
            navigationData.navigation.navigate({routeName: 'Cart', params: {cart: cart, store:store}})
        }}/>,
    }
}
export default CartScreen