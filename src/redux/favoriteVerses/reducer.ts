import { generateVerseId } from '~/utils';
import { FavoriteVerseType } from '~/type/FavoriteVerseType';

import { ActionType, FavoriteVersesAction } from './const';

type FavoriteVersesState = {
  favoriteVerses: FavoriteVerseType[];
};

const initialState: FavoriteVersesState = {
  favoriteVerses: [],
};

export const favoriteVersesReducer = (
  state: FavoriteVersesState = initialState,
  action: FavoriteVersesAction,
): FavoriteVersesState => {
  switch (action.type) {
    case ActionType.SET_FAVORITE_VERSE: {
      const { verse, date } = action.payload;
      return {
        ...state,
        favoriteVerses: [...state.favoriteVerses, { verse, date }],
      };
    }
    case ActionType.CLEAR_FAVORITE_VERSE: {
      const { id } = action.payload;
      return {
        ...state,
        favoriteVerses: id
          ? state.favoriteVerses.filter(
              ({ verse }) => generateVerseId(verse) !== id,
            )
          : [],
      };
    }
    default: {
      return state;
    }
  }
};
