import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import register from '../../api/register';
import { Popup } from 'popup-ui'
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
        Popup.show({
            type: 'Success',
            title: 'Đăng Kí Thành Công',
            button: false,
            textBody: 'Đăng Kí Thành Công Quay Lại Trang Đăng Nhập',
            buttonText: 'Đăng Nhập',
            callback: () => {
                Popup.hide();
                this.props.navigation.goBack();
            }
        })
    }

    onFail() {
        Popup.show({
            type: 'Danger',
            title: 'Đăng Kí Không Thành Công',
            button: false,
            textBody: 'Email đã được sử dụng',
            buttonText: 'Đăng Nhập',
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
        const { name, email, password, rePassword } = this.state;
        if(password !== rePassword){
            Popup.show({
                type: 'Danger',
                title: 'Lỗi',
                button: false,
                textBody: 'Mật khẩu không trùng nhau',
                buttonText: 'Nhập Lại',
                callback: () => {
                    Popup.hide();
                }
            })
        }
        else{
            register(email, name, password)
            .then(res => {
                if (res === 'THANH CONG') { return this.onSuccess(); }
                this.onFail();
            });
        }
    }

    render() {
        const { inputStyle, bigButton, buttonText } = styles;
        return (
                <View>
                    <TextInput
                        style={inputStyle}
                        placeholder="Họ và Tên"
                        value={this.state.name}
                        onChangeText={text => this.setState({ name: text })}
                    />
                    <TextInput
                        style={inputStyle}
                        placeholder="Email"
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />
                    <TextInput
                        style={inputStyle}
                        placeholder="Mật Khẩu"
                        value={this.state.password}
                        secureTextEntry
                        onChangeText={text => this.setState({ password: text })}
                    />
                    <TextInput
                        style={inputStyle}
                        placeholder="Nhập lại mật khẩu"
                        value={this.state.rePassword}
                        secureTextEntry
                        onChangeText={text => this.setState({ rePassword: text })}
                    />
                    <TouchableOpacity style={bigButton} onPress={this.registerUser.bind(this)}>
                        <Text style={buttonText}>SIGN UP NOW</Text>
                    </TouchableOpacity>
                </View>
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
