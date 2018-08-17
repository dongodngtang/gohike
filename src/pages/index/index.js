import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import {activityDetail} from '../../service/SocialDao'
import { logMsg } from '../../net/utils';

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () {
    activityDetail(17,data=>{
      logMsg('活动呢',data)
    })
   }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (<View className='index'>
        <Text>Hello world!</Text>

        <View className='item-body1'/>
        <View className='item-body2'/>


        <View className='item-row'>
          <View className='item-body2'/>
          <View className='item-body3'/>
        </View>


      </View>
    )
  }
}

