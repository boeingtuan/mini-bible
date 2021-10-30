import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Animated,
  LayoutAnimation,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { BorderlessButton } from 'react-native-gesture-handler';

import { formatDate, generateVerseId } from '~/utils';
import { VerseType } from '~/type/BibleType';

import styles from './styles';
import TrashIcon from '~/assets/can_trash_icon.png';
import { clearFavoriteVerse } from '~/redux/favoriteVerses/action';

type Props = {
  verse: VerseType;
  date: number;
  onPress: () => void;
};

const FavoriteVerseItem: React.FC<Props> = ({ verse, date, onPress }) => {
  const dispatch = useDispatch();
  const renderRightActions = React.useCallback(
    (
      progress: Animated.AnimatedInterpolation,
      dragX: Animated.AnimatedInterpolation,
    ) => {
      const trans = dragX.interpolate({
        inputRange: [0, 50, 100, 101],
        outputRange: [25, 50, 50, 51],
      });
      return (
        <BorderlessButton
          style={styles.deleteBtn}
          onPress={() => {
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut,
            );
            dispatch(clearFavoriteVerse(generateVerseId(verse)));
          }}>
          <Animated.Image
            source={TrashIcon}
            style={[
              styles.deleteIcon,
              {
                transform: [{ translateX: trans }],
              },
            ]}
          />
        </BorderlessButton>
      );
    },
    [dispatch],
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.wrapper}
        onPress={onPress}>
        <View style={styles.header}>
          <Text
            style={
              styles.titleText
            }>{`${verse.book} ${verse.chapter}:${verse.verseNumber}`}</Text>
          <Text style={styles.dateText}>{formatDate(date)}</Text>
        </View>
        <Text style={styles.verseText}>{verse.text}</Text>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default FavoriteVerseItem;
