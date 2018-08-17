import Taro from '@tarojs/taro'

export function logMsg(...msg) {
    console.log(...msg)
}


export function isStrNull(str) {
    return str === null || str === undefined || str.length < 1;
}

export function showToast(msg) {
    Taro.showToast({
        title:msg
    })
}