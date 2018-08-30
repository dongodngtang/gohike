/**
 * Comment.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/8/30.
 *
 */

import Taro, {Component} from '@tarojs/taro'
import {View, Text, ScrollView, Image} from '@tarojs/components'
import {comments} from "../service/SocialDao";
import '../scss/comment.scss'
import {Styles, Colors} from '../net/Theme'
import {getDateDiff} from "../net/utils";

export default class Comment extends Component {

  state = {
    items: [],
    total_comments: 0
  }

  componentDidMount() {
    const {target} = this.props;
    comments(target, data => {
      this.setState({
        items: data.items,
        total_comments: data.total_comments
      })
    })
  }

  render() {
    return <View className={'comment'}>
      <View className={'comment_top flex-row'}>
        <Text className={'comment_cancel'}>{`评论 ( ${this.state.total_comments} )`}</Text>
        <View style={{flex: 1}}/>
        <Text
          className={'comment_confirm'}
        >我要留言</Text>
      </View>
      {this.state.items.length > 0 && this.state.items.map((item, index) => {
        const {user, created_at, body, total_replies, id} = item;
        const {avatar, nick_name, user_id} = user;
        return <View style={{paddingBottom: 12}}>
          <View
            className={'flex-row'}
            style={styles.item_user}>
            <Image
              style={styles.item_avatar}
              src={avatar}
            />

            <View className={'flex-column'}>
              <Text style={styles.item_nick}>{nick_name}</Text>

              <Text style={styles.item_time}>{getDateDiff(created_at)}</Text>
            </View>

            <View style={{flex: 1}}/>
            <View
              style={{height: 60}}>
              <Text style={styles.reply}>回复</Text>
            </View>

          </View>
          <Text style={styles.comment}>{body}</Text>

          {total_replies > 0 ? <View
            style={styles.reply_num_view}>
            <Text style={styles.reply_num}>{`查看全部${total_replies}条回复 >>`}</Text>
          </View> : null}

        </View>
      })}

    </View>
  }
}

const styles = {
  item_user: {
    height: 60,
  },
  item_avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 12
  },
  item_nick: {
    fontSize: 14,
    color: Colors._3CB
  },
  item_time: {
    fontSize: 10,
    color: Colors._D8D,
    marginTop: 5
  },
  item_content: {
    fontSize: 15,
    color: Colors._494,
    marginBottom: 10,
    lineHeight: 20
  },
  reply: {
    fontSize: 13,
    color: Colors._02A,
    marginTop: 10
  },
  comment: {
    fontSize: 16,
    color: Colors._494
  },
  reply_num_view: {
    backgroundColor: Colors._ECE,
    borderRadius: 2,
    height:30,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:10
  },
  reply_num: {
    fontSize: 12,
    color: Colors._009
  }
}
