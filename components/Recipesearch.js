import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View, Image } from 'react-native';

export default function Recipesearch() {
    const [keyword, setKeyword] = useState('');
    const [food, setFood] = useState([]);
  
    const fetchData = () => {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then((response) => response.json())
      .then((data) => setFood(data.meals))
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
    }
  
    const listSeparator = () => {
        return (
            <View style = {{height: 1, width: '95%', backgroundColor: '#CED0CE'}} />
        );
    }
  
    return (
    <View style={styles.container}>
      <FlatList
        data = {food}
        keyExtractor={(item, index) => index.toString()}
        renderItem = {({item}) =>
          <View style = {{margin: 10}}>
            <Text style = {{fontSize: 20, fontWeight: 'bold'}}>{item.strMeal}</Text>
            <Image style = {{width: 100, height: 100}} source = {{uri: item.strMealThumb}} />
          </View>}
          ItemSeparatorComponent = {listSeparator} />
      <TextInput placeholder = 'Keyword'
      style ={{fontSize: 18, width: 200}}
      onChangeText={text => setKeyword(text)} />
      <Button title='Search' onPress={fetchData} />
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