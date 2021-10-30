import { Dispatch } from 'redux';

import api, { ApiStatus } from '~/api';
import { GetState } from '~/redux/store';
import { ActionType, BibleAction } from '~/redux/bible/const';

export const loadChapter = (book: string, chapter: number) => {
  return async (dispatch: Dispatch<BibleAction>, getState: GetState) => {
    const { bibleReducer: state } = getState();

    const { books } = state;
    if (books[book]?.chapters?.[chapter]) {
      return;
    }

    dispatch({
      type: ActionType.LOAD_CHAPTER_PENDING,
    });

    const response = await api.getVerses({ book, chapter });
    if (response.result === ApiStatus.ERROR) {
      dispatch({
        type: ActionType.LOAD_CHAPTER_FAIL,
        payload: {
          error: response.error,
        },
      });
      return;
    }

    dispatch({
      type: ActionType.LOAD_CHAPTER_SUCCESS,
      payload: {
        book,
        chapter,
        verses: response.data.verses.map(verse => ({
          book,
          chapter,
          text: verse.text.replace(/\n/, ''),
          verseNumber: verse.verse,
        })),
      },
    });
  };
};
