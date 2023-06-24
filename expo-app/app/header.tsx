import Constants from 'expo-constants';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../globals/globalData';

type Props = {
  label: string;
  content: string;
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white',
    width: '100%',
  },
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 20,
  },
  headerLabel: {
    color: colors.patternColorA,
    fontSize: 40,
    textAlign: 'left',
    paddingHorizontal: 20,
    /*     fontFamily: '', */
  },
  headerContent: {
    color: colors.patternColorA,
    fontSize: 15,
    textAlign: 'right',
    paddingHorizontal: 20,
    paddingTop: 25,
    /*     fontFamily: '', */
  },
});

export default function Header(props: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerLabel}>{props.label}</Text>
        <Text style={styles.headerContent}>{props.content}</Text>
      </View>
    </SafeAreaView>
  );
}
