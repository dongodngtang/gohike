import Taro, { Component } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import '../scss/nav.scss'
import { logMsg } from '../net/utils';

export default class NavBar extends Component {


    render() {
        let isWeApp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP;
        const {title,leftName,rightName} = this.props;
        return (isWeApp?null:<View className='nav'>

                <View className='nav-button'>{leftName?leftName:''}</View>
                <View style="flex:1" />

                <Text className="nav-title">{title?title:'标题'}</Text>
                <View style="flex:1" />
                <View className='nav-button'>{rightName?rightName:''}</View>
            </View>)

    }
}
