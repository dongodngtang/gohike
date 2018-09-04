/**
 * CountDownButton.js
 *
 * @des the file dees
 * @author lorne (2270333671@qq.com)
 * Created at 2018/9/4.
 *
 */


import Taro, {Component} from '@tarojs/taro'

import {
  View,
  Text,
  Button
} from '@tarojs/components'
import '../scss/countdown.scss'
import {logMsg} from "../../.temp/net/utils";

export default class CountDownButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timerCount: this.props.timerCount || 60,
      timerTitle: this.props.timerTitle || '获取验证码',
      counting: false,
      selfEnable: true,
    };

  }

  // static propTypes = {
  //   style: ViewPropTypes.style,
  //   textStyle: Text.propTypes.style,
  //   onClick: PropTypes.func,
  //   disableColor: PropTypes.string,
  //   timerTitle: PropTypes.string,
  //   enable: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  //   timerEnd: PropTypes.func,
  //   timerActiveTitle: PropTypes.array
  // };

  _countDownAction =()=> {
    const codeTime = this.state.timerCount;
    const {timerActiveTitle, timerTitle} = this.props
    const now = Date.now()
    const overTimeStamp = now + codeTime * 1000 + 100
    /*过期时间戳（毫秒） +100 毫秒容错*/
    this.interval = setInterval(() => {
      /* 切换到后台不受影响*/
      const nowStamp = Date.now()
      if (nowStamp >= overTimeStamp) {
        /* 倒计时结束*/
        this.interval && clearInterval(this.interval);
        this.setState({
          timerCount: codeTime,
          timerTitle: timerTitle || '获取验证码',
          counting: false,
          selfEnable: true
        })
        if (this.props.timerEnd) {
          this.props.timerEnd()
        }
        ;
      } else {
        const leftTime = parseInt((overTimeStamp - nowStamp) / 1000, 10)
        let activeTitle = `${leftTime}s`
        if (timerActiveTitle) {
          if (timerActiveTitle.length > 1) {
            activeTitle = timerActiveTitle[0] + leftTime + timerActiveTitle[1]
          } else if (timerActiveTitle.length > 0) {
            activeTitle = timerActiveTitle[0] + leftTime
          }
        }
        this.setState({
          timerCount: leftTime,
          timerTitle: activeTitle,
        })
      }
      /* 切换到后台 timer 停止计时 */
      /*
      const timer = this.state.timerCount - 1
      if(timer===0){
          this.interval&&clearInterval(this.interval);
          this.setState({
              timerCount: codeTime,
              timerTitle: this.props.timerTitle || '获取验证码',
              counting: false,
              selfEnable: true
          })
      }else{
          this.setState({
              timerCount:timer,
              timerTitle: `重新获取(${timer}s)`,
          })
      }
      */
    }, 1000)
  }

  _shouldStartCountting =(shouldStart) =>{
    if (this.state.counting) {
      return
    }

    if (shouldStart) {
      this._countDownAction()
      this.setState({counting: true, selfEnable: false})
    } else {
      this.setState({selfEnable: true})
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const {onClick, style, textStyle, enable, disableColor} = this.props
    const {counting, timerTitle, selfEnable} = this.state

    return (
      <Button
        className={'btn_code'}
        onClick={() => {
          if (!counting && enable && selfEnable) {

            this.setState({selfEnable: false})
            onClick && onClick(this._shouldStartCountting)
          }
        }}>
        <Text className={'btn_txt'}>{timerTitle}</Text>
      </Button>
    )
  }
}

