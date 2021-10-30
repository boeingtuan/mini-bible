export type VerseType = {
  text: string;
  book: string;
  chapter: number;
  verseNumber: number;
};

export type ChapterType = {
  id: number;
  verses: VerseType[];
};

export type BookType = {
  id: string;
  chapters: {
    [chapter: number]: ChapterType;
  };
};
