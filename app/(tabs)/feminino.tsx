import { useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../../src/store";
import { fetchByCategory } from "../../src/store/productsSlice";
import ProductCard from "../../src/components/ProductCard";

const CATS = ["womens-bags","womens-dresses","womens-jewellery","womens-shoes","womens-watches"];

export default function Feminino() {
  const dispatch = useAppDispatch();
  const { loading, error, byCategory } = useAppSelector(s => s.products);

  useEffect(() => {
    CATS.forEach(cat => dispatch(fetchByCategory(cat)));
  }, [dispatch]);

  const data = [
    ...(byCategory["womens-bags"] || []),
    ...(byCategory["womens-dresses"] || []),
    ...(byCategory["womens-jewellery"] || []),
    ...(byCategory["womens-shoes"] || []),
    ...(byCategory["womens-watches"] || []),
  ];

  return (
    <View style={{ flex: 1 }}>
      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}
      {!!error && <Text style={{ color: "crimson", padding: 12 }}>{error}</Text>}
      <FlatList
        data={data}
        keyExtractor={i => String(i.id)}
        renderItem={({ item }) => <ProductCard item={item} />}
      />
    </View>
  );
}
