import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import ReaderPage from '~/pages/ReaderPage';
import FavoriteVersePage, {
  FavoritePageParam,
} from '~/pages/FavoriteVersePage';

import { PAGE_NAMES } from '~/const';

import ReaderTabIcon from '~/assets/TabBarIcon/reader-tab-icon.png';
import ReaderTabFocusIcon from '~/assets/TabBarIcon/reader-tab-focus-icon.png';
import FavoriteTabIcon from '~/assets/TabBarIcon/favorite-tab-icon.png';
import FavoriteTabFocusIcon from '~/assets/TabBarIcon/favorite-tab-focus-icon.png';

export type RootTabParamList = {
  [PAGE_NAMES.READER_PAGE]: undefined;
  [PAGE_NAMES.FAVORITE_VERSE_PAGE]: FavoritePageParam;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const RootNavigation = () => (
  <NavigationContainer>
    <Tab.Navigator initialRouteName={PAGE_NAMES.READER_PAGE}>
      <Tab.Screen
        name={PAGE_NAMES.READER_PAGE}
        component={ReaderPage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: tabBarIconHof(ReaderTabIcon, ReaderTabFocusIcon),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name={PAGE_NAMES.FAVORITE_VERSE_PAGE}
        component={FavoriteVersePage}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: tabBarIconHof(FavoriteTabIcon, FavoriteTabFocusIcon),
          title: 'Favorite verses',
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

const tabBarIconHof =
  (normalIcon: ImageSourcePropType, focusIcon: ImageSourcePropType) =>
  ({
    focused,
    size,
  }: {
    focused: boolean;
    color: string;
    size: number;
  }): React.ReactNode =>
    (
      <Image
        source={focused ? focusIcon : normalIcon}
        style={{
          width: size,
          height: size,
        }}
      />
    );

export default RootNavigation;
