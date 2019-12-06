import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import register from '../../api/register';
import { Root, Popup } from 'popup-ui'
export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            rePassword: ''
        };
    }

    onSuccess() {
        console.log("Dang Ki Thanh Cong");
        Popup.show({
            type: 'Success',
            title: 'Đăng Kí Thành Công',
            button: false,
            textBody: 'Đăng Kí Thành Công Quay Lại Trang Đăng Nhập',
            buttontext: 'Đăng Nhập',
            callback: () => {
                Popup.hide();
                this.props.navigation.goBack();
            }
        })
    }

    onFail() {
        console.log("Dang Ki That Bai");
        Popup.show({
            type: 'Danger',
            title: 'Đăng Kí Không Thành Công',
            button: false,
            textBody: 'Email đã được sử dụng',
            buttontext: 'Đăng Nhập',
            callback: () => {
                Popup.hide();
            }
        })
    }

    removeEmail() {
        this.setState({ email: '' });
    }

    registerUser() {
        Keyboard.dismiss();
        const { name, email, password } = this.state;
        register(email, name, password)
            .then(res => {
                if (res === 'THANH CONG') { return this.onSuccess(); }
                this.onFail();
            });
    }

    render() {
        const { inputStyle, bigButton, buttonText } = styles;
        return (
            <Root>
                <View>
                    <TextInput
                        style={inputStyle}
                        placeholder="Enter your name"
                        value={this.state.name}
                        onChangeText={text => this.setState({ name: text })}
                    />
                    <TextInput
                        style={inputStyle}
                        placeholder="Enter your email"
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />
                    <TextInput
                        style={inputStyle}
                        placeholder="Enter your password"
                        value={this.state.password}
                        secureTextEntry
                        onChangeText={text => this.setState({ password: text })}
                    />
                    <TextInput
                        style={inputStyle}
                        placeholder="Re-enter your password"
                        value={this.state.rePassword}
                        secureTextEntry
                        onChangeText={text => this.setState({ rePassword: text })}
                    />
                    <TouchableOpacity style={bigButton} onPress={this.registerUser.bind(this)}>
                        <Text style={buttonText}>SIGN UP NOW</Text>
                    </TouchableOpacity>
                </View>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    inputStyle: {
        height: 50,
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 20,
        paddingLeft: 30
    },
    bigButton: {
        height: 50,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        fontFamily: 'Avenir',
        color: 'red',
        fontWeight: '400'
    }
});
