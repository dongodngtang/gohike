import Taro, {Component} from '@tarojs/taro'
import {View, Text, Image, RichText} from '@tarojs/components'
import './index.scss'
import {activityDetail} from '../../service/SocialDao'
import {logMsg, unix_format, isEmpty, getDateDiff, isStrNull, redirectTo, isLogin} from '../../net/utils';
import NavBar from '../../component/NavBar';
import Comment from '../../component/Comment'
import {Colors} from "../../net/Theme";
import { getUser } from '../../../.temp/net/utils';


export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super(...arguments)
    this.state = {
      activity: {},
      member:{}
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
      if (isEmpty(data.activity_members) || !isLogin())
        return
        data.activity_members.forEach(item => {
        if (getUser().user_id === item.user_id) {
          this.setState({
            member: item
          })
        }
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

    let members = isEmpty(activity_members) ? [] : activity_members
    return (<View>

        <NavBar title={'活动详情'}/>
        <Image
          className={"banner"}
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
              className='avatar'
              src={avatar}
            />

            <View className='activity-column'>
              <Text className='activity-nickname'>{nick_name}</Text>

              <Text className='activity-time'>{getDateDiff(created_at)}</Text>
            </View>

          </View>

          <View className={'act_card'}>

            <View className={'act_item'}>
              <Text
                className={'act_departure_city'}>出发地</Text>

              <Text
                className={'act_placeholder'}>{departure_city}</Text>
            </View>
            <View className={'act_item'}>
              <Text
                className={'act_departure_city'}>目的地</Text>

              <Text
                className={'act_placeholder'}>{`${destination_city} ${destination}`}</Text>
            </View>

            <View className={'act_item'}>
              <Text
                className={'act_departure_city'}>行程日期</Text>

              <Text
                className={'act_placeholder'}>{activity_time}</Text>

            </View>

            <View className={'act_item'}>
              <Text
                className={'act_departure_city'}>集合时间</Text>

              <Text
                className={'act_placeholder'}>{unix_format(begin_time, 'YYYY年MM月DD HH:mm')}</Text>

            </View>


            <View className={'act_item'} style={"margin-top:20px"}>
              {members.map((item, index) => {

                return <Image
                  key={`activity_members${index}`}
                  className={'act_join_avatar'}
                  src={item.avatar}/>
              })}


            </View>

          </View>
          <RichText nodes={description}/>

          {isStrNull(id) ? null : <Comment target={{
            target_id: id,
            target_type: 'activity'
          }}/>}

          <View className={'act_enter flex-row'}>
            <View
              className={'flex-center'}
              style={{flex: 1}}>
              <Text style={{fontSize: 17, color: Colors._494}}>咨询</Text>
            </View>
            <View className={'join_line'}/>
            <View
              className={'flex-center'}
              style={{flex: 1}}>
              <Text style={{fontSize: 17, color: Colors._494}}>收藏</Text>
            </View>

            <View
              onClick={this.toJoinClick}
              className={'join_activity flex-center'}>
              <Text style={{fontSize: 17, color: 'white'}}>报名参加</Text>
            </View>


          </View>

        </View>
      </View>
    )
  }

  toJoinClick = ()=>{
    if(isLogin()){
      let {
        id
      } = this.state.activity;
      redirectTo(`pages/login/apply?id=${id}&member=${JSON.stringify(this.state.member)}`)
    }else
    redirectTo('pages/login/login')
  }
}

