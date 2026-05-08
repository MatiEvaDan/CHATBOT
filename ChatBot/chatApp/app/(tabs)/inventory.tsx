import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TextInput, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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

  const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    quality: 1,
  });
  if (!result.canceled) {
    const image = result.assets[0];
    const formData = new FormData();

    formData.append('image', {
      uri: image.uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    } as any);

    const response = await fetch(
      'https://chatbotlb-d4c8gngtcmgqaba2.francecentral-01.azurewebsites.net/api/image',
      {
        method: 'POST',
        body: formData,
      }
    );
    const data = await response.json();
    setImageURL(data.imageUrl);
  }
};
  
  return (
  <View style={{ flex: 1 }}>

    {/* FORM */}
    <View style={{ padding: 16 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,
          paddingTop: 20,
        }}>
        Nye produkter
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Navn"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />

      <TextInput
        value={author}
        onChangeText={setAuthor}
        placeholder="Afdeling"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />

      <TextInput
        value={year}
        onChangeText={setYear}
        placeholder="Nummer"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 8,
        }}
      />

      <TouchableOpacity
        onPress={pickImage}
        style={{
          backgroundColor: 'black',
          padding: 10,
          marginTop: 10,
          borderRadius: 8,
        }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Vælg billede
        </Text>
      </TouchableOpacity>

      {imageURL && (
        <Image
          source={{ uri: imageURL }}
          style={{
            width: 100,
            height: 100,
            marginTop: 10,
            borderRadius: 8,
          }}
        />
      )}

      <TouchableOpacity
        onPress={() => {
          const newBook = {
            title,
            author,
            year,
            imageURL,
          };

          createNewInventoryFromAPI(newBook)
            .then(() => {
              return getInventoryFromAPI();
            })
            .then((data) => {
              setListInventory(data);
            });
        }}
        style={{
          backgroundColor: 'black',
          paddingVertical: 10,
          paddingHorizontal: 10,
          borderRadius: 8,
          marginTop: 10,
        }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>
          Gem produkt
        </Text>
      </TouchableOpacity>
    </View>

    {/* LISTE */}
    <View style={{ flex: 1, paddingHorizontal: 16 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 10,
        }}>
        Lagerbeholdning
      </Text>

      <FlatList
        data={listInventory}
        extraData={listInventory}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 12,
              marginBottom: 10,
              borderWidth: 2,
              borderRadius: 20,
            }}>

            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: 17,
                marginBottom: 1,
              }}>
              {item.title}
            </Text>
            <Text>
              {item.author} • {item.year}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 10,
              }}>

              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  marginLeft: 6,
                }}>
                <Text style={{ color: 'white' }}>
                  Rediger
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  deleteInventoryFromAPI(item._id)
                    .then(() => {
                      return getInventoryFromAPI();
                    })
                    .then((data) => {
                      setListInventory(data);
                    });
                }}
                style={{
                  backgroundColor: 'black',
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  marginLeft: 6,
                }}>
                <Text style={{ color: 'white' }}>
                  Slet
                </Text>
              </TouchableOpacity>

            </View>
          </View>
        )}
      />
    </View>
  </View>
);

}