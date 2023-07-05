import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useCallback, useState } from 'react';
import { Controller, set, useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
    zIndex: 1000,
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
});

type SaveItemResponse =
  | {
      errors: {
        message: string;
      }[];
    }
  | {
      isAdded: boolean;
    };

const PickerForm = () => {
  const router = useRouter();
  const [errors, setErrors] = useState<{ message: string }[]>([]);

  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [itemName, setItemName] = useState('');
  const [color, setColor] = useState('');

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
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
  const [loading, setLoading] = useState(false);

  const [stateOpen, setStateOpen] = useState(false);
  const [stateValue, setStateValue] = useState(null);
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

  const { handleSubmit, control } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };

  async function AddItem() {
    const sessionToken = await SecureStore.getItemAsync('sessionToken');
    const sessionSecret = await SecureStore.getItemAsync('sessionSecret');
    const keyObject = JSON.stringify({
      keyA: sessionToken,
      keyB: sessionSecret,
    });
    console.log(keyObject);
    const response = await fetch(`${apiBaseUrl}/addItem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: keyObject,
      },
      body: JSON.stringify({
        itemCategory: categoryValue,
        itemColor: color,
        itemState: stateValue,
      }),
    });
    const data: SaveItemResponse = await response.json();

    if ('errors' in data) {
      setErrors(data.errors);
      return;
    }
    if (!data.isAdded) {
      console.log('Failed to add Template');
    } else {
      Alert.alert('Success', `Item has been added to your templates list`, [
        { text: 'OK', onPress: () => null },
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          label="FoundLink"
          content="by Mozi since 1984"
          title={`Have you lost something Mozi ?`}
        />
      </View>
      <Image
        source={require('../../../globals/icons/raccoon_bush.png')}
        style={styles.icon}
      />
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.label}>Category</Text>
          <Controller
            name="category"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
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
                  onChangeValue={onChange}
                  zIndex={300}
                  zIndexInverse={100}
                />
              </View>
            )}
          />

          <Text style={styles.label}>Characteristics</Text>
          <Controller
            name="color"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                selectionColor={colors.patternButtons}
                onChangeText={setColor}
                value={color}
              />
            )}
          />

          <Text style={styles.label}>State</Text>
          <Controller
            name="state"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value } }) => (
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
                  loading={loading}
                  activityIndicatorColor={colors.patternButtons}
                  searchable={true}
                  searchPlaceholder="Search state here..."
                  onChangeValue={onChange}
                  zIndex={100}
                  zIndexInverse={300}
                />
              </View>
            )}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={handleSubmit(onSubmit)}
            z-index={1}
            style={styles.roundedSquareButton}
          >
            <Text style={styles.squareButtonText}>List Items</Text>
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
          onPress={() =>
            Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
          }
        >
          <Text style={styles.bottomMenuButtonText}>Profile</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PickerForm;
