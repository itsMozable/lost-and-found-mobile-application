import Constants from 'expo-constants';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../../globals/globalData';

type Props = {
  label: string;
  content: string;
  title: string;
};

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
  },
  container: {
    flexDirection: 'column',
    paddingTop: Constants.statusBarHeight + 5,
  },
  headerLabel: {
    color: colors.patternFontLogo,
    fontSize: 40,
    textAlign: 'center',
  },
  headerContent: {
    color: colors.patternFontLogo,
    fontSize: 12,
    textAlign: 'center',
  },
  siteTitle: {
    color: colors.patternFontLogo,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default function Header(props: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.headerLabel}>{props.label}</Text>
        <Text style={styles.headerContent}>{props.content}</Text>
        <Text style={styles.siteTitle}>{props.title}</Text>
      </View>
    </SafeAreaView>
  );
}
