import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { clearFavoriteVerse } from '~/redux/favoriteVerses/action';

import TrashIcon from '~/assets/can_trash_icon.png';

const ClearAllButton: React.FC = () => {
  const dispatch = useDispatch();
  const onPress = React.useCallback(() => {
    Alert.alert('Warning', 'Are you sure to delete all your favorite verses?', [
      {
        text: 'Yes',
        onPress: () => dispatch(clearFavoriteVerse()),
      },
      {
        text: 'No',
      },
    ]);
  }, [dispatch]);
  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
      <Image source={TrashIcon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    marginRight: 10,
  },
});

export default ClearAllButton;
