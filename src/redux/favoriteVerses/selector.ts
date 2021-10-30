import { RootState } from '~/redux/store';

export const selectFavoriteVerseList = (state: RootState) => {
  const {
    favoriteVersesReducer: { favoriteVerses },
  } = state;
  return favoriteVerses;
};
