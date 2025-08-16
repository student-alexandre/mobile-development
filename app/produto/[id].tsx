import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../src/store";
import { fetchById } from "../../src/store/productsSlice";

export default function Detalhes() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const user = useAppSelector(s => s.auth.user);
  const { current, loading, error } = useAppSelector(s => s.products);

  // proteção: se não logado, volta pro login
  useEffect(() => {
    if (!user) router.replace("/");
  }, [user, router]);

  // busca do produto
  useEffect(() => {
    if (id) {
      dispatch(fetchById(String(id)));
    }
  }, [id, dispatch]);

  if (error) {
    return <Text style={{ color: "crimson", padding: 16 }}>{error}</Text>;
  }

  if (loading || !current) {
    return <ActivityIndicator style={{ marginTop: 24 }} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.c}>
      {!!current.thumbnail && (
        <Image source={{ uri: current.thumbnail }} style={styles.img} resizeMode="contain" />
      )}
      <Text style={styles.t}>{current.title}</Text>
      <Text>{current.description}</Text>
      <Text style={styles.p}>Preço: ${current.price.toFixed(2)}</Text>
      {!!current.discountPercentage && (
        <Text>Desconto: {current.discountPercentage}%</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  c: { padding: 16, gap: 8 },
  img: { width: "100%", height: 260, marginBottom: 12 },
  t: { fontSize: 20, fontWeight: "600" },
  p: { fontWeight: "600", marginTop: 8 },
});
