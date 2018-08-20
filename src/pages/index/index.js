import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, RichText } from '@tarojs/components'
import './index.scss'
import { activityDetail } from '../../service/SocialDao'
import { logMsg, unix_format, isEmpty, getDateDiff } from '../../net/utils';
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
    logMsg('路由参数', this.$router.params)
    activityDetail(17, data => {
      this.setState({
        activity: data
      })
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {

    let { begin_time, cover_link, created_at, departure_city, departure_province, status_cn,
      destination, destination_city, destination_province, end_time, mem_limit, id, name,
      status, user, join_numbers, description, page_views, activity_members, apply_numbers } = this.state.activity;
    user = isEmpty(user) ? {} : user;
    const { avatar, nick_name, user_id } = user;
    let activity_time = unix_format(begin_time, 'YYYY年MM月DD') + ` 至 ` + unix_format(end_time, 'YYYY年MM月DD')

    return (<View>

      <NavBar />
      <Image
        className='activity-banner'
        src={cover_link} />
     
      <Text>{name}</Text>

      <View className='activity-user'>
        <Image
          className='activity-avatar'
          src={avatar}
        />

        <View className='activity-column'>
          <Text className='activity-nickname'>{nick_name}</Text>

          <Text className='activity-time'>{getDateDiff(created_at)}</Text>
        </View>

      </View>
      <RichText nodes={description} />

    </View>
    )
  }
}

