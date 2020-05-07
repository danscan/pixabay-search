import startCase from 'lodash/startCase';
import React, { ReactElement, useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { t } from 'react-native-tailwindcss';
import useQueryOptions from '../hooks/useQueryOptions';
import CATEGORIES from '../pixabay/categories';

type OptionItem = {
  active: boolean;
  key: string;
  onPress: () => void;
  text: string;
};

export default function QueryOptionsCarousel(): ReactElement {
  const [queryOptions, { setCategory, setSFW }] = useQueryOptions();
  const { category: currentCategory, sfw: currentSFW } = queryOptions;

  const items: OptionItem[] = useMemo<OptionItem[]>(
    () => [
      {
        active: !!currentSFW,
        key: 'sfw',
        onPress: (): void => setSFW(!currentSFW),
        text: currentSFW ? 'SFW' : 'NSFW',
      },
      ...CATEGORIES.map((category) => ({
        active: category === currentCategory,
        key: category,
        onPress: (): void => setCategory(category),
        text: startCase(category),
      })),
    ],
    [currentSFW, currentCategory, setCategory, setSFW]
  );

  return (
    <FlatList
      data={items}
      horizontal
      renderItem={({ item }): ReactElement => (
        <QueryOptionToggle
          active={item.active}
          onPress={item.onPress}
          text={item.text}
        />
      )}
      ItemSeparatorComponent={(): ReactElement => <View style={[t.w3, t.h2]} />}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[t.pY3]}
    />
  );
}

type QueryOptionToggleProps = Omit<OptionItem, 'key'>;

function QueryOptionToggle({
  active,
  onPress,
  text,
}: QueryOptionToggleProps): ReactElement {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        [t.roundedLg, t.border, t.pX3, t.pY1, t.justifyCenter],
        active
          ? [t.bgBlueLight, t.borderBlueLight]
          : [t.bgGray800, t.borderGray600],
      ]}
    >
      <Text style={[t.textSm, t.textWhite, t.fontBold]}>{text}</Text>
    </TouchableOpacity>
  );
}
