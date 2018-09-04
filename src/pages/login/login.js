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
import {logMsg} from "../../net/utils";


export default class login extends Component {

  phone = null;
  vcode = null;

  render() {
    return <View className={'login'}>
      <NavBar title={'登录'}/>

      <View className={'card flex-column'}>
        <View style={'margin-top:80px'}/>
        <View className={'v_pwd flex-row'}>
          <Input
            type={'number'}
            onInput={(txt => {
              logMsg(txt)
            })}
            className={'input_name'}
            placeholder={'手机号码'}/>
        </View>

        <View className={'v_pwd flex-row'}>
          <Input className={'input_pwd'}
                 placeholder={'短信验证码'}/>
          <CountDownButton
            enable
            onClick={(startCount) => {
              startCount(true)
            }}/>


        </View>

        <Button className={'btn_login'}>登录</Button>

      </View>

    </View>
  }

}
