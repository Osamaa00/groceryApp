import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

const screens = {
    Login: {
        screen: Login
    },
    Signup: {
        screen: Signup
    }
};

const stack = createStackNavigator(screens);

export default createAppContainer(stack);