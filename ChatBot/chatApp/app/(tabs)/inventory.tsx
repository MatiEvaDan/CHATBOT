import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Button, TextInput} from 'react-native';

type Inventory = {
  _id: string,
  title: string,
  author: string,
  year: number
}
type InventoryResponse = {
  success: boolean;
  count: number;
  data: Inventory [];

}
type CreateBook = {
  title: string,
  author: string,
  year: string
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
    year: newBook.year
  }),

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
  
  return ( 
   <View>
    <View>
      <FlatList
        data={listInventory}
        keyExtractor={(item) => item._id}
        renderItem={({item})=> (
          <Text> {item.title} - {item.author} - {item.year}</Text>  
        )}
      /> 
      <TextInput value={title} onChangeText={setTitle} placeholder='Titel' style={{borderWidth: 1,padding: 10}}
      />
      <TextInput value={author} onChangeText={setAuthor} placeholder='Forfatter' style={{borderWidth: 1,padding: 10}}
      />
      <TextInput value={year} onChangeText={setYear} placeholder='Årstal' style={{borderWidth: 1,padding: 10}}
      />


      
      <Button title="Opret nyt produkt" onPress={()=>{
        const newBook = {title, author, year}
        createNewInventoryFromAPI(newBook) 
        .then(()=>{
          alert("Produkt korrekt oprettet")
        })
      }}>
      </Button>
      
    </View>
   </View>
  );
}


