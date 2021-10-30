import { VerseType } from '~/type/BibleType';

export enum ActionType {
  LOAD_CHAPTER_PENDING = 'LOAD_CHAPTER_PENDING',
  LOAD_CHAPTER_SUCCESS = 'LOAD_CHAPTER_SUCCESS',
  LOAD_CHAPTER_FAIL = 'LOAD_CHAPTER_FAIL',
}

type ActionLoadChapterPending = {
  type: ActionType.LOAD_CHAPTER_PENDING;
};

type ActionLoadChapterSuccess = {
  type: ActionType.LOAD_CHAPTER_SUCCESS;
  payload: {
    book: string;
    chapter: number;
    verses: VerseType[];
  };
};

type ActionLoadChapterFail = {
  type: ActionType.LOAD_CHAPTER_FAIL;
  payload: {
    error: string;
  };
};

export type BibleAction =
  | ActionLoadChapterPending
  | ActionLoadChapterSuccess
  | ActionLoadChapterFail;
