import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../globals/globalData';

const styles = StyleSheet.create({
  right: {
    textAlign: 'right',
    fontSize: 10,
  },
  center: {
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.patternBackground,
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: 30,
    marginBottom: 30,
    borderColor: colors.patternButtons,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    textAlign: 'left',
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

type Props = {
  foundItem: Items;
};

export default function PostItem({ foundItem }: Props) {
  const {
    itemCategory,
    itemName,
    itemColor,
    itemDescription,
    itemState,
    itemPickup,
  } = foundItem;

  return (
    <View style={styles.card}>
      <Text style={styles.center}>
        {itemCategory} {itemName} {itemColor} {itemDescription} {itemState}
        {itemPickup}
      </Text>
    </View>
  );
}
