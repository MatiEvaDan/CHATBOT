import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TextInput, TouchableOpacity, Image} from 'react-native';

type Inventory = {
  _id: string,
  title: string,
  author: string,
  year: number,
  imageURL: string
}
type InventoryResponse = {
  success: boolean;
  count: number;
  data: Inventory [];

}
type CreateBook = {
  title: string,
  author: string,
  year: string,
  imageURL: string

}

const getInventoryFromAPI = () => {
  return fetch('https://chatbotlb-d4c8gngtcmgqaba2.francecentral-01.azurewebsites.net/api/books')
  .then(response => response.json())
    .then(json => {
      return (json as InventoryResponse).data;
    })
    .catch(error => {
      console.error(error);
      return [];
    });
}
const createNewInventoryFromAPI = (newBook:CreateBook) => {
  return fetch('https://chatbotlb-d4c8gngtcmgqaba2.francecentral-01.azurewebsites.net/api/books',{
    method:'POST',
    headers: {
      Accept: 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    title: newBook.title,
    author: newBook.author,
    year: newBook.year,
    imageURL: newBook.imageURL
  })

  }) 
    .then(response => response.json())
    .then(json => {
      return json
    })
    .catch(error => {
      console.error(error);
      return [];
    }); 
}
const deleteInventoryFromAPI = (id) => {
  return fetch(`https://chatbotlb-d4c8gngtcmgqaba2.francecentral-01.azurewebsites.net/api/books/${id}`,{
    method:'DELETE'
  })
}

export default function Inventory(){
  const [listInventory, setListInventory] = useState<Inventory[]>([]);
  useEffect(()=> {
    getInventoryFromAPI().then((data)=>{
      setListInventory(data)
    })    
  },[]);
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [imageURL, setImageURL] = useState<string>("");
  
  return ( 
    <View>

      <View style={{padding:16}}>
        <Text style={{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 20,

      }}>
        Nye produkter

  </Text>
  
      <TextInput value={title} onChangeText={setTitle} placeholder='Titel' style={{borderWidth: 1,padding: 10}}
      />
      <TextInput value={author} onChangeText={setAuthor} placeholder='Forfatter' style={{borderWidth: 1,padding: 10}}
      />
      <TextInput value={year} onChangeText={setYear} placeholder='Årstal' style={{borderWidth: 1,padding: 10}}
      />
      <TextInput value={imageURL} onChangeText={setImageURL} placeholder='Billede' style={{borderWidth: 1,padding: 10}}
      />
      {imageURL && (
      <Image source={{uri:imageURL}} style={{ width: 100, height: 100 }} ></Image>
      )}
      <TouchableOpacity onPress={()=>{
        const newBook = {title, author, year, imageURL}
        createNewInventoryFromAPI(newBook) 
        .then(()=>{
            return getInventoryFromAPI()
        }) 
        .then((data) => {
    setListInventory(data)}
        )}}
        
        style={{ 
        backgroundColor: 'black',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginLeft: 6 }}>
          <Text style={{ color: 'white' }}>Opret nyt produkt</Text>
          </TouchableOpacity>
      </View>
         
          
        
  <View style={{ padding: 16 }}>
  <Text style={{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingTop: 20,

  }}>
    Lagerbeholdning
  </Text>
          <FlatList
        data={listInventory}
        keyExtractor={(item) => item._id}
        renderItem={({item})=> (
        <View style={{
          justifyContent:'space-between',
          flexDirection:'row',
          padding: 10,
          marginVertical: 1,
          borderWidth: 2,
          borderRadius: 30
        }}>

        <Text style={{ fontWeight: 'bold', color: 'green' }}>{item.title}</Text>
        <Text>{item.author} • {item.year}</Text>
        

        <View style={{flexDirection:'row'}}>
          <TouchableOpacity style={{ 
        backgroundColor: 'black',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginLeft: 6 }}>
          <Text style={{ color: 'white' }}>Rediger</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{
        deleteInventoryFromAPI(item._id) 
        .then(()=>{
            return getInventoryFromAPI()
        }) 
        .then((data) => {
    setListInventory(data)}
        )}}
        style={{ 
        backgroundColor: 'black',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginLeft: 6 }}>
          <Text style={{ color: 'white' }}>Slet</Text>
          </TouchableOpacity>
        </View>

          </View>
        )}
        />
        
      
      
    </View>
     </View> 
   
        );

      }

