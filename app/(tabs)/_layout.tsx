import { Tabs, useRouter } from "expo-router";
import { Button } from "react-native";
import { useAppDispatch, useAppSelector } from "../../src/store";
import { logout } from "../../src/store/authSlice";
import { resetProducts } from "../../src/store/productsSlice";
import { useEffect } from "react";

export default function TabsLayout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(s => s.auth.user);

  useEffect(() => {
    if (!user) router.replace("/"); // se não tiver user, volta pro login
  }, [user]);

  return (
    <Tabs
      screenOptions={{
        headerRight: () => (
          <Button
            title="Sair"
            onPress={() => {
              dispatch(logout());
              dispatch(resetProducts());
              router.replace("/");
            }}
          />
        ),
      }}
    >
      <Tabs.Screen name="masculino" options={{ title: "Masculino" }} />
      <Tabs.Screen name="feminino" options={{ title: "Feminino" }} />
    </Tabs>
  );
}
