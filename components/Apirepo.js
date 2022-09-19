import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Apirepo() {
    const [keyword, setKeyword] = useState('');
    const [data, setData] = useState([]);
  
    //https://api.github.com/search/repositories?q=
    const fetchRepos = () => {
      fetch('https://api.github.com/search/repositories?q=' + keyword)
      .then(response => response.json())
      .then(data => setData(data.items))
      .catch(err => Alert.alert('Error', err))
    }
  
    console.log(data);
  
    return (
    <View style={styles.container}>
      <FlatList
        data = {data}
        renderItem = {({item}) =>
          <View style = {{margin: 10}}>
            <Text style = {{fontSize: 20, fontWeight: 'bold'}}>{item.full_name}</Text>
            <Text style = {{fontSize: 16}}>{item.description}</Text>
          </View>
          } />
      <TextInput placeholder = 'Keyword'
      style ={{fontSize: 18, width: 200}}
      onChangeText={text => setKeyword(text)} />
      <Button title='Search' onPress={fetchRepos} />
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