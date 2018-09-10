import Taro from '@tarojs/taro'
import moment from 'moment'
import _ from 'lodash'


global.loginUser = null;

export function setUser(login){
    global.loginUser = login
}

export function getUser(){
    return global.loginUser
}

export function isLogin(){
    return !isEmpty(global.loginUser)
}

export function logMsg(...msg) {
    console.log(...msg)
}
export function isEmpty(param) {
    return _.isEmpty(param)
}

export function isStrNull(str) {
    return str === null || str === undefined || str.length < 1;
}


export function redirectTo(url) {
  Taro.redirectTo({
    url
  })
}
export function toRoute(url) {
  Taro.navigateTo({
    url
  })
}

export function showToast(msg) {
    Taro.showToast({
        title:msg
    })
}

export function unix_format(timestamp, time_format) {
    return moment.unix(timestamp).format(time_format)
}

/*时间 1小时前*/
export function getDateDiff(dateTimeStamp) {

    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();

    var diffValue = now - dateTimeStamp * 1000;
    if (diffValue < 0) {
        return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    let result = '';
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + '月前';
    }
    else if (weekC >= 1) {
        result = "" + parseInt(weekC) + '周前';
    }
    else if (dayC >= 1) {
        result = "" + parseInt(dayC) + '天前';
    }
    else if (hourC >= 1) {
        result = "" + parseInt(hourC) + '小时前';
    }
    else if (minC >= 1) {
        result = "" + parseInt(minC) + '分钟前';
    } else
        result = '刚刚';
    return result;
}
