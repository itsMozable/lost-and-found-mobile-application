import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../globals/globalData';
import DropdownComponent from '../../components/dropdown';
import Header from '../../header';

export const metadata = {
  title: 'lost something',
  description: 'I have lost something',
};

const styles = StyleSheet.create({
  container: {
    flex: 7,
    flexdirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logoContainer: {
    flex: 1,
    marginTop: 30,
    marginBottom: 10,
  },
  menuLinks: {
    color: colors.patternColorB,
    fontSize: 12,
    fontWeight: 'bold',
    marginHorizontal: 20,
  },
  navigationBar: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
  },
});

export default function MessageScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.logoContainer}>
        <Header font-size="1em" label="FoundLink" content="Messages" />
      </View>
      <DropdownComponent />
      <View style={styles.navigationBar}>
        <Pressable onPress={() => router.push('../home')}>
          <Text style={styles.menuLinks}>Back</Text>
        </Pressable>
        <Pressable onPress={() => router.push('./messages/messages')}>
          <Text style={styles.menuLinks}>Messages</Text>
        </Pressable>
        <Pressable onPress={() => router.push('./map/map')}>
          <Text style={styles.menuLinks}>Items</Text>
        </Pressable>
        <Pressable onPress={() => router.push('./userProfiles/userProfile')}>
          <Text style={styles.menuLinks}>Profil</Text>
        </Pressable>
      </View>
      <Text>Messages</Text>
    </View>
  );
}
