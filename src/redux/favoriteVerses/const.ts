import { VerseType } from '~/type/BibleType';

export enum ActionType {
  SET_FAVORITE_VERSE = 'SET_FAVORITE_VERSE',
  CLEAR_FAVORITE_VERSE = 'CLEAR_FAVORITE_VERSE',
}

type ActionSetFavoriteVerse = {
  type: ActionType.SET_FAVORITE_VERSE;
  payload: {
    verse: VerseType;
    date: number;
  };
};

type ActionClearFavoriteVerse = {
  type: ActionType.CLEAR_FAVORITE_VERSE;
  payload: {
    id?: string;
  };
};

export type FavoriteVersesAction =
  | ActionSetFavoriteVerse
  | ActionClearFavoriteVerse;
