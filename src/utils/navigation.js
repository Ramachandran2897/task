import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListingScreen from "../screens/listingScreeen";
import ViewScreen from "../screens/viewScreen";

const Stack = createNativeStackNavigator();
const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="ListScreen"
      screenOptions={{
        contentStyle: { backgroundColor: "#fff" },
      }}
    >
      <Stack.Screen
        name="ListScreen"
        component={ListingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="ViewScreen" component={ViewScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Navigation;
