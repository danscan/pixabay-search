require('@babel/register')({
  ignore: ['node_modules/react-native'],
  presets: ['module:metro-react-native-babel-preset'],
});

const { default: colors } = require('react-native-tailwindcss/color');
const tailwind = {
  ...require('react-native-tailwindcss/corePlugins/alignContent').default,
  ...require('react-native-tailwindcss/corePlugins/alignItems').default,
  ...require('react-native-tailwindcss/corePlugins/alignSelf').default,
  ...require('react-native-tailwindcss/corePlugins/backfaceVisibility').default,
  ...require('react-native-tailwindcss/corePlugins/borderStyle').default,
  ...require('react-native-tailwindcss/corePlugins/direction').default,
  ...require('react-native-tailwindcss/corePlugins/display').default,
  ...require('react-native-tailwindcss/corePlugins/flexDirection').default,
  ...require('react-native-tailwindcss/corePlugins/flexWrap').default,
  ...require('react-native-tailwindcss/corePlugins/fontPadding').default,
  ...require('react-native-tailwindcss/corePlugins/fontStyle').default,
  ...require('react-native-tailwindcss/corePlugins/fontWeight').default,
  ...require('react-native-tailwindcss/corePlugins/justifyContent').default,
  ...require('react-native-tailwindcss/corePlugins/objectFit').default,
  ...require('react-native-tailwindcss/corePlugins/overflow').default,
  ...require('react-native-tailwindcss/corePlugins/position').default,
  ...require('react-native-tailwindcss/corePlugins/resize').default,
  ...require('react-native-tailwindcss/corePlugins/textAlign').default,
  ...require('react-native-tailwindcss/corePlugins/textDecoration').default,
  ...require('react-native-tailwindcss/corePlugins/textTransform').default,
  ...require('react-native-tailwindcss/corePlugins/verticalAlign').default,
  ...require('react-native-tailwindcss/corePlugins/backgroundColor').default,
  ...require('react-native-tailwindcss/corePlugins/borderColor').default,
  ...require('react-native-tailwindcss/corePlugins/borderRadius').default,
  ...require('react-native-tailwindcss/corePlugins/borderWidth').default,
  ...require('react-native-tailwindcss/corePlugins/flex').default,
  ...require('react-native-tailwindcss/corePlugins/flexGrow').default,
  ...require('react-native-tailwindcss/corePlugins/flexShrink').default,
  ...require('react-native-tailwindcss/corePlugins/fontFamily').default,
  ...require('react-native-tailwindcss/corePlugins/fontSize').default,
  ...require('react-native-tailwindcss/corePlugins/height').default,
  ...require('react-native-tailwindcss/corePlugins/inset').default,
  ...require('react-native-tailwindcss/corePlugins/top').default,
  ...require('react-native-tailwindcss/corePlugins/bottom').default,
  ...require('react-native-tailwindcss/corePlugins/left').default,
  ...require('react-native-tailwindcss/corePlugins/right').default,
  ...require('react-native-tailwindcss/corePlugins/start').default,
  ...require('react-native-tailwindcss/corePlugins/end').default,
  ...require('react-native-tailwindcss/corePlugins/letterSpacing').default,
  ...require('react-native-tailwindcss/corePlugins/lineHeight').default,
  ...require('react-native-tailwindcss/corePlugins/margin').default,
  ...require('react-native-tailwindcss/corePlugins/maxHeight').default,
  ...require('react-native-tailwindcss/corePlugins/maxWidth').default,
  ...require('react-native-tailwindcss/corePlugins/minHeight').default,
  ...require('react-native-tailwindcss/corePlugins/minWidth').default,
  ...require('react-native-tailwindcss/corePlugins/opacity').default,
  ...require('react-native-tailwindcss/corePlugins/padding').default,
  ...require('react-native-tailwindcss/corePlugins/textColor').default,
  ...require('react-native-tailwindcss/corePlugins/tint').default,
  ...require('react-native-tailwindcss/corePlugins/width').default,
  ...require('react-native-tailwindcss/corePlugins/zIndex').default,
  ...require('react-native-tailwindcss/corePlugins/boxShadow').default,
  ...require('react-native-tailwindcss/corePlugins/textShadow').default,
  ...require('react-native-tailwindcss/corePlugins/insetDir').default,
  ...require('react-native-tailwindcss/corePlugins/borderWidthDir').default,
  ...require('react-native-tailwindcss/corePlugins/borderRadiusDir').default,
};

const TailwindColorsInterface = `interface TailwindColors {
${Object.keys(colors)
  .map(key => `    ${key}: '${colors[key]}';`)
  .join('\n')}
  }`;

const TailwindStylesInterface = `interface TailwindStyles {
${Object.keys(tailwind)
  .map(
    key =>
      `    ${key}: { ${Object.keys(tailwind[key])
        .map(
          p => `${p}: ${JSON.stringify(tailwind[key][p]).replace(/\"/g, "'")}`,
        )
        .join('; ')} };`,
  )
  .join('\n')}
  }`;

const declarationBody = `declare module 'react-native-tailwindcss' {
  export ${TailwindColorsInterface}
  export ${TailwindStylesInterface}

  export const color: TailwindColors;
  export const colors: TailwindColors;
  export const t: TailwindStyles;
  export const tailwind: TailwindStyles;
  export const theme: TailwindStyles;
  export const tw: TailwindStyles;
}`;

const path = require('path');
const { writeFileSync } = require('fs');

writeFileSync(path.resolve(__dirname, '../tailwind.d.ts'), declarationBody);
