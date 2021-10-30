import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import Accordion from 'react-native-collapsible/Accordion';
import { useDispatch, useSelector } from 'react-redux';

import { setReaderBook } from '~/redux/reader/action';
import { selectReaderData } from '~/redux/reader/selector';
import { BIBLE_BOOKS, BibleBookType } from '~/const';
import { Colors } from '~/styles';

import styles from './styles';

import ArrowRightIcon from '~/assets/arrow_right_icon.png';
import ArrowRightSelectIcon from '~/assets/arrow_right_select_icon.png';

const HeaderSection: React.FC<{
  section: BibleBookType;
  isActive: boolean;
}> = ({ section, isActive }) => {
  const { currentBook } = useSelector(selectReaderData);
  const selected = currentBook === section.id;
  return (
    <View style={styles.headerWrapper}>
      <Image
        source={selected ? ArrowRightSelectIcon : ArrowRightIcon}
        style={[
          styles.headerIcon,
          isActive ? { transform: [{ rotateZ: '90deg' }] } : {},
        ]}
      />
      <Text
        style={[
          styles.headerBookName,
          selected ? { color: Colors.primary } : {},
        ]}>
        {section.name}
      </Text>
    </View>
  );
};

const Content: React.FC<{
  section: BibleBookType;
  onChapterSelect: (book: string, chapter: number) => void;
  isChapterSelected: (book: string, chapter: number) => boolean;
}> = ({ section, onChapterSelect, isChapterSelected }) => {
  return (
    <View style={styles.contentWrapper}>
      {[...Array(section.totalChapter).keys()].map(chapterNumber => {
        return (
          <TouchableOpacity
            key={chapterNumber}
            onPress={() => onChapterSelect(section.id, chapterNumber + 1)}
            style={styles.chapterWrapper}>
            <Text
              style={[
                styles.chapterText,
                isChapterSelected(section.id, chapterNumber + 1)
                  ? styles.chapterSelectedText
                  : {},
              ]}>
              {chapterNumber + 1}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const BookSelectionDrawer: React.FC<DrawerContentComponentProps> = props => {
  const dispatch = useDispatch();
  const { currentBook, currentChapter } = useSelector(selectReaderData);
  const [sections, setSections] = React.useState(BIBLE_BOOKS);
  const [activeSections, setActiveSections] = React.useState<number[]>(() => {
    return [];
  });

  const renderHeader = React.useCallback(
    (section: BibleBookType, _, isActive: boolean) => {
      return <HeaderSection section={section} isActive={isActive} />;
    },
    [],
  );

  const renderContent = React.useCallback(
    (section: BibleBookType) => {
      return (
        <Content
          section={section}
          onChapterSelect={(book, chapter) => {
            dispatch(setReaderBook(book, chapter));
            props.navigation.toggleDrawer();
          }}
          isChapterSelected={(book, chapter) =>
            book === currentBook && chapter === currentChapter
          }
        />
      );
    },
    [currentBook, currentChapter, dispatch, props.navigation],
  );

  const handleChange = React.useCallback((indexes: number[]) => {
    if (indexes.length > 0) {
      setActiveSections(indexes);
    }
  }, []);

  const onChangeSearchValueHandler = React.useCallback(
    (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
      const searchValue = e.nativeEvent.text.toLowerCase();
      if (searchValue) {
        setSections(
          BIBLE_BOOKS.filter(({ name }) =>
            name.toLowerCase().includes(searchValue),
          ),
        );
      } else {
        setSections(BIBLE_BOOKS);
      }
    },
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBoxWrapper}
        placeholder="Search books..."
        onChange={onChangeSearchValueHandler}
        clearButtonMode="while-editing"
      />

      <ScrollView>
        <Accordion<BibleBookType>
          activeSections={activeSections}
          sections={sections}
          touchableComponent={TouchableOpacity}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={handleChange}
          // @ts-ignore
          renderChildrenCollapsed={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookSelectionDrawer;
