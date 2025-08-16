import { useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
import { useAppDispatch, useAppSelector } from "../../src/store";
import { fetchByCategory } from "../../src/store/productsSlice";
import ProductCard from "../../src/components/ProductCard";

const CATS = ["mens-shirts", "mens-shoes", "mens-watches"];

export default function Masculino() {
  const dispatch = useAppDispatch();
  const { loading, error, byCategory } = useAppSelector(s => s.products);

  useEffect(() => {
    CATS.forEach(cat => dispatch(fetchByCategory(cat)));
  }, [dispatch]);

  const data = [
    ...(byCategory["mens-shirts"] || []),
    ...(byCategory["mens-shoes"] || []),
    ...(byCategory["mens-watches"] || []),
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
