import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import { activityDetail } from '../../service/SocialDao'
import { logMsg } from '../../net/utils';
import NavBar from '../../component/NavBar';


export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super(...arguments)
    this.state = {
      activity: {}
    }
  }

  componentWillMount() { }

  componentDidMount() {
    activityDetail(17, data => {
      this.setState({
        activity: {}
      })
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {

    return (<View>

     <NavBar />

      <Text>Hello world!</Text>

      <View className='item-body1' />
      <View className='item-body2' />


      <View className='item-row'>
        <View className='item-body2' />
        <View className='item-body3' />
      </View>


    </View>
    )
  }
}

