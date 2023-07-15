import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { colors } from '../../../globals/globalData';
import Header from '../../components/header';
import { apiBaseUrl } from '../../index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.patternBackground,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: colors.patternBackground,
  },
  inputContainer: {
    flex: 10,
    marginTop: 10,
  },
  input: {
    color: colors.patternFont,
    borderStyle: 'solid',
    borderColor: '#B7B7B7',
    borderRadius: 7,
    borderWidth: 1,
    fontSize: 15,
    height: 50,
    marginHorizontal: 10,
    paddingStart: 10,
    marginBottom: 15,
  },
  label: {
    color: colors.patternFont,
    marginTop: 5,
    marginBottom: 7,
    marginStart: 10,
  },
  placeholderStyles: {
    color: 'grey',
  },
  dropdownStyle: {
    marginHorizontal: 10,
    zIndex: 3000,
    zIndexInverse: 1000,
  },
  dropdown: {
    borderColor: '#B7B7B7',
    height: 50,
    backgroundColor: colors.patternDropdown,
  },
  buttonContainer: {
    flex: 10,
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
    margin: 20,
    padding: 10,
    borderRadius: 10,
    borderColor: colors.patternBorderColor,
    borderWidth: 1,
    zIndex: 1,
  },
  squareButtonText: {
    textAlign: 'center',
    color: colors.patternFont,
    fontSize: 15,
    zIndex: 1,
  },
  logIn: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  links: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: '#758580',
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

type SaveItemResponseBody =
  | {
      errors: {
        message: string;
      }[];
    }
  | {
      item: {
        itemCategory: string;
        itemName: string;
        itemColor: string;
        itemDescription: string;
        itemState: string;
        itemPickup: string;
      };
    };

export default function PickerForm() {
  const router = useRouter();
  const [category, setCategory] = useState([
    { label: 'Animal', value: 'animal' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Accessories', value: 'accessories' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Documents', value: 'documents' },
    { label: 'Keys, purses, bags', value: 'keys' },
    { label: 'Jewelry, watches & valuables', value: 'valuables' },
    { label: 'Other', value: 'other' },
  ]);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);

  const [itemName, setItemName] = useState('');

  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');

  const [state, setState] = useState([
    { label: 'Vienna', value: 'vienna' },
    { label: 'Burgenland', value: 'burgenland' },
    { label: 'Carinthia', value: 'carinthia' },
    { label: 'Lower Austria', value: 'lowerAustria' },
    { label: 'Styria', value: 'styria' },
    { label: 'Salzburg', value: 'salzburg' },
    { label: 'Tyrol', value: 'tyrol' },
    { label: 'Upper Austria', value: 'upperAustria' },
    { label: 'Vorarlberg', value: 'vorarlberg' },
  ]);
  const [stateOpen, setStateOpen] = useState(false);
  const [stateValue, setStateValue] = useState(null);

  const [location, setLocation] = useState('');

  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const successfulUploadAlert = () =>
    Alert.alert('It is done!', 'You have successfully added an Item!', [
      { text: 'back to Items', onPress: () => router.push('../') },
    ]);

  async function addNewItem() {
    console.log({
      categoryValue,
      itemName,
      color,
      description,
      stateValue,
      location,
    });
    const response = await fetch(`${apiBaseUrl}/api/addItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemCategory: categoryValue,
        itemName,
        itemColor: color,
        itemDescription: description,
        itemState: stateValue,
        itemPickup: location,
      }),
    });
    console.log(JSON.stringify(response));

    const data: SaveItemResponseBody = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    if ('item' in data) {
      successfulUploadAlert();
      console.log(data);
      console.log('Item is stored in Datapackage');
    }
    console.log('Here is the data', data);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          label="FoundLink"
          content="by Mozi since 1984"
          title="Have you found something Mozi ?"
        />
      </View>
      {/* <View style={styles.iconContainer}>
        <Image
          source={require('../../../globals/icons/purr.gif')}
          style={styles.icon}
        />
      </View> */}

      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.label}>Category</Text>
          <View style={styles.dropdownStyle}>
            <DropDownPicker
              style={styles.dropdown}
              open={categoryOpen}
              value={categoryValue}
              items={category}
              setOpen={setCategoryOpen}
              setValue={setCategoryValue}
              setItems={setCategory}
              placeholder="Select Category"
              placeholderStyle={styles.placeholderStyles}
              activityIndicatorColor={colors.patternButtons}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          <Text style={styles.label}>Item Name</Text>
          <TextInput
            style={styles.input}
            selectionColor={colors.patternButtons}
            onChangeText={setItemName}
            value={itemName}
            z-index={1}
          />

          <Text style={styles.label}>Color</Text>
          <TextInput
            style={styles.input}
            selectionColor={colors.patternButtons}
            onChangeText={setColor}
            value={color}
            z-index={1}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            selectionColor={colors.patternButtons}
            onChangeText={setDescription}
            value={description}
            z-index={1}
          />

          <Text style={styles.label}>State</Text>
          <View style={styles.dropdownStyle}>
            <DropDownPicker
              style={styles.dropdown}
              open={stateOpen}
              value={stateValue}
              items={state}
              setOpen={setStateOpen}
              setValue={setStateValue}
              setItems={setState}
              placeholder="Select State"
              placeholderStyle={styles.placeholderStyles}
              activityIndicatorColor={colors.patternButtons}
              searchPlaceholder="Search state here..."
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>
          <Text style={styles.label}>Pickup Location</Text>
          <TextInput
            style={styles.input}
            onChangeText={setLocation}
            value={location}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => addNewItem()}
            z-index={1}
            style={styles.roundedSquareButton}
          >
            <Text style={styles.squareButtonText}>Add Item</Text>
          </Pressable>
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
