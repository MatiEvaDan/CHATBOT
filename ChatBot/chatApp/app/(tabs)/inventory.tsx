import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";

 type Book = {
  _id: number;
  title: string;
  description: string;
};


export default function BookScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://chatbotlb-d4c8gngtcmgqaba2.francecentral-01.azurewebsites.net/books")
      .then(res => res.json())
    .then(data => {
      setBooks(data);
      })
      .catch(err => {
        console.log("Fejl:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }


  return (
    <View style={{ padding: 20 }}>
      <FlatList
        data={books}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontWeight: "bold" }}>
              {item.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
}