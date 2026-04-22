import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { getCoverUrl, BookResult, searchBooks } from "../lib/googleBooks";

export function AddBookScreen({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<BookResult[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookResult | null>(null);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 2) {
      const books = await searchBooks(query);
      setResults(books);
    } else {
      setResults([]);
    }
  };

  const handleSelectBook = (book: BookResult) => {
    setSelectedBook(book);
    setResults([]);
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      <Text>Search for a book</Text>
      <TextInput
        placeholder="Type to search..."
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.input}
      />

      {results.length > 0 && (
        <FlatList
          data={results.slice(0, 10)}
          keyExtractor={(item: BookResult) => item.key}
          renderItem={({ item }: { item: BookResult }) => {
            const coverUrl = getCoverUrl(item.cover_i);
            return (
              <TouchableOpacity
                style={styles.result}
                onPress={() => handleSelectBook(item)}
              >
                {item.cover_i && coverUrl && (
                  <Image source={{ uri: coverUrl }} style={styles.thumbnail} />
                )}
                <View>
                  <Text>{item.title}</Text>
                  <Text>{item.author_name?.join(", ")}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  result: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  thumbnail: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  resultText: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  author: {
    color: "#666",
  },
  selected: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 5,
  },
  saveButton: {
    marginTop: 15,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
