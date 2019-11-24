import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, ScrollView
} from 'react-native';


export default class loginJSX extends Component {
    render() {
        return (
            <View style={loginContainer}>
                <Text style={username}>{user ? user.name : ''}</Text>
                <View>
                    <TouchableOpacity style={btnSignInStyle} onPress={this.gotoOrderHistory.bind(this)}>
                        <Text style={btnTextSignIn}>Order History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btnSignInStyle} onPress={this.gotoChangeInfo.bind(this)}>
                        <Text style={btnTextSignIn}>Change Info</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={btnSignInStyle} onPress={this.onSignOut.bind(this)}>
                        <Text style={btnTextSignIn}>Sign out</Text>
                    </TouchableOpacity>
                </View>
                <View />
            </View>
        );
    }
}
// export class logoutJSX extends Component{
//     render(){
//         return(
//             <View style={{ flex: 1 }}>
//                 <TouchableOpacity style={btnStyle} onPress={this.gotoAuthentication.bind(this)}>
//                     <Text style={btnText}>Sign In</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34B089',
        borderRightWidth: 3,
        borderColor: '#fff',
        alignItems: 'center'
    },
    profile: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginVertical: 30
    },
    btnStyle: {
        height: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 70
    },
    btnText: {
        color: '#34B089',
        fontFamily: 'Avenir', 
        fontSize: 20
    },
    btnSignInStyle: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
        width: 200,
        marginBottom: 10,
        justifyContent: 'center',
        paddingLeft: 10
    },
    btnTextSignIn: {
        color: '#34B089',
        fontSize: 15
    },
    loginContainer: {
        flex: 1, 
        justifyContent: 'space-between', 
        alignItems: 'center'
    },
    username: {
        color: '#fff', 
        fontFamily: 'Avenir', 
        fontSize: 15
    }
});