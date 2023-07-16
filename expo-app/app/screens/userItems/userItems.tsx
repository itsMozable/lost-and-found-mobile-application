import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../globals/globalData';
import Header from '../../components/header';
import { apiBaseUrl } from '../../index';

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
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },

  roundedSquareButton: {
    width: 250,
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
  squareButtonTextBold: {
    textAlign: 'center',
    color: colors.patternFont,
    fontWeight: 'bold',
    /*   fontFamily: '', */
    fontSize: 20,
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
    flex: 1,
    alignItems: 'center',
  },
  FontUserName: {
    color: colors.patternFont,
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
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

type GetItemDataResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | {
      items: Items;
    };

export default function UserItemsScreen() {
  const router = useRouter();
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const [itemId, setItemId] = useState<string>('');

  const [userName, setUserName] = useState<string>('');

  const [itemList, setItemList] = useState<Items[]>([]);

  useEffect(() => {
    async function getItemData() {
      console.log('getItemData');

      const userName = await SecureStore.getItemAsync('userName');
      console.log(userName);

      setUserName(userName);

      const response = await fetch(`${apiBaseUrl}/api/getMyItems`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          getDetails: 'all',
          userName: userName,
        }),
      });

      const data: GetItemDataResponseBody = await response.json();
      console.log(data, 'dataCheck');
      console.log(data.item, 'dataCheckItems');
      setItemList(data.item);

      if ('errors' in data) {
        setErrors(data.errors);
        console.log(errors);
        return;
      }
      console.log(itemList);
    }
    getItemData().catch((error) => console.error(error));
  }, []);

  function informationAlert(
    itemCategory: string,
    itemName: string,
    itemDescription: string,
    itemState: string,
    itemPickup: string,
  ) {
    Alert.alert(
      `${itemCategory}: ${itemName}`,
      `Description: ${itemDescription}\nState: ${itemState}\nPickup: ${itemPickup}`,
      [
        {
          text: 'back to Items',
          onPress: () => router.push('../userItems/userItems'),
        },
      ],
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <Header
          font-size="1em"
          label="FoundLink"
          content="by Mozi since 1984"
          title="Here are your items,"
        />
      </View>
      <Text style={styles.FontUserName}>{userName}</Text>

      <View style={styles.iconContainer}>
        <Image
          source={require('../../../globals/icons/purr.gif')}
          style={styles.icon}
        />
      </View>

      <View style={styles.ButtonContainer}>
        <Text style={styles.squareButtonTextBold}>
          Here are your found Items
        </Text>
        <View style={styles.ButtonContainer}>
          {itemList.map((item) => {
            return (
              <Pressable
                key={`Hola${item.itemName}-${item.itemCategory}`}
                style={styles.roundedSquareButton}
                onPress={() => {
                  informationAlert(
                    item.itemCategory,
                    item.itemName,
                    item.itemDescription,
                    item.itemState,
                    item.itemPickup,
                  );
                }}
              >
                <Text style={styles.squareButtonText}>
                  {item.itemCategory}: {item.itemName}
                </Text>
              </Pressable>
            );
          })}
        </View>
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
