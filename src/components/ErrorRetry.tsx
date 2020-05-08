import React, { ReactElement } from 'react';
import { Button, Text, View } from 'react-native';
import { colors, t } from 'react-native-tailwindcss';

interface ErrorRetryProps {
  onPressRetry: () => void;
  title: string;
}

export default function ErrorRetry({
  onPressRetry,
  title,
}: ErrorRetryProps): ReactElement {
  return (
    <View style={[t.bgRed, t.rounded, t.p6]}>
      <Text style={[t.fontBold, t.mB6, t.textCenter, t.textXl, t.textWhite]}>
        {title}
      </Text>
      <Button color={colors.gray900} onPress={onPressRetry} title="Retry" />
    </View>
  );
}
