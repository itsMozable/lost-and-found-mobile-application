import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';
import { Slot, SplashScreen } from 'expo-router';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return <SplashScreen />;
  }

  return <Slot />;
}
