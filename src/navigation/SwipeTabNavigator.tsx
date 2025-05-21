/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  TabView,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/fonts';
import {FONT_SIZE, SCREEN_WIDTH, SCREEN_HEIGHT} from '../constants/responsive';
import HomeIcon from '../assets/svg/home.svg';
import WalletIcon from '../assets/svg/wallet.svg';
import SupportIcon from '../assets/svg/user-headset.svg';
import ProfileIcon from '../assets/svg/profile-circle.svg';
import HomeScreen from '../screens/Home/HomeScreen';
import CreditScreen from '../screens/Credit/CreditScreen';

function DummyScreen({label}: {label: string}) {
  return (
    <View style={styles.dummyContainer}>
      <Text style={styles.dummyText}>{label}</Text>
    </View>
  );
}

const HomeRoute = () => <HomeScreen />;
const CreateRoute = () => <CreditScreen />;
const SupportRoute = () => <DummyScreen label="Support" />;
const ProfileRoute = () => <DummyScreen label="Profile" />;

const routes = [
  {key: 'home', title: 'Home'},
  {key: 'credit', title: 'Credit'},
  {key: 'support', title: 'Support'},
  {key: 'profile', title: 'Profile'},
];

const SVG_ICONS: Record<string, React.FC<{focused: boolean}>> = {
  home: ({focused}) => (
    <HomeIcon width={24} height={24} opacity={focused ? 1 : 0.5} />
  ),
  credit: ({focused}) => (
    <WalletIcon width={24} height={24} opacity={focused ? 1 : 0.5} />
  ),
  support: ({focused}) => (
    <SupportIcon width={24} height={24} opacity={focused ? 1 : 0.5} />
  ),
  profile: ({focused}) => (
    <ProfileIcon width={24} height={24} opacity={focused ? 1 : 0.5} />
  ),
};

const renderScene = SceneMap({
  home: HomeRoute,
  credit: CreateRoute,
  support: SupportRoute,
  profile: ProfileRoute,
});

type RouteType = {key: string; title: string};
type TabBarProps = SceneRendererProps & {
  navigationState: NavigationState<RouteType>;
  jumpTo: (key: string) => void;
};

function CustomTabBar({navigationState, jumpTo}: TabBarProps) {
  console.log(navigationState);
  return (
    <View style={styles.tabBar}>
      {/* Tab bar content */}
      <View style={styles.tabBarContent}>
        {navigationState.routes.map((route, idx) => {
          const focused = navigationState.index === idx;
          const IconComponent = SVG_ICONS[route.key];
          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={() => jumpTo(route.key)}
              activeOpacity={0.8}>
              <IconComponent focused={focused} />
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: focused ? COLORS.DARK : COLORS.DARK,
                    opacity: focused ? 1 : 0.5,
                  },
                ]}>
                {route.title}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function SwipeTabNavigator() {
  const [index, setIndex] = useState(0);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: Dimensions.get('window').width}}
      renderTabBar={props => <CustomTabBar {...props} />}
      swipeEnabled
    />
  );
}

const styles = StyleSheet.create({
  dummyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.DARK,
    paddingBottom: SCREEN_HEIGHT * 0.08,
  },
  dummyText: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.BOLD,
    fontSize: FONT_SIZE.xxl,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    height: SCREEN_HEIGHT * 0.1,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    elevation: 12,
    zIndex: 10,
    shadowColor: COLORS.DARK,
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.08,
    shadowRadius: 12,
    borderTopWidth: 0,
    overflow: 'hidden',
  },
  tabBarContent: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SCREEN_WIDTH * 0.05,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontFamily: FONT_FAMILY.SEMI_BOLD,
    fontSize: FONT_SIZE.sm,
  },
});
