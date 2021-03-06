import React , {useState} from 'react'
import {Image, Button, View, Text} from 'react-native'
import CartScreen from './CartScreen'

const WalletScreen = props => {
    const [posted, setPosted] = useState(false)
    const [orderNum, setOrderNum] = useState(0)
    
    const cart = props.navigation.getParam('cart')
    const store = props.navigation.getParam('store')
    if (cart){

        function postPurchasesAync(){
            console.log('posting')
            var postArray = []
            var itemsOrdered = {}
            cart.forEach(item => {
                if(!(item.sku in itemsOrdered)){
                    itemsOrdered[item.sku] = {quantity : 0, price : item.sales_price}
                }
                itemsOrdered[item.sku]['quantity'] = itemsOrdered[item.sku]['quantity'] + 1
            })
            console.log(itemsOrdered, 'is items ordered')
            for (var key in itemsOrdered) {
                postArray = [...postArray, {sku:key,quantity:itemsOrdered[key]['quantity'],price:itemsOrdered[key]['price']}]
            }
            console.log('post array is', postArray)
            console.log('store is', store)
            console.log(`https://dfscstore.azurewebsites.net/checkout/${store.store_id}/'aditya166@gmail.com'`)

            fetch(`https://dfscstore.azurewebsites.net/checkout/${store.store_id}/'aditya166@gmail.com'`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({data: postArray}  
                ),
    
            }).then((response) => response.json())
            .then((responseJson) => {
              console.log(responseJson)
              setOrderNum(responseJson)
            })
            .catch((error) => {
              console.error(error);
            });
        }
        
        if (!posted) {
            postPurchasesAync()
            setPosted(true)
        }
        return (<View>
            <View style={{marginVertical:10}}>
                <Text style={{textAlign:'center', fontSize:24}}>{orderNum ? `Order # ${orderNum} Confirmed!` : 'Confirming Order...'}</Text>
    
                <Text style={{textAlign:'center', fontSize:18}}>Scan QR Code below at checkout</Text>
            </View>
            <View style={{flex:1, flexDirection:'row', justifyContent:'center', marginVertical:10, width:'100%', height:200}}>
                {orderNum? <Image
                // source={require('../assets/Images/success.png')} 
                source={{uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=dfscstore.azurewebsites.net/redeem/${orderNum}` }}
                style={{width:150, height:150}} 
                fadeDuration={1000} /> : <Text style={{fontSize:16}}>Loading...</Text> }
                
            </View>
            
            
        </View>)
    }else{
        if (!posted){
            setOrderNum(15)
            setPosted(true)
        }
        
        return (<View>
            <View style={{marginVertical:10}}>
                <Text style={{textAlign:'center', fontSize:24}}>{orderNum ? `Order # ${orderNum} Confirmed!` : 'Confirming Order...'}</Text>
    
                <Text style={{textAlign:'center', fontSize:18}}>Scan QR Code below at checkout</Text>
            </View>
            <View style={{flex:1, flexDirection:'row', justifyContent:'center', marginVertical:10, width:'100%', height:200}}>
                {orderNum? <Image
                // source={require('../assets/Images/success.png')} 
                source={{uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=dfscstore.azurewebsites.net/redeem/${orderNum}` }}
                style={{width:150, height:150}} 
                fadeDuration={1000} /> : <Text style={{fontSize:16}}>Loading...</Text> }
                
            </View>
        </View>)
    }

    
}

WalletScreen.navigationOptions = navigationData => {
    return {
        title: 'Order Confirmation',
    }
  };

export default WalletScreen