import { VerseType } from '~/type/BibleType';

import { ActionType, FavoriteVersesAction } from './const';

export const setFavoriteVerse = (verse: VerseType): FavoriteVersesAction => {
  return {
    type: ActionType.SET_FAVORITE_VERSE,
    payload: {
      verse,
      date: Date.now(),
    },
  };
};

export const clearFavoriteVerse = (id?: string): FavoriteVersesAction => {
  return {
    type: ActionType.CLEAR_FAVORITE_VERSE,
    payload: {
      id,
    },
  };
};
