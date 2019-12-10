import React, { Component } from 'react';
import {
    View, TouchableOpacity, Text, Image, StyleSheet, TextInput, Alert
} from 'react-native';
// import backSpecial from '../../media/appIcon/backs.png';
import { Popup } from 'popup-ui'
import { connect } from 'react-redux'
import changeInfo from '../../api/changeInfo'
import getToken from '../../api/getToken'




class ChangeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            phone: ''
        };
    }
    goBackToMain() {
        const { navigator } = this.props;
        navigator.pop();
    }
    onSuccess() {
        console.log("A");
        Popup.show({
            type: 'Success',
            title: 'Thay Đổi Thành Công',
            button: false,
            textBody: 'Thay Đổi Thành Công',
            buttonText: 'Ok',
            callback: () => {
                Popup.hide();
            }
        })
    }

    onFail() {
        Popup.show({
            type: 'Danger',
            title: 'Thay Đổi Không Thành Công',
            button: false,
            textBody: 'Thay Đổi Không Thành Công',
            buttontext: 'Đăng Nhập',
            callback: () => {
                Popup.hide();
            }
        })
    }
    ChangeInfo(){
        const { address, phone} = this.state;
        
        if(address!=='' && phone!==''){
            const data = {address, phone}
            getToken()
            .then(res => {
                changeInfo(res, data).then(res2 =>{
                    console.log(res2);
                    if(res2.message === "THANH_CONG"){
                        this.onSuccess();
                    }
                    else{
                        this.onFail();
                    }
                })
            })
        }
    }
    showPopUp() {
        Popup.show({
            type: 'Warning',
            title: 'Bạn Cần Đăng Nhập',
            button: true,
            textBody: 'Bạn cần đăng nhập để thực hiện chức năng này, bạn có muốn đăng nhập ?',
            buttonText: 'OK',
            cancelable: true,
            cancelCallBack: () => {
                Popup.hide();
                this.props.navigation.navigate('Home');
            },
            callback: () => {
                Popup.hide();
                this.props.navigation.navigate('Authentication');
            }
        })
    }
    signed() {
        const { name, address, phone } = this.props.user.user[0];
        this.setState({ name: name, address: address, phone: phone });
    }
    componentDidMount() {
        this.props.user.user === null ? this.showPopUp() :   this.signed();      
    }
    render() {
        const {
            wrapper, header, headerTitle, backIconStyle, body,
            signInContainer, signInTextStyle, textInput
        } = styles;


        const { name, address,phone } = this.state;
        return (
            <View style={wrapper}>
                <View style={header}>
                    {/* <View /> */}
                    <Text style={headerTitle}>Thông Tin Cá Nhân</Text>
                    <TouchableOpacity onPress={this.goBackToMain.bind(this)}>
                        {/* <Image source={backSpecial} style={backIconStyle} /> */}
                    </TouchableOpacity>
                </View>
                <View style={body}>
                    <TextInput
                        style={textInput}
                        placeholder="Enter your name"
                        autoCapitalize="none"
                        value={name}
                        onChangeText={text => this.setState({ ...this.state, name: text })}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Enter your address"
                        autoCapitalize="none"
                        value={address}
                        onChangeText={text => this.setState({ ...this.state, address: text })}
                        underlineColorAndroid="transparent"
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Enter your phone number"
                        autoCapitalize="none"
                        value={phone}
                        onChangeText={text => this.setState({ ...this.state, phone: text })}
                        underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity style={signInContainer} onPress= {this.ChangeInfo.bind(this)}>
                        <Text style={signInTextStyle}>THAY ĐỔI THÔNG TIN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#fff' },
    header: { flex: 1, backgroundColor: '#2ABB9C', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
    backIconStyle: { width: 30, height: 30 },
    body: { flex: 10, backgroundColor: '#F6F6F6', justifyContent: 'center' },
    textInput: {
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Avenir',
        paddingLeft: 20,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: '#2ABB9C',
        borderWidth: 1
    },
    signInTextStyle: {
        color: '#FFF', fontFamily: 'Avenir', fontWeight: '600', paddingHorizontal: 20
    },
    signInContainer: {
        marginHorizontal: 20,
        backgroundColor: '#2ABB9C',
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    },
    signInStyle: {
        flex: 3,
        marginTop: 50
    }
});

const mapStateToProps = state => ({
    user: state.counter
});

export default connect(mapStateToProps, null)(ChangeInfo);
