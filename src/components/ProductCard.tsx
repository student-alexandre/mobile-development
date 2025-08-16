import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import type { Product } from "../store/productsSlice";
import { Link } from "expo-router";

export default function ProductCard({ item }: { item: Product }) {
  return (
    <Link href={`/produto/${item.id}`} asChild>
      <TouchableOpacity style={s.card}>
        {!!item.thumbnail && <Image source={{ uri: item.thumbnail }} style={s.img} />}
        <View style={{ flex: 1 }}>
          <Text style={s.title} numberOfLines={1}>{item.title}</Text>
          <Text style={s.desc} numberOfLines={2}>{item.description}</Text>
          <Text style={s.price}>${item.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const s = StyleSheet.create({
  card: { flexDirection: "row", gap: 12, padding: 12, borderBottomWidth: 1, borderColor: "#eee" },
  img: { width: 72, height: 72, borderRadius: 8, backgroundColor: "#fafafa" },
  title: { fontWeight: "600" },
  desc: { color: "#555", marginTop: 4 },
  price: { marginTop: 6, fontWeight: "700" },
});
