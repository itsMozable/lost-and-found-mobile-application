import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  Alert,
  BackHandler,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../../globals/globalData';
import Header from '../components/header';

/* eslint-disable react/style-prop-object */

// Styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexdirection: 'column',
    alignItems: 'center',
    backgroundColor: colors.patternBackground,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: colors.patternBackground,
  },

  ButtonContainer: {
    flex: 10,
    justifyContent: 'center',
  },
  roundedSquareButton: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.patternButtons,
    margin: 20,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.patternBorderColor,
    borderWidth: 1,
  },
  squareButtonText: {
    textAlign: 'center',
    color: colors.patternFont,
    /*   fontFamily: '', */
    fontSize: 20,
  },
  bottomMenuButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
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
  icon: {
    width: 150,
    height: 150,
  },
  iconContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Leaving FoundLink',
        'Are you sure you want to "get lost" ?',
        [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          { text: 'YES', onPress: () => BackHandler.exitApp() },
        ],
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    async function POST(request: any) {
      const token = await request.headers.get('sessionToken');
      console.log('oida');
      console.log({ token });
    }
    console.log('hello');
    return () => backHandler.remove();
  }, []);

  // App Page

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <Header
          label="FoundLink"
          content="by Mozi since 1984"
          title="You are Home Mozi"
        />
      </View>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../globals/icons/headphone_cat.png')}
          style={styles.icon}
        />
      </View>
      <View style={styles.ButtonContainer}>
        <Pressable
          onPress={() => router.push('./lostSomething/lostSomething')}
          style={styles.roundedSquareButton}
        >
          <Text style={styles.squareButtonText}>I lost something</Text>
        </Pressable>
        <Pressable
          onPress={() => router.push('./foundSomething/foundSomething')}
          style={styles.roundedSquareButton}
        >
          <Text style={styles.squareButtonText}>I found something</Text>
        </Pressable>
      </View>

      <View style={styles.bottomMenuButtonContainer}>
        <Pressable
          style={styles.menuLinks}
          onPress={() => router.replace('../(auth)/logout')}
        >
          <Text style={styles.bottomMenuButtonText}>Logout</Text>
        </Pressable>

        <Pressable
          style={styles.menuLinks}
          onPress={() => router.replace('../screens/messages/messages')}
        >
          <Text style={styles.bottomMenuButtonText}>Messages</Text>
        </Pressable>
        <Pressable
          style={styles.menuLinks}
          onPress={() => router.replace('../screens/userItems/userItems')}
        >
          <Text style={styles.bottomMenuButtonText}>Items</Text>
        </Pressable>
        <Pressable
          style={styles.menuLinks}
          onPress={() => router.replace('../screens/userProfiles/userProfile')}
        >
          <Text style={styles.bottomMenuButtonText}>Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}
