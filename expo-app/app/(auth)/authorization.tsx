/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter, useSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../globals/globalData';
import { apiBaseUrl } from '../../index';

export default function AuthWrap() {
  const router = useRouter();
  const { home } = useSearchParams();
  const { offer } = useSearchParams();
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const [messageText, setMessageText] = useState<string>('LOADING');
  // const [redirect, setRedirect] = useState<string>('');

  useEffect(() => {
    if (home) {
      setMessageText('WELCOME');
    } else if (offer) {
      setMessageText('LOADING OFFER');
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
          } else if (offer) {
            router.replace(
              `../screens/processOffer/mainOffer?offerDefinedId=${offer}`,
            );
          }
        }
      } else {
        console.log('failed to load Token');
        router.replace('../');
      }
    }

    revalidateOnRoute();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      fontFamily: 'NotoSans_600SemiBold',
      fontSize: 30,
      color: colors.patternColorA,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>{messageText}</Text>
    </View>
  );
}
