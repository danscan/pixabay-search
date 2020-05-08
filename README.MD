# 101 Code Challenge
Dan Scanlon's Submission.

## Installation
```bash
yarn install
cd ios && pod install
cd ..
```

## Running
Run on iOS:
```
yarn ios
```

Run on Android:
```
yarn android
```

## Contributing
This project uses utility-based styling via [Tailwind](https://github.com/TVke/react-native-tailwindcss). The theme is configured via the `tailwind.config.js` file in this root directory.

If you make changes to the theme, be sure to run `yarn generate-tailwind-types` afterwards. This will generate a `tailwind.d.ts` type declarations file for the `react-native-tailwindcss` module, which will include any customizations to the theme's colors and utilities.
