import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useAppDispatch } from "../src/store";
import { login } from "../src/store/authSlice";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    if (!email.includes("@") || password.length < 3) {
      setError("Informe um e-mail válido e senha com 3+ caracteres.");
      return;
    }
    dispatch(login({ email }));
    router.replace("/(tabs)/masculino");
  };

  return (
    <View style={styles.c}>
      <Text style={styles.h1}>Bem-vindo</Text>
      <TextInput
        style={styles.in}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.in}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {!!error && <Text style={styles.err}>{error}</Text>}
      <Button title="Entrar" onPress={onSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  c: { flex: 1, justifyContent: "center", padding: 24, gap: 12 },
  h1: { fontSize: 24, fontWeight: "600", marginBottom: 12 },
  in: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 12 },
  err: { color: "crimson" },
});
