import { createStackNavigator } from 'react-navigation-stack';
import SignIn from './SignIn'
import SignUp from './SignUp'

const Authentication = createStackNavigator({
    SignIn: {
        screen: SignIn,
        path: '/SignIn',
    },
    SignUp: {
        screen: SignUp,
        path: '/SignUp',
    }
},
{
    // initialRouteName = 'SignIn',
    headerMode:'none'
}
);


export default Authentication;
