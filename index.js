import 'react-native-gesture-handler'; // NOTICE: Must be imported first!
import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
