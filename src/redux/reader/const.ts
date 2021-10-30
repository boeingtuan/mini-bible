export enum ActionType {
  SET_READER_BOOK = 'SET_READER_BOOK',
  SET_READER_OFFSET = 'SET_READER_OFFSET',
}

type ActionSetReaderBook = {
  type: ActionType.SET_READER_BOOK;
  payload: {
    book: string;
    chapter: number;
  };
};

type ActionSetReaderOffset = {
  type: ActionType.SET_READER_OFFSET;
  payload: {
    offset?: number;
  };
};

export type ReaderAction = ActionSetReaderBook | ActionSetReaderOffset;
