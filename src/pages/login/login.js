/**
 * login.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/9/4.
 *
 */

import Taro, {Component} from '@tarojs/taro'
import {View, Text, Button, Input} from '@tarojs/components'
import './login.scss'
import NavBar from '../../component/NavBar';
import CountDownButton from '../../component/CountDownButton'
import {isStrNull, logMsg, showToast, redirectTo, toRoute} from "../../net/utils";
import {v_code, postLogin} from "../../service/SocialDao";


export default class login extends Component {

  constructor() {
    super(...arguments)
    this.phone = null
    this.vcode = null
    this.password = null
  }

  onInput = e => {
    this.phone = e.target.value
  }
  onInputPwd = e => {
    this.password = e.target.value.trim()
  }

  render() {
    return <View className={'login'}>
      <NavBar title={'登录'}/>

      <View className={'card flex-column-center'}>
        <View style={'margin-top:80px'}/>
        <View className={'v_pwd flex-row'}>
          <Input
            type={'number'}
            onInput={this.onInput}
            className={'input_name'}
            placeholder={'手机号码'}/>
        </View>

        <View className={'v_pwd flex-row'}>
          <Input
            password
            onInput={this.onInputPwd}
            className={'input_name'}
            placeholder={'输入密码'}/>
        </View>
        {/*<View className={'v_pwd flex-row'}>*/}
          {/*<Input*/}
            {/*onInput={e => {*/}
              {/*this.vcode = e.target.value*/}
            {/*}}*/}
            {/*className={'input_pwd'}*/}
            {/*placeholder={'短信验证码'}/>*/}
          {/*<CountDownButton*/}
            {/*enable*/}
            {/*onClick={(startCounting) => {*/}
              {/*if (isStrNull(this.phone)) {*/}
                {/*showToast('手机号码不能为空')*/}
                {/*return*/}
              {/*}*/}
              {/*let body = {*/}
                {/*option_type: 'login',*/}
                {/*vcode_type: 'mobile',*/}
                {/*mobile: this.phone*/}
              {/*};*/}
              {/*v_code(body, data => {*/}
                {/*startCounting(true)*/}
              {/*})*/}

            {/*}}/>*/}


        {/*</View>*/}

        <Button
          onClick={this.onLogin}
          className={'btn_login'}>登录</Button>

        <View style="flex:1"/>
        <Text
          onClick={() => {
            toRoute('register')
          }}
          className={'txt_register'}>没有账号？</Text>

      </View>

    </View>
  }

  onLogin = () => {
    if (isStrNull(this.password) || isStrNull(this.phone)) {
      showToast('手机号或验证码不能为空')
      return
    }
    let body = {
      type: 'mobile',
      mobile: this.phone,
      password: this.password
    }
    postLogin(body, data => {

      showToast('登录成功')
      redirectTo('pages/index/index')
    })
  }

}
