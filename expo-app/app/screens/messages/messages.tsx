import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../globals/globalData';
import Header from '../../components/header';

export const metadata = {
  title: 'Messages',
  description: 'Messaging system',
};

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
});

export default function MessageScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <Header
          font-size="1em"
          label="FoundLink"
          content="by Mozi since 1984"
          title={'Messages'}
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
          onPress={() =>
            Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
          }
        >
          <Text style={styles.bottomMenuButtonText}>Profile</Text>
        </Pressable>
      </View>
    </View>
  );
}
