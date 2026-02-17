import { useEffect, useState } from "react";
import { getBooks } from "../lib/books";
import { Book } from "../types/database";
import { Text, FlatList, View } from "react-native";

export default function LibraryScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={books}
      keyExtractor={(item: Book) => item.id}
      renderItem={({ item }) => (
        <View>
          <Text>{item.title}</Text>
          <Text>{item.authors.map((author) => author.name).join(", ")}</Text>
        </View>
      )}
    />
  );
}
