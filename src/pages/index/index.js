import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, RichText} from '@tarojs/components'
import './index.scss'
import {activityDetail} from '../../service/SocialDao'
import {logMsg, unix_format, isEmpty, getDateDiff} from '../../net/utils';
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

  componentWillMount() {
  }

  componentDidMount() {
    logMsg('路由参数', this.$router.params)
    activityDetail(17, data => {
      this.setState({
        activity: data
      })
    })
  }

  componentWillUnmount() {
  }

  componentDidShow() {
  }

  componentDidHide() {
  }

  render() {

    let {
      begin_time, cover_link, created_at, departure_city, departure_province, status_cn,
      destination, destination_city, destination_province, end_time, mem_limit, id, name,
      status, user, join_numbers, description, page_views, activity_members, apply_numbers
    } = this.state.activity;
    user = isEmpty(user) ? {} : user;
    const {avatar, nick_name, user_id} = user;
    let activity_time = unix_format(begin_time, 'YYYY年MM月DD') + ` 至 ` + unix_format(end_time, 'YYYY年MM月DD')

    return (<View>

        <NavBar title={'活动详情'}/>
        <Image
          className='activity-banner'
          src={cover_link}
        />

        <View className="activity activity-topic-head">
          <View className={'flex-column'}>
            <Text className={"activity-topic_title"}>{name}</Text>

            <View className={'topic_total'}>
              <Text className={'topic_txt_total'}>{`${page_views}阅读`}</Text>


              <View style={'flex: 1;'}/>

              <View className={'status_tag flex-center'}>
                <Text className={'status_cn'}>{status_cn}</Text>
              </View>


            </View>
            <View className={'line'} style={"margin-top:10px"}/>
          </View>

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

          <View className={'act_card'}>

            <View className={'act_item '}>
              <Text
                className={'act_departure_city'}>出发地</Text>

              <Text
                className={'act_placeholder'}>{departure_city}</Text>
            </View>
            <View className={'act_item '}>
              <Text
                style={styles.act_departure_city}>目的地</Text>

              <Text
                style={styles.act_placeholder}>{`${destination_city} ${destination}`}</Text>
            </View>

            <View style={styles.act_item}>
              <Text
                style={styles.act_departure_city}>行程日期</Text>

              <Text
                style={styles.act_placeholder}>{activity_time}</Text>

            </View>

            <View style={styles.act_item}>
              <Text
                style={styles.act_departure_city}>集合时间</Text>

              <Text
                style={styles.act_placeholder}>{unix_format(begin_time, 'YYYY年MM月DD HH:mm')}</Text>

            </View>
            <View style={{...Styles.row_center}}>
              <Text
                style={styles.act_join}>{`已报名 ${apply_numbers} / ${mem_limit}人`}</Text>
              <View style={{flex: 1}}/>

              <Text
                onPress={() => {
                  router.toSignMembers(activity_members)
                }}
                style={[styles.act_join, {marginRight: 10}]}>点击查看更多</Text>
            </View>

            <View style={[styles.act_item, {height: 36}]}>
              {!isEmpty(activity_members) && activity_members.map((item, index) => {


                return <ImageLoad
                  key={`activity_members${index}`}
                  style={styles.act_join_avatar}
                  source={{uri: item.avatar}}/>
              })}


            </View>

          </View>
          <RichText nodes={description}/>
        </View>
      </View>
    )
  }
}

