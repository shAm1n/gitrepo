import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Exchange() {
    const [from, setFrom] = useState('');
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(0);
    const [exchange, setExchange] = useState(0);
  
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("apikey", "AKQUVN6rmzGwF3ID6EDnKvrHWZIiFd8u");
        
        var requestOptions = {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders
        };
        
        fetch("https://api.apilayer.com/currency_data/list", requestOptions)
          .then((response) => response.text())
          .then((result) => setCurrencies(result.symbols))
          .catch((error) => console.log('error', error));
    }, []);

    const fetchResult = () => {
    var myHeaders = new Headers();
        myHeaders.append("apikey", "AKQUVN6rmzGwF3ID6EDnKvrHWZIiFd8u");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
        };
    
    fetch(`https://api.apilayer.com/currency_data/convert?to=EUR&from=${from}&amount=${amount}`, requestOptions)
        .then((response) => response.text())
        .then((result) => setExchange(result))
        .catch((error) => console.log('error', error));
    }

  
    console.log(currencies);
  
    return (
    <View style={styles.container}>
      <Text>{exchange}</Text>
      <TextInput placeholder = 'Amount'
      style ={{fontSize: 18, width: 200}}
      onChangeText={digit => setAmount(Number(digit))} />
      <Picker selectedValue={from}
        onValueChange={(value, index) =>
        setFrom(value)}>
        {Object.keys(currencies).map((cur) => {
                return (
                    <Picker.Item key={cur}
                        label = {cur} value = {cur} />
                );
            })}
        </Picker>
      <Button title='Convert' onPress={fetchResult} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});