/**
 * register.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/9/6.
 *
 */

import Taro, {Component} from '@tarojs/taro'
import {View, Text, Button, Input} from '@tarojs/components'
import './login.scss'
import NavBar from '../../component/NavBar';
import CountDownButton from '../../component/CountDownButton'
import {isStrNull, logMsg, showToast, redirectTo} from "../../net/utils";
import {v_code, postLogin,postRegister} from "../../service/SocialDao";


export default class register extends Component {

  constructor() {
    super(...arguments)
    this.phone = null
    this.vcode = null
    this.password = null
  }

  onInput = e => {
    this.phone = e.target.value.trim()
  }

  onInputPwd = e => {
    this.password = e.target.value.trim()
  }


  render() {
    return <View className={'login'}>
      <NavBar title={'注册'}/>

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
            onInput={e => {
              this.vcode = e.target.value.trim()
            }}
            className={'input_pwd'}
            placeholder={'短信验证码'}/>
          <CountDownButton
            enable
            onClick={(startCounting) => {
              if (isStrNull(this.phone)) {
                showToast('手机号码不能为空')
                return
              }
              let body = {
                option_type: 'register',
                vcode_type: 'mobile',
                mobile: this.phone
              };
              v_code(body, data => {
                startCounting(true)
              })

            }}/>


        </View>
        <View className={'v_pwd flex-row'}>
          <Input
            onInput={this.onInput}
            className={'input_name'}
            placeholder={'输入密码'}/>
        </View>

        <Button
          onClick={this.onRegister}
          className={'btn_login'}>注册</Button>


      </View>

    </View>
  }

  onRegister = () => {
    if (isStrNull(this.vcode) || isStrNull(this.phone) || isStrNull(this.password)) {
      showToast('手机号或验证码不能为空')
      return
    }
    let body = {
      type: 'mobile',
      mobile: this.phone,
      vcode: this.vcode,
      password: this.password
    }
    postRegister(body, data => {
      showToast('注册成功')
      redirectTo('pages/index/index')
    })
  }

}
