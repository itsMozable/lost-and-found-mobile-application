import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { colors } from '../../../globals/globalData';
import Header from '../../components/header';

export const metadata = {
  title: 'My Items',
  description: 'User Items',
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

type Items = {
  itemCategory: string;
  itemName: string;
  itemColor: string;
  itemDescription: string;
  itemState: string;
  itemPickup: string;
};

/* const renderItem = (item: { item: Items }) => (
  <PostItem foundItem={item.item} />
); */

export default async function UserItemsScreen() {
  /*   const items = await fetch('http://localhost:3000/api/getItem').then((res) =>
    res.json(),
  );
   const items = await getItems(); */
  console.log('hi');
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <Header
          font-size="1em"
          label="FoundLink"
          content="by Mozi since 1984"
          title={`Here are your Items Mozi`}
        />
      </View>
      <View style={styles.iconContainer}>
        <Image
          source={require('../../../globals/icons/purr.gif')}
          style={styles.icon}
        />
      </View>
      <View style={styles.ButtonContainer}>
        <Text style={styles.squareButtonText}>Items</Text>
      </View>
      <View style={styles.ButtonContainer}>
        <Text style={styles.squareButtonText}>Here is my ItemList</Text>
      </View>

      {/*   <View>
        style={styles.ButtonContainer}
        {data={items} }
        {  renderItem={renderItem}
        keyExtractor={(item: Items) => item.itemName} }
      </View> */}

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
