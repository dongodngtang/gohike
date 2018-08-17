import Taro, { Component } from '@tarojs/taro'
import { View, Text ,ScrollView} from '@tarojs/components'
import NavBar from './NavBar';
import '../app.scss'

export default class Base extends Component {

    render() {
        const {scrollable, pedding} = this.props;
        return (
            <View className='base'>
             <NavBar/>
                {pedding ? <View className='load'>
                    <Text>加载中...</Text>

                </View> : this.props.children}

            

            </View>
        )
    }

   
}
