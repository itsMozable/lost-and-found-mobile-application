import { useRouter, useSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../globals/globalData';
import { apiBaseUrl } from '../index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontFamily: '',
    fontSize: 30,
    color: colors.patternFont,
  },
});

export default function AuthWrap() {
  const router = useRouter();
  const { home } = useSearchParams();
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [messageText, setMessageText] = useState<string>('LOADING');

  useEffect(() => {
    if (home) {
      setMessageText('WELCOME');
    }
    async function revalidateOnRoute() {
      const tokenForValidation = await SecureStore.getItemAsync('sessionToken');
      if (tokenForValidation) {
        const response = await fetch(`${apiBaseUrl}/revalidate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: tokenForValidation,
          },
          body: null,
        });
        const data = await response.json();
        if ('errors' in data) {
          setErrors(data.errors);
          console.log(errors);
          router.replace('../');
        }
        await SecureStore.setItemAsync('sessionSecret', data.validation.cToken);

        const sessionSecret = await SecureStore.getItemAsync('sessionSecret');

        if (sessionSecret !== data.validation.cToken) {
          console.log('failed to store cToken');
          router.replace('../');
        } else {
          if (home) {
            router.replace(`../${home}`);
          }
        }
      } else {
        console.log('failed to load Token');
        router.replace('../');
      }
    }

    revalidateOnRoute();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>{messageText}</Text>
    </View>
  );
}
