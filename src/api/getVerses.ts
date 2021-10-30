import { Request } from './Request';

type GetVerseResponse = {
  reference: string;
  verses: {
    book_id: string;
    book_name: string;
    chapter: number;
    verse: number;
    text: string;
  }[];
  text: string;
  translation_id: string;
  translation_name: string;
  translation_note: string;
};

const getVerses = (params: { book: string; chapter: number }) => {
  const { book, chapter } = params;
  return Request.get<GetVerseResponse>(`${book}:${chapter}`);
};

export default getVerses;
