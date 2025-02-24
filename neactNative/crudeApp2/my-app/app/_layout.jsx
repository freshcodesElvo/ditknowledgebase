import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
//import {SafeAreaProvider} from "react-native-safe-area-context" 

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name= "index" options={{headerShown: false}} />
      </Stack>
    </SafeAreaProvider>
  )
  // return <Stack />;
}
