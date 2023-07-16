import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../globals/globalData';
import Header from '../../components/header';

export const metadata = {
  title: 'Messages',
  description: 'Messaging system',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.patternBackground,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: colors.patternBackground,
  },

  ButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  roundedSquareButton: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.patternButtons,
    marginVertical: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.patternBorderColor,
    borderWidth: 1,
    zIndex: 1,
  },
  squareButtonText: {
    textAlign: 'center',
    color: colors.patternFont,
    /*   fontFamily: '', */
    fontSize: 15,
    zIndex: 1,
  },
  bottomMenuButtonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    height: 50,
    backgroundColor: colors.patternBackground,
    gap: 10,
  },

  bottomMenuButtonText: {
    textAlign: 'center',
    color: colors.patternFont,
    /*  fontFamily: '', */
    fontSize: 15,
  },
  menuLinks: {
    color: colors.patternFont,
    fontSize: 15,
    marginHorizontal: 15,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 200,
    height: 200,
  },
  FontUserName: {
    color: colors.patternFont,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default function MessageScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    async function getUserName() {
      const userName = await SecureStore.getItemAsync('userName');
      setUserName(userName);
    }
    getUserName();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <Header
          font-size="1em"
          label="FoundLink"
          content="by Mozi since 1984"
          title="Here are your messages,"
        />
      </View>
      <Text style={styles.FontUserName}>{userName}</Text>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../../globals/icons/under_construction.png')}
          style={styles.icon}
        />
      </View>
      <View style={styles.ButtonContainer}>
        <Pressable
          style={styles.roundedSquareButton}
          onPress={() => router.replace('../messages/messages')}
        >
          <Text style={styles.squareButtonText}>Messages</Text>
        </Pressable>
      </View>
      <View style={styles.bottomMenuButtonContainer}>
        <Pressable
          style={styles.menuLinks}
          onPress={() => router.replace('../home')}
        >
          <Text style={styles.bottomMenuButtonText}>Home</Text>
        </Pressable>

        <Pressable
          style={styles.menuLinks}
          onPress={() => router.replace('../messages/messages')}
        >
          <Text style={styles.bottomMenuButtonText}>Messages</Text>
        </Pressable>
        <Pressable
          style={styles.menuLinks}
          onPress={() => router.replace('../userItems/userItems')}
        >
          <Text style={styles.bottomMenuButtonText}>Items</Text>
        </Pressable>
        <Pressable
          style={styles.menuLinks}
          onPress={() => router.replace('../userProfiles/userProfile')}
        >
          <Text style={styles.bottomMenuButtonText}>Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}
