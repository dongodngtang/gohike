import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Input } from '@tarojs/components'
import './login.scss'
import NavBar from '../../component/NavBar';
import { isStrNull, showToast, logMsg } from "../../net/utils";
import { action_sign } from '../../service/SocialDao';
import { redirectTo } from '@tarojs/taro-h5';



export default class register extends Component {

  constructor() {
    super(...arguments)
    logMsg(this.$router.params)
    this.signAction = {}
    this.signAction.id = this.$router.params.id

  }

  onInput = e => {
    this.signAction.name = e.target.value.trim()
  }

  onInputPwd = e => {
    this.signAction.mobile = e.target.value.trim()
  }

  onInputUrgent = e => {
    this.signAction.emerge_username = e.target.value.trim()
  }

  onInputUrgentPhone = e => {
    this.signAction.emerge_mobile = e.target.value.trim()
  }

  onInputMsg = e => {
    this.signAction.message = e.target.value.trim()
  }


  render() {
    return <View className='login'>
      <NavBar title='活动报名' />

      <View className='card flex-column-center'>
        <View style='margin-top:80px' />
        <View className='apply_i flex-row'>
          <Text className="apply_name">姓名:</Text>
          <Input
            onInput={this.onInput}
            className='input_name'
            placeholder='填写您的真实姓名'
          />
        </View>


        <View className='apply_i flex-row'>
          <Text className="apply_name">手机号码:</Text>
          <Input
            type='number'
            onInput={this.onInputPwd}
            className='input_name'
            placeholder='输入您的手机号码'
          />
        </View>
        <View className='apply_i flex-row'>
          <Text className="apply_name">紧急联系人:</Text>
          <Input
            onInput={this.onInputUrgent}
            className='input_name'
            placeholder='你最亲密的人'
          />
        </View>
        <View className='apply_i flex-row'>
          <Text className="apply_name">紧急联系电话:</Text>
          <Input
            type='number'
            onInput={this.onInputUrgentPhone}
            className='input_name'
            placeholder='紧急联系人手机号码'
          />
        </View>
        <View className='apply_i flex-row'>
          <Text className="apply_name">给领队消息:</Text>
          <Input
            onInput={this.onInputMsg}
            className='input_name'
            placeholder='消息'
          />
        </View>

        <Button
          onClick={this.onApply}
          className='btn_apply'
        >确认报名</Button>


      </View>

    </View>
  }

  onApply = () => {
    const { name, mobile, emerge_username, emerge_mobile } = this.signAction;
    if (isStrNull(name) || isStrNull(mobile)
      || isStrNull(emerge_mobile) || isStrNull(emerge_username)) {
      showToast('信息填写不完整')
      return
    }

    action_sign(this.signAction, data => {
      logMsg(data)
      showToast('报名成功')
      redirectTo('pages/index/index')
    }, err => {
      showToast(err)
    })

  }

}
