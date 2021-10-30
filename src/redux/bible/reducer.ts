import { ActionType, BibleAction } from '~/redux/bible/const';
import { BookType } from '~/type/BibleType';

type BibleState = {
  books: {
    [bookId: string]: BookType;
  };
  isLoading: boolean;
  error?: string;
};

const initialState: BibleState = {
  books: {},
  isLoading: false,
  error: undefined,
};

export const bibleReducer = (
  state: BibleState = initialState,
  action: BibleAction,
): BibleState => {
  switch (action.type) {
    case ActionType.LOAD_CHAPTER_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    }
    case ActionType.LOAD_CHAPTER_FAIL: {
      const { error } = action.payload;
      return {
        ...state,
        isLoading: false,
        error,
      };
    }
    case ActionType.LOAD_CHAPTER_SUCCESS: {
      const { book, chapter, verses } = action.payload;
      return {
        ...state,
        isLoading: false,
        error: undefined,
        books: {
          ...state.books,
          [book]: {
            id: book,
            chapters: {
              ...(state.books[book]?.chapters ?? {}),
              [chapter]: {
                id: chapter,
                verses,
              },
            },
          },
        },
      };
    }
    default: {
      return state;
    }
  }
};
