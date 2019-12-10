import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import { StackActions } from 'react-navigation';
import signIn from '../../api/signIn';
import global from '../../global';
import { connect } from 'react-redux'
import saveToken from '../../api/saveToken';
import * as action from '../../actions'
import {  Popup } from 'popup-ui'
class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }

    onSignIn() {
        Keyboard.dismiss();
        const { email, password } = this.state;
        signIn(email, password)
            .then(res => {
                if (!res.message) {
                    this.props.setUser(res.user);
                    saveToken(res.token);
                    console.log('dang nhap thanh cong');
                    Popup.show({
                        type: 'Success',
                        title: 'Đăng Nhập Thành Công',
                        button: true,
                        textBody: 'Đăng Nhập Thành Công Quay Về Trang Chính',
                        buttonText: 'OK',
                        callback: () => {
                            Popup.hide();
                            setTimeout(() => {
                                this.props.navigation.navigate('Home');
                            }, 300)

                        }
                    })
                }
                else{
                    Popup.show({
                        type: 'Danger',
                        title: 'Đăng Nhập Không Thành Công',
                        button: true,
                        textBody: res.message,
                        buttonText: 'OK',
                        callback: () => {
                            Popup.hide();
                        }
                    })
                }
            })
            .catch(err => console.log(err));
    }

    onSignOut() {
        this.props.setUser(null);
        saveToken('');
    }
    goBack() {
        this.props.navigation.navigate('Home');
    }
    goSignUp() {
        this.props.navigation.navigate('SignUp');
    }
    showPopUp() {
        Popup.show({
            type: 'Warning',
            title: 'Bạn Đã Đăng Nhập',
            button: true,
            autoClose: true,
            textBody: 'Bạn có muốn đăng xuất ?',
            buttonText: 'Đăng Xuất',
            cancelable: true,
            cancelCallBack: () => {
                Popup.hide();
                setTimeout(() => {
                    this.props.navigation.navigate('Home');
                }, 500)
            },
            callback: () => {
                this.onSignOut();
                Popup.hide();
            }
        })
        // this.goBack();
    }
    componentDidMount() {
        this.props.user.user !== null ? this.showPopUp() : null
    }
    render() {
        const { inputStyle, bigButton, buttonText } = styles;
        const { email, password } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <TextInput
                    style={inputStyle}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput
                    style={inputStyle}
                    placeholder="Enter your password"
                    value={password}
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry
                />
                <TouchableOpacity style={bigButton} onPress={this.onSignIn.bind(this)}>
                    <Text style={buttonText}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={bigButton} onPress={this.goSignUp.bind(this)}>
                    <Text style={buttonText}>ĐĂNG KÍ</Text>
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
const mapStateToProps = state => ({
    user: state.counter
});


export default connect(mapStateToProps, action)(SignIn);