import { VerseType } from '~/type/BibleType';

export const sleep = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

export const generateVerseId = (verse: VerseType): string => {
  return `${verse.book}-${verse.chapter}-${verse.verseNumber}`;
};

export const formatDate = (date: number): string => {
  return new Date(date).toLocaleDateString('en-US');
};
