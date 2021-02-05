//TODO add switch navigator here...

import { createSwitchNavigator, createAppContainer } from "react-navigation";
import LoginPage from '../screens/Login/LoginPage'
import HomePage from '../screens/Home/HomePage'

const AppNavigator = createSwitchNavigator({
    route0: LoginPage,
    route1: HomePage,
    // route2: BarcodeScanner,
    // route3: AboutUs
  },
  {
    initialRouteName: 'route0',
  });

  export default createAppContainer(AppNavigator);